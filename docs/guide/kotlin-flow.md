# Kotlin Flow 完全ガイド

Kotlin FlowはKotlin Coroutinesライブラリの一部で、非同期的にデータストリームを処理するための強力なAPIです。

## Flowとは

Flowは、複数の値を非同期的に返すことができるコルーチンベースのストリームです。

### 主な特徴

- **非同期**: コルーチンと統合されており、サスペンド関数をサポート
- **Cold Stream**: コレクターが収集を開始するまで実行されない
- **バックプレッシャー対応**: データの生成速度と消費速度を自動調整
- **キャンセル可能**: コルーチンのキャンセルに対応
- **構造化された並行性**: コルーチンスコープで管理

### React/Flutterとの対比

| Kotlin Flow | React | Flutter |
|-------------|-------|---------|
| Flow | Observable (RxJS) | Stream |
| StateFlow | useState + useEffect | StreamController.broadcast |
| collectAsState() | useEffect + setState | StreamBuilder |
| map/filter | .map/.filter | .map/.where |

## Flow vs StateFlow vs SharedFlow

### Flow (Cold Stream)

```kotlin
fun getNumbers(): Flow<Int> = flow {
    repeat(5) { i ->
        delay(1000)
        emit(i)
    }
}

// 使用例
viewModelScope.launch {
    getNumbers().collect { value ->
        println(value) // 0, 1, 2, 3, 4が1秒ごとに出力
    }
}
```

::: tip Cold Streamの特徴
- `collect`が呼ばれるまで実行されない
- コレクターごとに独立して実行される
- コレクターがキャンセルされると停止
:::

### StateFlow (Hot Stream)

```kotlin
class CounterViewModel : ViewModel() {
    private val _count = MutableStateFlow(0)
    val count: StateFlow<Int> = _count.asStateFlow()

    fun increment() {
        _count.value++
    }
}
```

::: tip StateFlowの特徴
- 常にアクティブ（Hot Stream）
- 現在の値を保持
- 初期値が必須
- 同じ値の連続した発行は無視
- UIの状態管理に最適
:::

### SharedFlow (Hot Stream)

```kotlin
class EventViewModel : ViewModel() {
    private val _events = MutableSharedFlow<String>()
    val events: SharedFlow<String> = _events.asSharedFlow()

    fun sendEvent(event: String) {
        viewModelScope.launch {
            _events.emit(event)
        }
    }
}
```

::: tip SharedFlowの特徴
- 常にアクティブ（Hot Stream）
- 現在の値を保持しない
- 複数のコレクターにブロードキャスト
- イベントストリームに最適
- リプレイキャッシュを設定可能
:::

## Flow Builders

### 1. flow { } ビルダー

最も基本的なFlowの作成方法：

```kotlin
fun fetchUserData(): Flow<User> = flow {
    // データ取得の処理
    val user = api.getUser()
    emit(user)  // 値を発行

    // 複数回emitも可能
    delay(1000)
    val updatedUser = api.getUser()
    emit(updatedUser)
}
```

### 2. flowOf()

固定値からFlowを作成：

```kotlin
val numbersFlow = flowOf(1, 2, 3, 4, 5)

// Composableで使用
@Composable
fun NumbersList() {
    val numbers by numbersFlow.collectAsState(initial = emptyList())
    // ...
}
```

### 3. asFlow()

コレクションやシーケンスをFlowに変換：

```kotlin
val listFlow = listOf(1, 2, 3).asFlow()
val rangeFlow = (1..10).asFlow()
```

### 4. channelFlow

並行処理が必要な場合：

```kotlin
fun fetchMultipleUsers(ids: List<String>): Flow<User> = channelFlow {
    ids.forEach { id ->
        launch {
            val user = api.getUser(id)
            send(user)  // channelFlowではsendを使用
        }
    }
}
```

## Flow Operators（演算子）

### 変換系 Operators

#### map - 値を変換

```kotlin
class UserViewModel : ViewModel() {
    val userNames: Flow<String> = userRepository.getUsers()
        .map { user -> user.name }  // User -> String
}
```

**React/Flutter対比:**
```javascript
// React (RxJS)
users$.pipe(map(user => user.name))

// Flutter
stream.map((user) => user.name)
```

#### filter - 条件に合う値のみ

```kotlin
val activeUsers = userRepository.getUsers()
    .filter { user -> user.isActive }
```

#### transform - 複雑な変換

```kotlin
val userEvents = userRepository.getUsers()
    .transform { user ->
        emit("Loading: ${user.name}")
        val details = loadDetails(user.id)
        emit("Loaded: ${details}")
    }
```

### 結合系 Operators

#### combine - 複数のFlowを結合

```kotlin
class ProfileViewModel : ViewModel() {
    private val userId = MutableStateFlow("user123")
    private val settings = MutableStateFlow(Settings())

    val profileData = combine(
        userRepository.getUser(userId.value),
        settings
    ) { user, settings ->
        ProfileData(user, settings)
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = ProfileData.Empty
    )
}
```

**React対比:**
```javascript
// React (RxJS)
combineLatest([user$, settings$]).pipe(
  map(([user, settings]) => ({ user, settings }))
)
```

#### zip - ペアで結合

```kotlin
val paired = flow1.zip(flow2) { a, b ->
    Pair(a, b)
}
```

### フロー制御系 Operators

#### debounce - 連続した値を間引く

検索機能に最適：

```kotlin
class SearchViewModel : ViewModel() {
    private val _searchQuery = MutableStateFlow("")
    val searchQuery: StateFlow<String> = _searchQuery.asStateFlow()

    val searchResults = _searchQuery
        .debounce(300)  // 300ms待つ
        .filter { it.length >= 2 }  // 2文字以上
        .distinctUntilChanged()  // 同じ値は無視
        .flatMapLatest { query ->
            searchRepository.search(query)
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

```kotlin
@Composable
fun SearchScreen(viewModel: SearchViewModel = viewModel()) {
    val query by viewModel.searchQuery.collectAsState()
    val results by viewModel.searchResults.collectAsState()

    Column {
        TextField(
            value = query,
            onValueChange = { viewModel.updateQuery(it) },
            label = { Text("検索") }
        )

        LazyColumn {
            items(results) { item ->
                SearchResultItem(item)
            }
        }
    }
}
```

**React対比:**
```javascript
// React
const [query, setQuery] = useState('');
const debouncedQuery = useDebounce(query, 300);

useEffect(() => {
  if (debouncedQuery.length >= 2) {
    searchRepository.search(debouncedQuery);
  }
}, [debouncedQuery]);
```

#### distinctUntilChanged - 連続した同じ値を無視

```kotlin
val uniqueValues = flow.distinctUntilChanged()
```

#### take - 指定数だけ取得

```kotlin
val firstThree = flow.take(3)
```

### 切り替え系 Operators

#### flatMapLatest - 最新のFlowに切り替え

ユーザーIDが変わったら最新のユーザー情報を取得：

```kotlin
class UserDetailViewModel : ViewModel() {
    private val _userId = MutableStateFlow<String?>(null)

    val userDetail: StateFlow<User?> = _userId
        .filterNotNull()
        .flatMapLatest { userId ->
            userRepository.getUserFlow(userId)
        }
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = null
        )

    fun loadUser(userId: String) {
        _userId.value = userId
    }
}
```

#### flatMapConcat - 順番に処理

```kotlin
val results = userIds.flatMapConcat { id ->
    userRepository.getUser(id)
}
```

#### flatMapMerge - 並行処理

```kotlin
val results = userIds.flatMapMerge { id ->
    userRepository.getUser(id)
}
```

## Jetpack Composeでの使用

### collectAsState() - FlowをStateに変換

```kotlin
@Composable
fun UserScreen(viewModel: UserViewModel = viewModel()) {
    // StateFlowの場合、初期値不要
    val user by viewModel.user.collectAsState()

    // 通常のFlowの場合、初期値が必要
    val events by viewModel.events.collectAsState(initial = emptyList())

    Text(text = user?.name ?: "Loading...")
}
```

### collectAsStateWithLifecycle()

ライフサイクルを考慮した収集（推奨）：

```kotlin
@Composable
fun UserScreen(viewModel: UserViewModel = viewModel()) {
    val user by viewModel.user.collectAsStateWithLifecycle()

    // 画面が非表示の時、自動的に収集を停止
    Text(text = user?.name ?: "Loading...")
}
```

::: tip collectAsStateWithLifecycle の利点
- メモリリークを防ぐ
- バッテリー消費を削減
- バックグラウンドで不要な処理を行わない
:::

### LaunchedEffect内でcollect

副作用としてFlowを収集：

```kotlin
@Composable
fun NotificationScreen(viewModel: NotificationViewModel = viewModel()) {
    val snackbarHostState = remember { SnackbarHostState() }

    // イベントを受信してSnackbarを表示
    LaunchedEffect(Unit) {
        viewModel.events.collect { event ->
            snackbarHostState.showSnackbar(event.message)
        }
    }

    Scaffold(
        snackbarHost = { SnackbarHost(snackbarHostState) }
    ) {
        // ...
    }
}
```

## stateIn - FlowをStateFlowに変換

Cold FlowをHot StateFlowに変換し、複数のコレクターで共有：

```kotlin
class NewsViewModel(
    private val newsRepository: NewsRepository
) : ViewModel() {
    val news: StateFlow<List<Article>> = newsRepository.getNewsFlow()
        .map { articles -> articles.sortedByDescending { it.publishedAt } }
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )
}
```

### SharingStarted の種類

```kotlin
// 常にアクティブ
started = SharingStarted.Eagerly

// 最初のコレクターが現れたときに開始
started = SharingStarted.Lazily

// コレクターがいる間だけアクティブ（推奨）
// 5000ms = コレクターがいなくなってから5秒後に停止
started = SharingStarted.WhileSubscribed(5000)
```

::: tip WhileSubscribedのstopTimeout
`stopTimeoutMillis = 5000` を設定すると、画面回転などの一時的な切断時にFlowが再起動されず、効率的です。
:::

## エラーハンドリング

### catch - エラーをキャッチ

```kotlin
class UserViewModel : ViewModel() {
    val user: StateFlow<UiState<User>> = userRepository.getUser()
        .map { user -> UiState.Success(user) as UiState<User> }
        .catch { exception ->
            emit(UiState.Error(exception.message ?: "Unknown error"))
        }
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = UiState.Loading
        )
}

sealed class UiState<out T> {
    object Loading : UiState<Nothing>()
    data class Success<T>(val data: T) : UiState<T>()
    data class Error(val message: String) : UiState<Nothing>()
}
```

### retry - リトライ

```kotlin
val data = flow {
    emit(fetchData())
}.retry(retries = 3) { cause ->
    // ネットワークエラーの場合のみリトライ
    cause is IOException
}
```

### retryWhen - 条件付きリトライ

```kotlin
val data = flow {
    emit(fetchData())
}.retryWhen { cause, attempt ->
    if (cause is IOException && attempt < 3) {
        delay(1000 * attempt)  // 指数バックオフ
        true
    } else {
        false
    }
}
```

## 実践例

### 1. リアルタイム検索

```kotlin
class SearchViewModel : ViewModel() {
    private val _query = MutableStateFlow("")
    val query: StateFlow<String> = _query.asStateFlow()

    val searchResults: StateFlow<List<Product>> = _query
        .debounce(300)
        .filter { it.length >= 2 }
        .distinctUntilChanged()
        .flatMapLatest { query ->
            if (query.isBlank()) {
                flowOf(emptyList())
            } else {
                searchRepository.search(query)
                    .catch { emit(emptyList()) }
            }
        }
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )

    fun onQueryChange(query: String) {
        _query.value = query
    }
}

@Composable
fun SearchScreen(viewModel: SearchViewModel = viewModel()) {
    val query by viewModel.query.collectAsState()
    val results by viewModel.searchResults.collectAsState()

    Column {
        SearchBar(
            query = query,
            onQueryChange = viewModel::onQueryChange
        )

        if (results.isEmpty() && query.isNotBlank()) {
            Text("結果がありません")
        } else {
            LazyColumn {
                items(results) { product ->
                    ProductCard(product)
                }
            }
        }
    }
}
```

### 2. データベース連携（Room）

```kotlin
@Dao
interface TodoDao {
    @Query("SELECT * FROM todos ORDER BY createdAt DESC")
    fun getAllTodos(): Flow<List<Todo>>

    @Query("SELECT * FROM todos WHERE isCompleted = 0")
    fun getActiveTodos(): Flow<List<Todo>>

    @Insert
    suspend fun insert(todo: Todo)

    @Update
    suspend fun update(todo: Todo)
}

class TodoViewModel(
    private val todoDao: TodoDao
) : ViewModel() {
    val todos: StateFlow<List<Todo>> = todoDao.getAllTodos()
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )

    val activeTodos: StateFlow<List<Todo>> = todoDao.getActiveTodos()
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )

    fun addTodo(text: String) {
        viewModelScope.launch {
            todoDao.insert(Todo(text = text))
        }
    }

    fun toggleTodo(todo: Todo) {
        viewModelScope.launch {
            todoDao.update(todo.copy(isCompleted = !todo.isCompleted))
        }
    }
}
```

### 3. 複数のデータソースを結合

```kotlin
class DashboardViewModel(
    private val userRepository: UserRepository,
    private val notificationRepository: NotificationRepository,
    private val statsRepository: StatsRepository
) : ViewModel() {
    val dashboardData: StateFlow<DashboardData> = combine(
        userRepository.getCurrentUser(),
        notificationRepository.getUnreadCount(),
        statsRepository.getTodayStats()
    ) { user, unreadCount, stats ->
        DashboardData(
            user = user,
            unreadNotifications = unreadCount,
            todayStats = stats
        )
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = DashboardData.Empty
    )
}

data class DashboardData(
    val user: User?,
    val unreadNotifications: Int,
    val todayStats: Stats?
) {
    companion object {
        val Empty = DashboardData(null, 0, null)
    }
}
```

### 4. ページネーション

```kotlin
class ArticleListViewModel(
    private val articleRepository: ArticleRepository
) : ViewModel() {
    private val _page = MutableStateFlow(1)

    private val _articles = MutableStateFlow<List<Article>>(emptyList())
    val articles: StateFlow<List<Article>> = _articles.asStateFlow()

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    init {
        loadArticles()
    }

    fun loadArticles() {
        viewModelScope.launch {
            _isLoading.value = true
            try {
                articleRepository.getArticles(_page.value)
                    .collect { newArticles ->
                        _articles.value = _articles.value + newArticles
                    }
            } catch (e: Exception) {
                // エラーハンドリング
            } finally {
                _isLoading.value = false
            }
        }
    }

    fun loadMore() {
        if (!_isLoading.value) {
            _page.value++
            loadArticles()
        }
    }
}

@Composable
fun ArticleListScreen(viewModel: ArticleListViewModel = viewModel()) {
    val articles by viewModel.articles.collectAsState()
    val isLoading by viewModel.isLoading.collectAsState()

    LazyColumn {
        items(articles) { article ->
            ArticleCard(article)
        }

        if (isLoading) {
            item {
                CircularProgressIndicator()
            }
        } else {
            item {
                Button(onClick = { viewModel.loadMore() }) {
                    Text("さらに読み込む")
                }
            }
        }
    }
}
```

## テスト

### StateFlowのテスト

```kotlin
class CounterViewModelTest {
    @Test
    fun `increment increases count`() = runTest {
        val viewModel = CounterViewModel()

        // 初期値を確認
        assertEquals(0, viewModel.count.value)

        // インクリメント
        viewModel.increment()

        // 値が増えたことを確認
        assertEquals(1, viewModel.count.value)
    }
}
```

### Flowのテスト（Turbine使用）

```kotlin
@Test
fun `search emits filtered results`() = runTest {
    val viewModel = SearchViewModel()

    viewModel.searchResults.test {
        // 初期値
        assertEquals(emptyList(), awaitItem())

        // クエリ入力
        viewModel.onQueryChange("kotlin")

        // 結果を待つ
        val results = awaitItem()
        assertTrue(results.isNotEmpty())

        cancelAndIgnoreRemainingEvents()
    }
}
```

### Flowのテスト（手動）

```kotlin
@Test
fun `user flow emits correct values`() = runTest {
    val viewModel = UserViewModel()
    val values = mutableListOf<User?>()

    val job = launch {
        viewModel.user.collect { user ->
            values.add(user)
        }
    }

    // データロード
    viewModel.loadUser("user123")
    advanceUntilIdle()

    // 検証
    assertTrue(values.isNotEmpty())
    assertEquals("user123", values.last()?.id)

    job.cancel()
}
```

## パフォーマンス最適化

### 1. conflate - 最新の値のみ処理

```kotlin
val latestValue = flow
    .conflate()  // 処理中に新しい値が来たら古い値をスキップ
    .collect { value ->
        // 重い処理
    }
}
```

### 2. buffer - バッファリング

```kotlin
flow {
    repeat(10) {
        emit(it)
        delay(100)  // 生成に100ms
    }
}.buffer()  // バッファリングして効率化
    .collect {
        delay(200)  // 処理に200ms
    }
```

### 3. flowOn - スレッドの切り替え

```kotlin
val users = flow {
    // このブロックはIO Dispatcherで実行
    val users = database.getUsers()
    emit(users)
}.flowOn(Dispatchers.IO)
    .map { users ->
        // このブロックはDefault Dispatcherで実行
        users.sortedBy { it.name }
    }
    .flowOn(Dispatchers.Default)
```

## よくある間違い

### ❌ 間違い: 同じFlowを複数回collect

```kotlin
// 各collectで独立してFlowが実行される
launch {
    myFlow.collect { println("Collector 1: $it") }
}
launch {
    myFlow.collect { println("Collector 2: $it") }
}
```

### ✅ 正しい: StateFlowで共有

```kotlin
val sharedFlow = myFlow.stateIn(
    scope = viewModelScope,
    started = SharingStarted.WhileSubscribed(),
    initialValue = null
)

// 複数のコレクターで同じ値を共有
launch {
    sharedFlow.collect { println("Collector 1: $it") }
}
launch {
    sharedFlow.collect { println("Collector 2: $it") }
}
```

### ❌ 間違い: Composable内でcollectを直接呼ぶ

```kotlin
@Composable
fun MyScreen(viewModel: MyViewModel) {
    // ❌ 毎回recomposeでcollectが呼ばれる
    viewModel.data.collect { }
}
```

### ✅ 正しい: collectAsStateを使う

```kotlin
@Composable
fun MyScreen(viewModel: MyViewModel) {
    // ✅ Composeのライフサイクルで管理
    val data by viewModel.data.collectAsState()
}
```

## まとめ

### Flowを使うべき場面

- ✅ 非同期データストリーム
- ✅ リアクティブなUI更新
- ✅ データベース（Room）からのリアルタイム更新
- ✅ ネットワークからのデータ取得
- ✅ 複雑なデータ変換や結合

### StateFlowを使うべき場面

- ✅ UIの状態管理
- ✅ 現在の値を保持する必要がある
- ✅ 複数のコンポーネントで状態を共有

### SharedFlowを使うべき場面

- ✅ イベントの配信
- ✅ 現在の値を保持する必要がない
- ✅ 一度きりのアクション（スナックバー表示など）

## 次のステップ

- [LiveData vs Flow 比較](/guide/livedata-vs-flow)
- [LaunchedEffect](/guide/launched-effect) - 副作用の処理
- [実践例: リアルタイム検索](/examples/realtime-search)

## 参考リンク

- [Kotlin Flow 公式ドキュメント](https://kotlinlang.org/docs/flow.html)
- [Android Developers - StateFlow と SharedFlow](https://developer.android.com/kotlin/flow/stateflow-and-sharedflow)
- [Android Developers - Flow とライフサイクル](https://developer.android.com/kotlin/flow)
