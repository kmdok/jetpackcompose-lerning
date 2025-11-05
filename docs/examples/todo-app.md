# 実践例: TODOアプリ (StateFlow版)

Jetpack Composeで実際のTODOアプリを作成します。StateFlowを使った状態管理を学びます。

## 完成イメージ

- TODOの追加
- 完了/未完了の切り替え
- TODOの削除
- フィルタリング（全て/未完了/完了済み）

## データモデル

```kotlin
data class Todo(
    val id: Int,
    val text: String,
    val completed: Boolean = false
)

enum class TodoFilter {
    ALL, ACTIVE, COMPLETED
}
```

## ViewModel

```kotlin
class TodoViewModel : ViewModel() {
    private val _todos = MutableStateFlow<List<Todo>>(emptyList())
    val todos: StateFlow<List<Todo>> = _todos.asStateFlow()

    private val _filter = MutableStateFlow(TodoFilter.ALL)
    val filter: StateFlow<TodoFilter> = _filter.asStateFlow()

    val filteredTodos: StateFlow<List<Todo>> = combine(
        _todos,
        _filter
    ) { todos, filter ->
        when (filter) {
            TodoFilter.ALL -> todos
            TodoFilter.ACTIVE -> todos.filter { !it.completed }
            TodoFilter.COMPLETED -> todos.filter { it.completed }
        }
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = emptyList()
    )

    fun addTodo(text: String) {
        if (text.isBlank()) return

        val newTodo = Todo(
            id = (_todos.value.maxOfOrNull { it.id } ?: 0) + 1,
            text = text.trim()
        )
        _todos.update { it + newTodo }
    }

    fun toggleTodo(id: Int) {
        _todos.update { todos ->
            todos.map {
                if (it.id == id) it.copy(completed = !it.completed)
                else it
            }
        }
    }

    fun deleteTodo(id: Int) {
        _todos.update { it.filter { todo -> todo.id != id } }
    }

    fun setFilter(filter: TodoFilter) {
        _filter.value = filter
    }

    fun clearCompleted() {
        _todos.update { it.filter { todo -> !todo.completed } }
    }
}
```

::: info combine関数
複数のFlowを結合して、新しいFlowを作成します。どちらかのFlowが更新されると、結合されたFlowも更新されます。
:::

## UI実装

### メイン画面

```kotlin
@Composable
fun TodoScreen(viewModel: TodoViewModel = viewModel()) {
    val todos by viewModel.filteredTodos.collectAsState()
    val filter by viewModel.filter.collectAsState()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("TODO アプリ") },
                actions = {
                    IconButton(onClick = { viewModel.clearCompleted() }) {
                        Icon(
                            Icons.Default.Delete,
                            contentDescription = "完了済みを削除"
                        )
                    }
                }
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            TodoInput(
                onAddTodo = { text ->
                    viewModel.addTodo(text)
                }
            )

            FilterChips(
                currentFilter = filter,
                onFilterChange = { viewModel.setFilter(it) }
            )

            TodoList(
                todos = todos,
                onToggleTodo = { viewModel.toggleTodo(it) },
                onDeleteTodo = { viewModel.deleteTodo(it) }
            )
        }
    }
}
```

### 入力フォーム

```kotlin
@Composable
fun TodoInput(onAddTodo: (String) -> Unit) {
    var text by remember { mutableStateOf("") }

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        OutlinedTextField(
            value = text,
            onValueChange = { text = it },
            modifier = Modifier.weight(1f),
            placeholder = { Text("新しいTODOを追加") },
            singleLine = true
        )

        Spacer(modifier = Modifier.width(8.dp))

        Button(
            onClick = {
                onAddTodo(text)
                text = ""
            },
            enabled = text.isNotBlank()
        ) {
            Icon(Icons.Default.Add, contentDescription = "追加")
        }
    }
}
```

### フィルターチップ

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun FilterChips(
    currentFilter: TodoFilter,
    onFilterChange: (TodoFilter) -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        TodoFilter.values().forEach { filter ->
            FilterChip(
                selected = currentFilter == filter,
                onClick = { onFilterChange(filter) },
                label = {
                    Text(
                        when (filter) {
                            TodoFilter.ALL -> "全て"
                            TodoFilter.ACTIVE -> "未完了"
                            TodoFilter.COMPLETED -> "完了済み"
                        }
                    )
                }
            )
        }
    }
}
```

### TODOリスト

```kotlin
@Composable
fun TodoList(
    todos: List<Todo>,
    onToggleTodo: (Int) -> Unit,
    onDeleteTodo: (Int) -> Unit
) {
    if (todos.isEmpty()) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Text(
                "TODOがありません",
                style = MaterialTheme.typography.bodyLarge,
                color = Color.Gray
            )
        }
    } else {
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(todos, key = { it.id }) { todo ->
                TodoItem(
                    todo = todo,
                    onToggle = { onToggleTodo(todo.id) },
                    onDelete = { onDeleteTodo(todo.id) }
                )
            }
        }
    }
}
```

### TODOアイテム

```kotlin
@Composable
fun TodoItem(
    todo: Todo,
    onToggle: () -> Unit,
    onDelete: () -> Unit
) {
    var showDeleteDialog by remember { mutableStateOf(false) }

    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(2.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clickable { onToggle() }
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Checkbox(
                checked = todo.completed,
                onCheckedChange = { onToggle() }
            )

            Spacer(modifier = Modifier.width(8.dp))

            Text(
                text = todo.text,
                modifier = Modifier.weight(1f),
                style = MaterialTheme.typography.bodyLarge,
                textDecoration = if (todo.completed) {
                    TextDecoration.LineThrough
                } else {
                    null
                },
                color = if (todo.completed) {
                    Color.Gray
                } else {
                    Color.Unspecified
                }
            )

            IconButton(onClick = { showDeleteDialog = true }) {
                Icon(
                    Icons.Default.Delete,
                    contentDescription = "削除",
                    tint = Color.Gray
                )
            }
        }
    }

    if (showDeleteDialog) {
        AlertDialog(
            onDismissRequest = { showDeleteDialog = false },
            title = { Text("TODOの削除") },
            text = { Text("本当に削除しますか？") },
            confirmButton = {
                TextButton(onClick = {
                    onDelete()
                    showDeleteDialog = false
                }) {
                    Text("削除")
                }
            },
            dismissButton = {
                TextButton(onClick = { showDeleteDialog = false }) {
                    Text("キャンセル")
                }
            }
        )
    }
}
```

## データの永続化（Room使用）

実際のアプリでは、データを永続化します。

### 依存関係

```kotlin
dependencies {
    implementation("androidx.room:room-runtime:2.6.1")
    implementation("androidx.room:room-ktx:2.6.1")
    ksp("androidx.room:room-compiler:2.6.1")
}
```

### Entityの定義

```kotlin
@Entity(tableName = "todos")
data class TodoEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val text: String,
    val completed: Boolean = false,
    val createdAt: Long = System.currentTimeMillis()
)
```

### DAO

```kotlin
@Dao
interface TodoDao {
    @Query("SELECT * FROM todos ORDER BY createdAt DESC")
    fun getAllTodos(): Flow<List<TodoEntity>>

    @Insert
    suspend fun insert(todo: TodoEntity)

    @Update
    suspend fun update(todo: TodoEntity)

    @Delete
    suspend fun delete(todo: TodoEntity)

    @Query("DELETE FROM todos WHERE completed = 1")
    suspend fun deleteCompleted()
}
```

### Database

```kotlin
@Database(entities = [TodoEntity::class], version = 1)
abstract class TodoDatabase : RoomDatabase() {
    abstract fun todoDao(): TodoDao

    companion object {
        @Volatile
        private var INSTANCE: TodoDatabase? = null

        fun getDatabase(context: Context): TodoDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    TodoDatabase::class.java,
                    "todo_database"
                ).build()
                INSTANCE = instance
                instance
            }
        }
    }
}
```

### ViewModelの更新

```kotlin
class TodoViewModel(private val todoDao: TodoDao) : ViewModel() {
    val todos: StateFlow<List<Todo>> = todoDao.getAllTodos()
        .map { entities -> entities.map { it.toTodo() } }
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )

    fun addTodo(text: String) {
        viewModelScope.launch {
            todoDao.insert(TodoEntity(text = text))
        }
    }

    // 他のメソッドも同様に更新...
}
```

## まとめ

このTODOアプリで学んだこと：

1. **StateFlow**での状態管理
2. **combine**で複数のFlowを結合
3. **LazyColumn**でリスト表示
4. **Dialog**でユーザー確認
5. **Room**でデータ永続化

## 公式ドキュメント参考リンク

- [State and Jetpack Compose](https://developer.android.com/jetpack/compose/state?hl=ja)
- [Room Database](https://developer.android.com/training/data-storage/room?hl=ja)
- [Kotlin Flow](https://developer.android.com/kotlin/flow?hl=ja)

## 次のステップ

- [API連携](/examples/api-fetching) - Retrofitを使ったAPI呼び出し
- [Navigation](/guide/navigation) - 複数画面への対応
