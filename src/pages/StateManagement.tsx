import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, CheckCircle2, Code2, Database, GitBranch, Zap } from 'lucide-react'

export default function StateManagement() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-android-green to-android-blue bg-clip-text text-transparent">
          State管理 (ViewModel + StateFlow/LiveData)
        </h1>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
          実践的なAndroid開発では、ViewModel + StateFlow/LiveData + Hiltを使った状態管理が標準です。
          rememberは使わず、テスト可能で保守性の高いアーキテクチャを構築します。
        </p>
      </div>

      {/* StateFlow vs LiveData Quick Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-android-green/30">
          <CardHeader className="bg-gradient-to-br from-android-green/10 to-android-blue/10">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="w-5 h-5" />
              StateFlow (推奨)
            </CardTitle>
            <CardDescription>Kotlin Coroutine統合</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-2 text-sm">
            <p>✅ <strong>Coroutine + Flow</strong>との完全統合</p>
            <p>✅ <strong>初期値必須</strong> (null安全)</p>
            <p>✅ <strong>map/filter/combine</strong> などの変換が簡単</p>
            <p>✅ <strong>Google推奨</strong> (2021年以降)</p>
            <p>📦 <code className="text-xs bg-gray-100 px-1 rounded">kotlinx-coroutines-core</code></p>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-200">
          <CardHeader className="bg-gradient-to-br from-orange-50 to-orange-100">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Database className="w-5 h-5" />
              LiveData
            </CardTitle>
            <CardDescription>Android AAC標準</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-2 text-sm">
            <p>✅ <strong>ライフサイクル自動対応</strong></p>
            <p>✅ <strong>シンプル</strong>で理解しやすい</p>
            <p>⚠️ <strong>Flowとの統合</strong>が弱い</p>
            <p>⚠️ <strong>変換がやや冗長</strong> (Transformations.*)</p>
            <p>📦 <code className="text-xs bg-gray-100 px-1 rounded">androidx.lifecycle</code></p>
          </CardContent>
        </Card>
      </div>

      {/* UiState Pattern */}
      <Card className="border-2 border-android-green/20">
        <CardHeader className="bg-gradient-to-r from-android-green/5 to-android-blue/5">
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            UiState パターン (推奨)
          </CardTitle>
          <CardDescription>Loading/Success/Errorを型安全に管理</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs">
{`// UiState定義 (sealed class で型安全に)
sealed interface UserUiState {
    object Loading : UserUiState
    data class Success(val user: User) : UserUiState
    data class Error(val message: String) : UserUiState
}

// ViewModel (Hilt DI)
@HiltViewModel
class UserViewModel @Inject constructor(
    private val repository: UserRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow<UserUiState>(UserUiState.Loading)
    val uiState: StateFlow<UserUiState> = _uiState.asStateFlow()

    fun loadUser(userId: Int) {
        viewModelScope.launch {
            _uiState.value = UserUiState.Loading
            try {
                val user = repository.getUser(userId)
                _uiState.value = UserUiState.Success(user)
            } catch (e: Exception) {
                _uiState.value = UserUiState.Error(e.message ?: "Unknown error")
            }
        }
    }
}

// Composable (UI)
@Composable
fun UserScreen(
    userId: Int,
    viewModel: UserViewModel = hiltViewModel()
) {
    val uiState by viewModel.uiState.collectAsState()

    LaunchedEffect(userId) {
        viewModel.loadUser(userId)
    }

    when (val state = uiState) {
        is UserUiState.Loading -> {
            CircularProgressIndicator()
        }
        is UserUiState.Success -> {
            Text("Name: \${state.user.name}")
            Text("Email: \${state.user.email}")
        }
        is UserUiState.Error -> {
            Text("Error: \${state.message}", color = Color.Red)
        }
    }
}`}
          </pre>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-blue-900">
              <strong>💡 ポイント:</strong> sealed interface で状態を型安全に表現。when式で全パターンを網羅的にハンドリング。
            </p>
          </div>
        </CardContent>
      </Card>

      {/* StateFlow Example */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            StateFlow の実践例
          </CardTitle>
          <CardDescription>複数のFlowを組み合わせた状態管理</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs">
{`// Repository
interface UserRepository {
    fun getUser(id: Int): Flow<User>
    suspend fun updateUser(user: User)
}

// ViewModel
@HiltViewModel
class UserProfileViewModel @Inject constructor(
    private val userRepository: UserRepository,
    private val authRepository: AuthRepository
) : ViewModel() {

    // 複数のStateFlowを管理
    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    private val _errorMessage = MutableStateFlow<String?>(null)
    val errorMessage: StateFlow<String?> = _errorMessage.asStateFlow()

    // FlowをStateFlowに変換
    val currentUser: StateFlow<User?> = authRepository.currentUserId
        .flatMapLatest { userId ->
            userRepository.getUser(userId)
        }
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = null
        )

    fun updateUserName(newName: String) {
        viewModelScope.launch {
            _isLoading.value = true
            _errorMessage.value = null
            try {
                val user = currentUser.value ?: return@launch
                userRepository.updateUser(user.copy(name = newName))
            } catch (e: Exception) {
                _errorMessage.value = e.message
            } finally {
                _isLoading.value = false
            }
        }
    }
}

// Composable
@Composable
fun UserProfileScreen(
    viewModel: UserProfileViewModel = hiltViewModel()
) {
    val user by viewModel.currentUser.collectAsState()
    val isLoading by viewModel.isLoading.collectAsState()
    val errorMessage by viewModel.errorMessage.collectAsState()

    Column(modifier = Modifier.padding(16.dp)) {
        user?.let {
            Text("Name: \${it.name}")
            Button(
                onClick = { viewModel.updateUserName("New Name") },
                enabled = !isLoading
            ) {
                if (isLoading) {
                    CircularProgressIndicator(
                        modifier = Modifier.size(16.dp)
                    )
                } else {
                    Text("Update")
                }
            }
        }

        errorMessage?.let { error ->
            Text(error, color = Color.Red)
        }
    }
}`}
          </pre>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                StateFlowの特徴
              </h4>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• <strong>stateIn()</strong>: FlowをStateFlowに変換</li>
                <li>• <strong>WhileSubscribed(5000)</strong>: 購読終了後5秒でキャンセル</li>
                <li>• <strong>flatMapLatest</strong>: 依存Flowが変わると自動切り替え</li>
                <li>• <strong>collectAsState()</strong>: Composableで購読</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4 text-android-green" />
                ベストプラクティス
              </h4>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• <strong>private</strong> MutableStateFlow + <strong>public</strong> StateFlow</li>
                <li>• <strong>viewModelScope</strong> で自動キャンセル</li>
                <li>• <strong>初期値</strong>を必ず設定 (null安全)</li>
                <li>• <strong>Hilt</strong>でRepositoryを注入</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* LiveData Example */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            LiveData の実践例
          </CardTitle>
          <CardDescription>シンプルな状態管理</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs">
{`// ViewModel
@HiltViewModel
class TaskListViewModel @Inject constructor(
    private val taskRepository: TaskRepository
) : ViewModel() {

    private val _tasks = MutableLiveData<List<Task>>(emptyList())
    val tasks: LiveData<List<Task>> = _tasks

    private val _isLoading = MutableLiveData(false)
    val isLoading: LiveData<Boolean> = _isLoading

    // LiveDataの変換
    val completedTaskCount: LiveData<Int> = tasks.map { taskList ->
        taskList.count { it.isCompleted }
    }

    fun loadTasks() {
        viewModelScope.launch {
            _isLoading.value = true
            try {
                val taskList = taskRepository.getAllTasks()
                _tasks.value = taskList
            } finally {
                _isLoading.value = false
            }
        }
    }

    fun toggleTask(taskId: Int) {
        viewModelScope.launch {
            taskRepository.toggleTask(taskId)
            loadTasks() // 再読み込み
        }
    }
}

// Composable
@Composable
fun TaskListScreen(
    viewModel: TaskListViewModel = hiltViewModel()
) {
    val tasks by viewModel.tasks.observeAsState(initial = emptyList())
    val isLoading by viewModel.isLoading.observeAsState(initial = false)
    val completedCount by viewModel.completedTaskCount.observeAsState(initial = 0)

    LaunchedEffect(Unit) {
        viewModel.loadTasks()
    }

    Column {
        Text("Completed: $completedCount / \${tasks.size}")

        if (isLoading) {
            CircularProgressIndicator()
        } else {
            LazyColumn {
                items(tasks) { task ->
                    TaskItem(
                        task = task,
                        onToggle = { viewModel.toggleTask(task.id) }
                    )
                }
            }
        }
    }
}`}
          </pre>
          <div className="bg-orange-50 p-3 rounded-lg">
            <p className="text-xs text-orange-900">
              <strong>💡 LiveData vs StateFlow:</strong> LiveDataはシンプルですが、Flowの変換機能が弱いです。
              複雑な状態管理やRepositoryがFlowを返す場合は、StateFlowを使う方が柔軟です。
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Side Effects (LaunchedEffect) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            副作用の処理 (LaunchedEffect)
          </CardTitle>
          <CardDescription>初回ロード、画面遷移時の処理</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs">
{`// ViewModel
@HiltViewModel
class ProductDetailViewModel @Inject constructor(
    private val repository: ProductRepository,
    private val analytics: AnalyticsService
) : ViewModel() {

    private val _product = MutableStateFlow<Product?>(null)
    val product: StateFlow<Product?> = _product.asStateFlow()

    fun loadProduct(productId: Int) {
        viewModelScope.launch {
            _product.value = repository.getProduct(productId)
            analytics.logProductView(productId) // 副作用
        }
    }
}

// Composable
@Composable
fun ProductDetailScreen(
    productId: Int,
    viewModel: ProductDetailViewModel = hiltViewModel()
) {
    val product by viewModel.product.collectAsState()

    // 初回のみ実行 (productIdが変わったら再実行)
    LaunchedEffect(productId) {
        viewModel.loadProduct(productId)
    }

    // 1回だけ実行 (画面表示時)
    LaunchedEffect(Unit) {
        // 初回のみ実行される処理
        viewModel.trackScreenView()
    }

    product?.let {
        Column {
            Text(it.name, style = MaterialTheme.typography.headlineMedium)
            Text(it.description)
            Text("$\${it.price}")
        }
    }
}`}
          </pre>
          <div className="space-y-2 text-sm">
            <h4 className="font-semibold">LaunchedEffect のキー</h4>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• <code className="bg-gray-100 px-1 rounded">LaunchedEffect(key)</code>: keyが変わると再実行</li>
              <li>• <code className="bg-gray-100 px-1 rounded">LaunchedEffect(Unit)</code>: 初回のみ実行</li>
              <li>• <code className="bg-gray-100 px-1 rounded">LaunchedEffect(a, b)</code>: a または b が変わったら再実行</li>
            </ul>
          </div>
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
              React (useState + useEffect + Redux)
            </h3>
            <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs">
{`// Redux Store
const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, loading: false, error: null },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

// Component
function UserProfile({ userId }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);
  const loading = useSelector(state => state.user.loading);

  useEffect(() => {
    dispatch(setLoading(true));
    fetchUser(userId).then(data => {
      dispatch(setUser(data));
      dispatch(setLoading(false));
    });
  }, [userId]); // userId変更時に再実行

  if (loading) return <Spinner />;
  return <div>{user?.name}</div>;
}`}
            </pre>
            <p className="text-xs text-gray-600 mt-2">
              → Compose: <code className="bg-gray-100 px-1 rounded">ViewModel + StateFlow + LaunchedEffect</code>
            </p>
          </div>

          {/* Flutter */}
          <div>
            <h3 className="font-semibold text-flutter-blue mb-3 flex items-center gap-2 text-lg">
              <span className="text-xl">🐦</span>
              Flutter (Riverpod + AsyncNotifier)
            </h3>
            <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs">
{`// Provider (Riverpod)
final userProvider = AsyncNotifierProvider<UserNotifier, User?>(() {
  return UserNotifier();
});

class UserNotifier extends AsyncNotifier<User?> {
  @override
  Future<User?> build() async {
    return null;
  }

  Future<void> loadUser(int userId) async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() async {
      return await ref.read(userRepositoryProvider).getUser(userId);
    });
  }
}

// Widget
class UserProfile extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final userAsync = ref.watch(userProvider);

    return userAsync.when(
      data: (user) => Text(user?.name ?? ''),
      loading: () => CircularProgressIndicator(),
      error: (err, stack) => Text('Error: $err'),
    );
  }
}`}
            </pre>
            <p className="text-xs text-gray-600 mt-2">
              → Compose: <code className="bg-gray-100 px-1 rounded">ViewModel + StateFlow + sealed interface</code>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Learning Path */}
      <Card className="border-2 border-android-green/20 bg-gradient-to-br from-android-green/5 to-android-blue/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            状態管理のベストプラクティス
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-android-green text-white flex items-center justify-center text-xs font-bold">1</div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">ViewModelで状態を管理</h3>
                <p className="text-xs text-gray-600">Composable内で直接状態を持たない (rememberは使わない)</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-android-green text-white flex items-center justify-center text-xs font-bold">2</div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">StateFlow を優先</h3>
                <p className="text-xs text-gray-600">新規プロジェクトではStateFlow、既存LiveDataプロジェクトは段階的に移行</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-android-green text-white flex items-center justify-center text-xs font-bold">3</div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">UiState パターン</h3>
                <p className="text-xs text-gray-600">sealed interface でLoading/Success/Errorを型安全に表現</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-android-green text-white flex items-center justify-center text-xs font-bold">4</div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Hilt で依存性注入</h3>
                <p className="text-xs text-gray-600">@HiltViewModel + @Inject constructor でテスト可能に</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-android-green text-white flex items-center justify-center text-xs font-bold">5</div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">LaunchedEffect で副作用</h3>
                <p className="text-xs text-gray-600">初回ロード、パラメータ変更時の処理はLaunchedEffectで</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
