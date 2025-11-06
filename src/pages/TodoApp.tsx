import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Box, CheckCircle2, Database, Layers, Package, Zap } from 'lucide-react'

export default function TodoApp() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-android-green to-android-blue bg-clip-text text-transparent">
          実践例: TODOアプリ (完全版)
        </h1>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
          実際のプロジェクトで使われる完全なアーキテクチャ:
          Room (DB) → Repository → ViewModel (Hilt DI) → Composable UI
        </p>
      </div>

      {/* Architecture Overview */}
      <Card className="border-2 border-android-green/30">
        <CardHeader className="bg-gradient-to-r from-android-green/10 to-android-blue/10">
          <CardTitle className="flex items-center gap-2">
            <Layers className="w-5 h-5" />
            アーキテクチャ構成
          </CardTitle>
          <CardDescription>レイヤー構成と責務</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-2 p-3 bg-blue-50 rounded-lg">
              <div className="font-semibold text-sm text-blue-900">UI Layer</div>
              <p className="text-xs text-gray-600">Composable関数でUIを構築</p>
            </div>
            <div className="space-y-2 p-3 bg-green-50 rounded-lg">
              <div className="font-semibold text-sm text-green-900">ViewModel</div>
              <p className="text-xs text-gray-600">状態管理とビジネスロジック</p>
            </div>
            <div className="space-y-2 p-3 bg-purple-50 rounded-lg">
              <div className="font-semibold text-sm text-purple-900">Repository</div>
              <p className="text-xs text-gray-600">データソースの抽象化</p>
            </div>
            <div className="space-y-2 p-3 bg-orange-50 rounded-lg">
              <div className="font-semibold text-sm text-orange-900">Data Source</div>
              <p className="text-xs text-gray-600">Room Database</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Layer - Room */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            1. Data Layer (Room Database)
          </CardTitle>
          <CardDescription>Entity, DAO, Database</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs">
{`// Entity (テーブル定義)
@Entity(tableName = "todos")
data class TodoEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val title: String,
    val description: String,
    val isCompleted: Boolean = false,
    val createdAt: Long = System.currentTimeMillis()
)

// DAO (データアクセス)
@Dao
interface TodoDao {
    @Query("SELECT * FROM todos ORDER BY createdAt DESC")
    fun getAllTodos(): Flow<List<TodoEntity>>

    @Query("SELECT * FROM todos WHERE id = :id")
    suspend fun getTodoById(id: Int): TodoEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertTodo(todo: TodoEntity): Long

    @Update
    suspend fun updateTodo(todo: TodoEntity)

    @Delete
    suspend fun deleteTodo(todo: TodoEntity)

    @Query("DELETE FROM todos WHERE isCompleted = 1")
    suspend fun deleteCompletedTodos()
}

// Database
@Database(
    entities = [TodoEntity::class],
    version = 1,
    exportSchema = false
)
abstract class TodoDatabase : RoomDatabase() {
    abstract fun todoDao(): TodoDao
}

// Hilt Module (Database提供)
@Module
@InstallIn(SingletonComponent::class)
object DatabaseModule {
    @Provides
    @Singleton
    fun provideDatabase(
        @ApplicationContext context: Context
    ): TodoDatabase {
        return Room.databaseBuilder(
            context,
            TodoDatabase::class.java,
            "todo_database"
        ).build()
    }

    @Provides
    fun provideTodoDao(database: TodoDatabase): TodoDao {
        return database.todoDao()
    }
}`}
          </pre>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-blue-900">
              <strong>💡 Room:</strong> FlowでデータをObserve。DBが更新されると自動的にUIが更新される。
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Repository Layer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            2. Repository Layer (データソース抽象化)
          </CardTitle>
          <CardDescription>ViewModelから実装の詳細を隠蔽</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs">
{`// Domain Model (UIで使うモデル)
data class Todo(
    val id: Int,
    val title: String,
    val description: String,
    val isCompleted: Boolean,
    val createdAt: Long
)

// Repository Interface
interface TodoRepository {
    fun getAllTodos(): Flow<List<Todo>>
    suspend fun getTodoById(id: Int): Todo?
    suspend fun addTodo(title: String, description: String): Result<Unit>
    suspend fun updateTodo(todo: Todo): Result<Unit>
    suspend fun deleteTodo(todo: Todo): Result<Unit>
    suspend fun toggleTodoCompletion(id: Int): Result<Unit>
    suspend fun deleteCompletedTodos(): Result<Unit>
}

// Repository Implementation
class TodoRepositoryImpl @Inject constructor(
    private val todoDao: TodoDao
) : TodoRepository {

    override fun getAllTodos(): Flow<List<Todo>> {
        return todoDao.getAllTodos().map { entities ->
            entities.map { it.toDomain() }
        }
    }

    override suspend fun getTodoById(id: Int): Todo? {
        return todoDao.getTodoById(id)?.toDomain()
    }

    override suspend fun addTodo(
        title: String,
        description: String
    ): Result<Unit> = runCatching {
        val entity = TodoEntity(
            title = title,
            description = description
        )
        todoDao.insertTodo(entity)
    }

    override suspend fun updateTodo(todo: Todo): Result<Unit> = runCatching {
        todoDao.updateTodo(todo.toEntity())
    }

    override suspend fun deleteTodo(todo: Todo): Result<Unit> = runCatching {
        todoDao.deleteTodo(todo.toEntity())
    }

    override suspend fun toggleTodoCompletion(id: Int): Result<Unit> = runCatching {
        val todo = todoDao.getTodoById(id) ?: return@runCatching
        todoDao.updateTodo(todo.copy(isCompleted = !todo.isCompleted))
    }

    override suspend fun deleteCompletedTodos(): Result<Unit> = runCatching {
        todoDao.deleteCompletedTodos()
    }
}

// Mapper Extensions
fun TodoEntity.toDomain() = Todo(
    id = id,
    title = title,
    description = description,
    isCompleted = isCompleted,
    createdAt = createdAt
)

fun Todo.toEntity() = TodoEntity(
    id = id,
    title = title,
    description = description,
    isCompleted = isCompleted,
    createdAt = createdAt
)

// Hilt Module (Repository提供)
@Module
@InstallIn(SingletonComponent::class)
abstract class RepositoryModule {
    @Binds
    @Singleton
    abstract fun bindTodoRepository(
        impl: TodoRepositoryImpl
    ): TodoRepository
}`}
          </pre>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-xs text-purple-900">
              <strong>💡 Repository Pattern:</strong> データソース(Room, API等)の実装を隠蔽。テストでモックに差し替え可能。
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ViewModel Layer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Box className="w-5 h-5" />
            3. ViewModel (状態管理 + ビジネスロジック)
          </CardTitle>
          <CardDescription>UiStateパターンで型安全な状態管理</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs">
{`// UiState
sealed interface TodoListUiState {
    object Loading : TodoListUiState
    data class Success(
        val todos: List<Todo>,
        val completedCount: Int,
        val activeCount: Int
    ) : TodoListUiState
    data class Error(val message: String) : TodoListUiState
}

// ViewModel
@HiltViewModel
class TodoListViewModel @Inject constructor(
    private val repository: TodoRepository
) : ViewModel() {

    // UI State
    private val _uiState = MutableStateFlow<TodoListUiState>(
        TodoListUiState.Loading
    )
    val uiState: StateFlow<TodoListUiState> = _uiState.asStateFlow()

    // Input fields
    private val _titleInput = MutableStateFlow("")
    val titleInput: StateFlow<String> = _titleInput.asStateFlow()

    private val _descriptionInput = MutableStateFlow("")
    val descriptionInput: StateFlow<String> = _descriptionInput.asStateFlow()

    init {
        loadTodos()
    }

    private fun loadTodos() {
        viewModelScope.launch {
            repository.getAllTodos()
                .catch { e ->
                    _uiState.value = TodoListUiState.Error(
                        e.message ?: "Unknown error"
                    )
                }
                .collect { todos ->
                    _uiState.value = TodoListUiState.Success(
                        todos = todos,
                        completedCount = todos.count { it.isCompleted },
                        activeCount = todos.count { !it.isCompleted }
                    )
                }
        }
    }

    fun onTitleChange(title: String) {
        _titleInput.value = title
    }

    fun onDescriptionChange(description: String) {
        _descriptionInput.value = description
    }

    fun addTodo() {
        viewModelScope.launch {
            val title = _titleInput.value.trim()
            if (title.isEmpty()) return@launch

            repository.addTodo(
                title = title,
                description = _descriptionInput.value.trim()
            ).onSuccess {
                _titleInput.value = ""
                _descriptionInput.value = ""
            }.onFailure { e ->
                // エラーハンドリング (Snackbar等)
            }
        }
    }

    fun toggleTodo(id: Int) {
        viewModelScope.launch {
            repository.toggleTodoCompletion(id)
        }
    }

    fun deleteTodo(todo: Todo) {
        viewModelScope.launch {
            repository.deleteTodo(todo)
        }
    }

    fun deleteCompletedTodos() {
        viewModelScope.launch {
            repository.deleteCompletedTodos()
        }
    }
}`}
          </pre>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                ViewModelの責務
              </h4>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• <strong>状態管理</strong>: UiStateでLoading/Success/Error</li>
                <li>• <strong>ビジネスロジック</strong>: バリデーション等</li>
                <li>• <strong>Repository呼び出し</strong>: データ操作</li>
                <li>• <strong>入力フォーム管理</strong>: title/description</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4 text-android-green" />
                ポイント
              </h4>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• <strong>@HiltViewModel</strong>: 自動DI</li>
                <li>• <strong>viewModelScope</strong>: 自動キャンセル</li>
                <li>• <strong>Flow.collect</strong>: DB変更を自動反映</li>
                <li>• <strong>Result型</strong>: エラーハンドリング</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* UI Layer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            4. UI Layer (Composable)
          </CardTitle>
          <CardDescription>宣言的UI</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs">
{`@Composable
fun TodoListScreen(
    viewModel: TodoListViewModel = hiltViewModel()
) {
    val uiState by viewModel.uiState.collectAsState()
    val titleInput by viewModel.titleInput.collectAsState()
    val descriptionInput by viewModel.descriptionInput.collectAsState()

    Scaffold(
        topBar = {
            TopAppBar(title = { Text("TODO App") })
        },
        floatingActionButton = {
            FloatingActionButton(
                onClick = { viewModel.addTodo() }
            ) {
                Icon(Icons.Default.Add, contentDescription = "Add")
            }
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            // Input Section
            TodoInputSection(
                title = titleInput,
                description = descriptionInput,
                onTitleChange = viewModel::onTitleChange,
                onDescriptionChange = viewModel::onDescriptionChange,
                onAddClick = viewModel::addTodo
            )

            Divider()

            // Content
            when (val state = uiState) {
                is TodoListUiState.Loading -> {
                    Box(
                        modifier = Modifier.fillMaxSize(),
                        contentAlignment = Alignment.Center
                    ) {
                        CircularProgressIndicator()
                    }
                }

                is TodoListUiState.Success -> {
                    // Stats
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(
                            "Active: \${state.activeCount}",
                            style = MaterialTheme.typography.bodyMedium
                        )
                        Text(
                            "Completed: \${state.completedCount}",
                            style = MaterialTheme.typography.bodyMedium
                        )
                    }

                    // Todo List
                    if (state.todos.isEmpty()) {
                        EmptyTodoMessage()
                    } else {
                        LazyColumn(
                            modifier = Modifier.fillMaxSize()
                        ) {
                            items(
                                items = state.todos,
                                key = { it.id }
                            ) { todo ->
                                TodoItem(
                                    todo = todo,
                                    onToggle = { viewModel.toggleTodo(todo.id) },
                                    onDelete = { viewModel.deleteTodo(todo) }
                                )
                            }
                        }
                    }
                }

                is TodoListUiState.Error -> {
                    ErrorMessage(message = state.message)
                }
            }
        }
    }
}

@Composable
fun TodoItem(
    todo: Todo,
    onToggle: () -> Unit,
    onDelete: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 8.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Checkbox(
                checked = todo.isCompleted,
                onCheckedChange = { onToggle() }
            )

            Column(
                modifier = Modifier
                    .weight(1f)
                    .padding(horizontal = 16.dp)
            ) {
                Text(
                    text = todo.title,
                    style = MaterialTheme.typography.bodyLarge,
                    textDecoration = if (todo.isCompleted) {
                        TextDecoration.LineThrough
                    } else {
                        TextDecoration.None
                    }
                )
                if (todo.description.isNotEmpty()) {
                    Text(
                        text = todo.description,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }

            IconButton(onClick = onDelete) {
                Icon(
                    Icons.Default.Delete,
                    contentDescription = "Delete",
                    tint = MaterialTheme.colorScheme.error
                )
            }
        }
    }
}`}
          </pre>
        </CardContent>
      </Card>

      {/* Comparison with React/Flutter */}
      <Card className="border-2 border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardTitle>React/Flutter との対応</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* React */}
          <div>
            <h3 className="font-semibold text-react-blue mb-3 flex items-center gap-2 text-lg">
              <span className="text-xl">⚛️</span>
              React (Redux Toolkit + React Query)
            </h3>
            <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs">
{`// Redux Slice
const todoSlice = createSlice({
  name: 'todos',
  initialState: { items: [], loading: false, error: null },
  reducers: {
    setTodos: (state, action) => {
      state.items = action.payload;
    },
    addTodoOptimistic: (state, action) => {
      state.items.push(action.payload);
    }
  }
});

// Component with React Query
function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.items);

  // データフェッチ
  const { isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    onSuccess: (data) => dispatch(setTodos(data))
  });

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => queryClient.invalidateQueries(['todos'])
  });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}`}
            </pre>
            <p className="text-xs text-gray-600 mt-2">
              → Compose: <code className="bg-gray-100 px-1 rounded">Room + Repository + ViewModel + StateFlow</code>
            </p>
          </div>

          {/* Flutter */}
          <div>
            <h3 className="font-semibold text-flutter-blue mb-3 flex items-center gap-2 text-lg">
              <span className="text-xl">🐦</span>
              Flutter (Riverpod + Drift/SQLite)
            </h3>
            <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs">
{`// Repository Provider
final todoRepositoryProvider = Provider<TodoRepository>((ref) {
  return TodoRepositoryImpl(ref.read(databaseProvider));
});

// State Provider
final todoListProvider = StreamProvider<List<Todo>>((ref) {
  return ref.watch(todoRepositoryProvider).watchAllTodos();
});

// Notifier
class TodoNotifier extends StateNotifier<AsyncValue<List<Todo>>> {
  TodoNotifier(this.repository) : super(const AsyncValue.loading()) {
    _init();
  }

  final TodoRepository repository;

  Future<void> _init() async {
    repository.watchAllTodos().listen((todos) {
      state = AsyncValue.data(todos);
    });
  }

  Future<void> addTodo(String title) async {
    await repository.addTodo(title);
  }
}

// Widget
class TodoListScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final todosAsync = ref.watch(todoListProvider);

    return todosAsync.when(
      data: (todos) => ListView.builder(
        itemCount: todos.length,
        itemBuilder: (context, index) {
          return TodoTile(todo: todos[index]);
        },
      ),
      loading: () => CircularProgressIndicator(),
      error: (err, stack) => Text('Error: $err'),
    );
  }
}`}
            </pre>
            <p className="text-xs text-gray-600 mt-2">
              → Compose: <code className="bg-gray-100 px-1 rounded">Room + Hilt + ViewModel + StateFlow + sealed interface</code>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card className="border-2 border-android-green/20 bg-gradient-to-br from-android-green/5 to-android-blue/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            実装のベストプラクティス
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-android-green text-white flex items-center justify-center text-xs font-bold">1</div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">レイヤー分離</h3>
                <p className="text-xs text-gray-600">UI → ViewModel → Repository → DataSource で依存を一方向に</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-android-green text-white flex items-center justify-center text-xs font-bold">2</div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Hiltで完全DI</h3>
                <p className="text-xs text-gray-600">全レイヤーでDIを使い、テスト可能に</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-android-green text-white flex items-center justify-center text-xs font-bold">3</div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Room + Flow</h3>
                <p className="text-xs text-gray-600">RoomのFlowでリアクティブなDB監視</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-android-green text-white flex items-center justify-center text-xs font-bold">4</div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">UiStateパターン</h3>
                <p className="text-xs text-gray-600">sealed interfaceでLoading/Success/Errorを表現</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-android-green text-white flex items-center justify-center text-xs font-bold">5</div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">ドメインモデル分離</h3>
                <p className="text-xs text-gray-600">Entity (DB) と Domain Model (UI) を分ける</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gradle Dependencies */}
      <Card>
        <CardHeader>
          <CardTitle>必要な依存関係 (build.gradle.kts)</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs">
{`dependencies {
    // Compose
    implementation("androidx.compose.ui:ui:1.5.4")
    implementation("androidx.compose.material3:material3:1.1.2")

    // ViewModel
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.6.2")

    // Hilt
    implementation("com.google.dagger:hilt-android:2.48")
    kapt("com.google.dagger:hilt-compiler:2.48")
    implementation("androidx.hilt:hilt-navigation-compose:1.1.0")

    // Room
    implementation("androidx.room:room-runtime:2.6.0")
    implementation("androidx.room:room-ktx:2.6.0")
    kapt("androidx.room:room-compiler:2.6.0")

    // Coroutines
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3")
}`}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
