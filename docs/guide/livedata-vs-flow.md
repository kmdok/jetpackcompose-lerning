# LiveData vs Flow 徹底比較

Jetpack Composeでの状態管理において、LiveDataとFlowのどちらを使うべきか迷う方向けの比較ガイドです。

## 結論: どちらを選ぶべきか

::: tip Android公式の推奨
**新規プロジェクト**: **StateFlow/Flow**を推奨

理由：
- Kotlin Coroutinesとの統合が優れている
- よりモダンで柔軟なAPI
- Jetpack Composeとの親和性が高い
- バックプレッシャー対応など高度な機能
:::

::: info 既存プロジェクトでLiveDataを使用している場合
そのまま継続してもOK。LiveDataも十分に機能的で、Composeと問題なく連携できます。
:::

## 基本的な違い

| 項目 | LiveData | StateFlow/Flow |
|------|----------|----------------|
| ベース | Android Architecture Components | Kotlin Coroutines |
| ライフサイクル | 自動対応 | 手動対応（collectAsStateで自動化） |
| 学習コスト | 低い | 中程度（Coroutinesの知識が必要） |
| 柔軟性 | 中 | 高 |
| Android依存 | あり | なし（マルチプラットフォーム可） |
| 推奨度 | 従来 | **現在推奨** |

## 基本的な使い方の比較

### 1. ViewModel定義

#### LiveData

```kotlin
class CounterViewModel : ViewModel() {
    private val _count = MutableLiveData(0)
    val count: LiveData<Int> = _count

    fun increment() {
        _count.value = (_count.value ?: 0) + 1
    }
}
```

#### StateFlow

```kotlin
class CounterViewModel : ViewModel() {
    private val _count = MutableStateFlow(0)
    val count: StateFlow<Int> = _count.asStateFlow()

    fun increment() {
        _count.value++
    }
}
```

::: tip
StateFlowはnull安全で、初期値が必須です。LiveDataはnullable。
:::

### 2. Composableでの使用

#### LiveData

```kotlin
@Composable
fun CounterScreen(viewModel: CounterViewModel = viewModel()) {
    val count by viewModel.count.observeAsState(initial = 0)

    Button(onClick = { viewModel.increment() }) {
        Text("Count: $count")
    }
}
```

#### StateFlow

```kotlin
@Composable
fun CounterScreen(viewModel: CounterViewModel = viewModel()) {
    val count by viewModel.count.collectAsState()

    Button(onClick = { viewModel.increment() }) {
        Text("Count: $count")
    }
}
```

::: tip
- LiveData: `observeAsState()` + 初期値指定
- StateFlow: `collectAsState()` + 初期値不要
:::

## 詳細な比較例

### ユーザー情報の管理

#### LiveData版

```kotlin
data class User(val name: String, val email: String)

class UserViewModel : ViewModel() {
    private val _user = MutableLiveData<User?>()
    val user: LiveData<User?> = _user

    private val _isLoading = MutableLiveData(false)
    val isLoading: LiveData<Boolean> = _isLoading

    private val _error = MutableLiveData<String?>()
    val error: LiveData<String?> = _error

    fun loadUser(userId: String) {
        _isLoading.value = true
        viewModelScope.launch {
            try {
                val user = userRepository.getUser(userId)
                _user.value = user
                _error.value = null
            } catch (e: Exception) {
                _error.value = e.message
            } finally {
                _isLoading.value = false
            }
        }
    }
}

// Composableでの使用
@Composable
fun UserScreen(viewModel: UserViewModel = viewModel()) {
    val user by viewModel.user.observeAsState()
    val isLoading by viewModel.isLoading.observeAsState(false)
    val error by viewModel.error.observeAsState()

    when {
        isLoading -> CircularProgressIndicator()
        error != null -> Text("Error: $error")
        user != null -> UserProfile(user!!)
        else -> Text("No user")
    }
}
```

#### StateFlow版

```kotlin
data class User(val name: String, val email: String)

sealed class UserUiState {
    object Loading : UserUiState()
    data class Success(val user: User) : UserUiState()
    data class Error(val message: String) : UserUiState()
}

class UserViewModel : ViewModel() {
    private val _uiState = MutableStateFlow<UserUiState>(UserUiState.Loading)
    val uiState: StateFlow<UserUiState> = _uiState.asStateFlow()

    fun loadUser(userId: String) {
        viewModelScope.launch {
            _uiState.value = UserUiState.Loading
            try {
                val user = userRepository.getUser(userId)
                _uiState.value = UserUiState.Success(user)
            } catch (e: Exception) {
                _uiState.value = UserUiState.Error(e.message ?: "Unknown error")
            }
        }
    }
}

// Composableでの使用
@Composable
fun UserScreen(viewModel: UserViewModel = viewModel()) {
    val uiState by viewModel.uiState.collectAsState()

    when (val state = uiState) {
        is UserUiState.Loading -> CircularProgressIndicator()
        is UserUiState.Error -> Text("Error: ${state.message}")
        is UserUiState.Success -> UserProfile(state.user)
    }
}
```

::: tip StateFlowの利点
sealed classで状態を型安全に表現できる！
:::

## 複雑な状態管理

### TODOリストアプリ

#### LiveData版

```kotlin
data class Todo(val id: Int, val text: String, val done: Boolean)

class TodoViewModel : ViewModel() {
    private val _todos = MutableLiveData<List<Todo>>(emptyList())
    val todos: LiveData<List<Todo>> = _todos

    fun addTodo(text: String) {
        val currentList = _todos.value ?: emptyList()
        val newTodo = Todo(
            id = currentList.size + 1,
            text = text,
            done = false
        )
        _todos.value = currentList + newTodo
    }

    fun toggleTodo(id: Int) {
        _todos.value = _todos.value?.map {
            if (it.id == id) it.copy(done = !it.done)
            else it
        }
    }

    fun deleteTodo(id: Int) {
        _todos.value = _todos.value?.filter { it.id != id }
    }
}

@Composable
fun TodoScreen(viewModel: TodoViewModel = viewModel()) {
    val todos by viewModel.todos.observeAsState(emptyList())

    LazyColumn {
        items(todos) { todo ->
            TodoItem(
                todo = todo,
                onToggle = { viewModel.toggleTodo(todo.id) },
                onDelete = { viewModel.deleteTodo(todo.id) }
            )
        }
    }
}
```

#### StateFlow版

```kotlin
data class Todo(val id: Int, val text: String, val done: Boolean)

class TodoViewModel : ViewModel() {
    private val _todos = MutableStateFlow<List<Todo>>(emptyList())
    val todos: StateFlow<List<Todo>> = _todos.asStateFlow()

    fun addTodo(text: String) {
        val newTodo = Todo(
            id = _todos.value.size + 1,
            text = text,
            done = false
        )
        _todos.update { it + newTodo }
    }

    fun toggleTodo(id: Int) {
        _todos.update { todos ->
            todos.map {
                if (it.id == id) it.copy(done = !it.done)
                else it
            }
        }
    }

    fun deleteTodo(id: Int) {
        _todos.update { it.filter { todo -> todo.id != id } }
    }
}

@Composable
fun TodoScreen(viewModel: TodoViewModel = viewModel()) {
    val todos by viewModel.todos.collectAsState()

    LazyColumn {
        items(todos) { todo ->
            TodoItem(
                todo = todo,
                onToggle = { viewModel.toggleTodo(todo.id) },
                onDelete = { viewModel.deleteTodo(todo.id) }
            )
        }
    }
}
```

::: tip StateFlowの`.update {}`
アトミックな更新が可能で、競合状態を防げます。
:::

## Flowの高度な機能

### 1. データ変換と結合

```kotlin
class UserViewModel : ViewModel() {
    private val _userId = MutableStateFlow<String?>(null)

    // Flowの変換
    val user: StateFlow<User?> = _userId
        .filterNotNull()
        .flatMapLatest { userId ->
            userRepository.getUserFlow(userId)
        }
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = null
        )

    // 複数のFlowを結合
    val userWithPosts: Flow<Pair<User, List<Post>>> = combine(
        userRepository.getUserFlow(userId),
        postsRepository.getPostsFlow(userId)
    ) { user, posts ->
        user to posts
    }
}
```

LiveDataでは`MediatorLiveData`を使う必要がありますが、Flowの方が直感的です。

### 2. バックプレッシャー対応

```kotlin
class SearchViewModel : ViewModel() {
    private val _searchQuery = MutableStateFlow("")
    val searchQuery: StateFlow<String> = _searchQuery.asStateFlow()

    val searchResults: StateFlow<List<Item>> = _searchQuery
        .debounce(300) // 300ms待ってから検索
        .distinctUntilChanged() // 同じ値は無視
        .flatMapLatest { query ->
            if (query.isBlank()) {
                flowOf(emptyList())
            } else {
                searchRepository.search(query)
            }
        }
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )

    fun updateQuery(query: String) {
        _searchQuery.value = query
    }
}
```

::: warning LiveDataでの実装
同様の機能をLiveDataで実装するのは非常に複雑です。
:::

## Room Databaseとの連携

### LiveData（従来）

```kotlin
@Dao
interface UserDao {
    @Query("SELECT * FROM users")
    fun getAllUsers(): LiveData<List<User>>
}

class UserViewModel(private val userDao: UserDao) : ViewModel() {
    val users: LiveData<List<User>> = userDao.getAllUsers()
}
```

### Flow（推奨）

```kotlin
@Dao
interface UserDao {
    @Query("SELECT * FROM users")
    fun getAllUsers(): Flow<List<User>>
}

class UserViewModel(private val userDao: UserDao) : ViewModel() {
    val users: StateFlow<List<User>> = userDao.getAllUsers()
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )
}
```

## テストのしやすさ

### LiveData

```kotlin
@Test
fun testIncrement() = runTest {
    val viewModel = CounterViewModel()

    // LiveDataのテストにはInstantTaskExecutorRuleが必要
    viewModel.increment()

    assertEquals(1, viewModel.count.getOrAwaitValue())
}
```

### Flow

```kotlin
@Test
fun testIncrement() = runTest {
    val viewModel = CounterViewModel()

    // Flowはそのままテスト可能
    viewModel.increment()

    assertEquals(1, viewModel.count.value)
}
```

## パフォーマンス比較

| 項目 | LiveData | StateFlow |
|------|----------|-----------|
| メモリ使用量 | 軽量 | 軽量 |
| CPU使用量 | 低い | 低い |
| 更新頻度 | メインスレッド制限あり | 制限なし |
| バックプレッシャー | 非対応 | 対応 |

## 移行ガイド: LiveData → Flow

### ステップ1: ViewModelの変更

```kotlin
// Before
private val _data = MutableLiveData<String>()
val data: LiveData<String> = _data

// After
private val _data = MutableStateFlow("")
val data: StateFlow<String> = _data.asStateFlow()
```

### ステップ2: Composableの変更

```kotlin
// Before
val data by viewModel.data.observeAsState("")

// After
val data by viewModel.data.collectAsState()
```

### ステップ3: 値の更新

```kotlin
// Before
_data.value = "new value"
_data.postValue("new value")  // バックグラウンドから

// After
_data.value = "new value"  // メインスレッドから
_data.update { "new value" }  // アトミック更新
```

## まとめ: 選択のガイドライン

### LiveDataを選ぶ場合

- ✅ 既存プロジェクトで既にLiveDataを使用
- ✅ シンプルなUI状態管理のみ
- ✅ Coroutinesの経験がない

### StateFlow/Flowを選ぶ場合（推奨）

- ✅ 新規プロジェクト
- ✅ 複雑な状態管理や変換が必要
- ✅ Kotlin Coroutinesを活用したい
- ✅ マルチプラットフォーム（KMM）を考慮
- ✅ 最新のAndroid推奨パターンに従いたい

## 次のステップ

- [実践例: TODOアプリ (Flow版)](/examples/todo-app-flow)
- [実践例: TODOアプリ (LiveData版)](/examples/todo-app-livedata)
- [LaunchedEffect](/guide/launched-effect) - 副作用の処理
