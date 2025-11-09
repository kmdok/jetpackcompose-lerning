import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import CodeBlock from '@/components/CodeBlock'
import { CheckCircle2, GitBranch, RefreshCw, Database, ArrowRight, Clock, Shield, Layers } from 'lucide-react'

export default function StateManagement() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-android-green to-android-blue bg-clip-text text-transparent">
          State管理完全ガイド
        </h1>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 text-xs border rounded">ViewModel</span>
          <span className="px-2 py-1 text-xs border rounded">StateFlow/LiveData</span>
          <span className="px-2 py-1 text-xs border rounded">UiStateパターン</span>
          <span className="px-2 py-1 text-xs border rounded">ライフサイクル</span>
          <span className="px-2 py-1 text-xs border rounded">Hilt</span>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            💡 <strong>状態管理の選択基準</strong>については、
            <a href="/state-comparison" className="underline font-medium">LiveData vs Flow vs State比較ページ</a>
            で詳しく解説しています。
          </p>
        </div>
      </div>

      {/* ViewModel Architecture */}
      <Card className="border-2 border-android-green/30">
        <CardHeader className="bg-gradient-to-br from-android-green/10 to-android-blue/10">
          <CardTitle className="flex items-center gap-2">
            <Layers className="w-5 h-5" />
            ViewModel アーキテクチャの完全理解
          </CardTitle>
          <CardDescription>MVVMパターンの中核コンポーネント</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* Why ViewModel */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              ViewModelを使う理由
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-green-700">✅ ViewModelの利点</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• <strong>設定変更に対する耐性</strong> - 画面回転で状態が保持される</li>
                  <li>• <strong>ライフサイクル対応</strong> - 自動的なリソース管理</li>
                  <li>• <strong>UI分離</strong> - ビジネスロジックとUIの分離</li>
                  <li>• <strong>テスト容易性</strong> - Unit testが簡単</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-red-700">❌ Activity/Fragment直接の問題</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• 画面回転で状態が失われる</li>
                  <li>• メモリリークのリスク</li>
                  <li>• テストが困難</li>
                  <li>• UI と ビジネスロジックが密結合</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ViewModel Lifecycle */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              ViewModelライフサイクル
            </h3>
            <CodeBlock className="text-sm">
{`// ViewModel のライフサイクル
class MyActivity : AppCompatActivity() {
    private val viewModel: MyViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // ViewModelインスタンス作成 (初回のみ)
    }

    override fun onDestroy() {
        super.onDestroy()
        // Activity終了時のみ ViewModel.onCleared() 呼ばれる
        // 設定変更 (画面回転) では呼ばれない！
    }
}

class MyViewModel : ViewModel() {
    init {
        // ViewModelの初期化
        // 設定変更では再実行されない
    }

    override fun onCleared() {
        // ViewModel破棄時に呼ばれる
        // リソースクリーンアップを実行
        super.onCleared()
    }
}

// ライフサイクル図
/*
Activity作成 → ViewModel作成
     ↓
設定変更 (回転) → ViewModelは保持される
     ↓
Activity再作成 → 同じViewModelを取得
     ↓
Activity完全終了 → ViewModel.onCleared()
*/`}
            </CodeBlock>
          </div>
        </CardContent>
      </Card>

      {/* UiState Pattern */}
      <Card className="border-2 border-purple-200">
        <CardHeader className="bg-gradient-to-br from-purple-50 to-pink-50">
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            UiState パターン - 状態の型安全管理
          </CardTitle>
          <CardDescription>Loading/Success/Errorを完全制御</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* Basic UiState */}
          <div className="space-y-3">
            <h3 className="font-semibold">基本的なUiStateパターン</h3>
            <CodeBlock className="text-sm">
{`// 基本的なUiState定義
sealed interface UserUiState {
    object Loading : UserUiState
    data class Success(val user: User) : UserUiState
    data class Error(val message: String) : UserUiState
}

// より詳細なUiState (実践的)
sealed interface UserDetailUiState {
    object Loading : UserDetailUiState
    object Empty : UserDetailUiState
    
    data class Success(
        val user: User,
        val posts: List<Post> = emptyList(),
        val isRefreshing: Boolean = false
    ) : UserDetailUiState
    
    data class Error(
        val message: String,
        val canRetry: Boolean = true,
        val lastSuccessData: User? = null  // 前回成功データの保持
    ) : UserDetailUiState
}

@HiltViewModel
class UserDetailViewModel @Inject constructor(
    private val userRepository: UserRepository,
    private val postRepository: PostRepository
) : ViewModel() {
    
    private val _uiState = MutableStateFlow<UserDetailUiState>(UserDetailUiState.Loading)
    val uiState: StateFlow<UserDetailUiState> = _uiState.asStateFlow()
    
    fun loadUserDetail(userId: String) {
        viewModelScope.launch {
            _uiState.value = UserDetailUiState.Loading
            
            try {
                // 並列でUser情報とPost情報を取得
                val userDeferred = async { userRepository.getUser(userId) }
                val postsDeferred = async { postRepository.getUserPosts(userId) }
                
                val user = userDeferred.await()
                val posts = postsDeferred.await()
                
                _uiState.value = UserDetailUiState.Success(
                    user = user,
                    posts = posts
                )
            } catch (e: Exception) {
                _uiState.value = UserDetailUiState.Error(
                    message = e.message ?: "Unknown error",
                    canRetry = true
                )
            }
        }
    }
    
    fun refresh() {
        val currentState = _uiState.value
        if (currentState is UserDetailUiState.Success) {
            // リフレッシュ中は成功状態を維持してスピナーだけ表示
            _uiState.value = currentState.copy(isRefreshing = true)
            
            viewModelScope.launch {
                try {
                    val user = userRepository.getUser(currentState.user.id)
                    val posts = postRepository.getUserPosts(currentState.user.id)
                    
                    _uiState.value = UserDetailUiState.Success(
                        user = user,
                        posts = posts,
                        isRefreshing = false
                    )
                } catch (e: Exception) {
                    _uiState.value = UserDetailUiState.Error(
                        message = e.message ?: "Refresh failed",
                        lastSuccessData = currentState.user
                    )
                }
            }
        }
    }
}`}
            </CodeBlock>
          </div>

          {/* UI Implementation */}
          <div className="space-y-3">
            <h3 className="font-semibold">UI実装 - when式での状態ハンドリング</h3>
            <CodeBlock className="text-sm">
{`@Composable
fun UserDetailScreen(
    userId: String,
    viewModel: UserDetailViewModel = hiltViewModel()
) {
    val uiState by viewModel.uiState.collectAsState()
    
    // 初期データロード
    LaunchedEffect(userId) {
        viewModel.loadUserDetail(userId)
    }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        when (val state = uiState) {
            is UserDetailUiState.Loading -> {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        CircularProgressIndicator()
                        Spacer(modifier = Modifier.height(8.dp))
                        Text("Loading user details...")
                    }
                }
            }
            
            is UserDetailUiState.Empty -> {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Icon(
                            imageVector = Icons.Default.Person,
                            contentDescription = null,
                            modifier = Modifier.size(64.dp),
                            tint = Color.Gray
                        )
                        Text("No user found")
                    }
                }
            }
            
            is UserDetailUiState.Success -> {
                // Pull to refresh
                val pullRefreshState = rememberPullRefreshState(
                    refreshing = state.isRefreshing,
                    onRefresh = { viewModel.refresh() }
                )
                
                Box(
                    modifier = Modifier.pullRefresh(pullRefreshState)
                ) {
                    LazyColumn {
                        item {
                            UserCard(user = state.user)
                        }
                        
                        item {
                            Text(
                                text = "Posts (\${state.posts.size})",
                                style = MaterialTheme.typography.titleMedium,
                                modifier = Modifier.padding(vertical = 8.dp)
                            )
                        }
                        
                        items(state.posts) { post ->
                            PostCard(post = post)
                        }
                    }
                    
                    PullRefreshIndicator(
                        refreshing = state.isRefreshing,
                        state = pullRefreshState,
                        modifier = Modifier.align(Alignment.TopCenter)
                    )
                }
            }
            
            is UserDetailUiState.Error -> {
                Column(
                    modifier = Modifier.fillMaxSize(),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.Error,
                        contentDescription = null,
                        tint = Color.Red,
                        modifier = Modifier.size(48.dp)
                    )
                    
                    Spacer(modifier = Modifier.height(8.dp))
                    
                    Text(
                        text = state.message,
                        style = MaterialTheme.typography.bodyMedium,
                        textAlign = TextAlign.Center,
                        color = Color.Red
                    )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    if (state.canRetry) {
                        Button(
                            onClick = { viewModel.loadUserDetail(userId) }
                        ) {
                            Icon(
                                imageVector = Icons.Default.Refresh,
                                contentDescription = null,
                                modifier = Modifier.size(16.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text("Retry")
                        }
                    }
                    
                    // 前回の成功データがある場合は表示
                    state.lastSuccessData?.let { lastData ->
                        Spacer(modifier = Modifier.height(16.dp))
                        Card(
                            modifier = Modifier.alpha(0.6f)
                        ) {
                            UserCard(user = lastData)
                        }
                    }
                }
            }
        }
    }
}`}
            </CodeBlock>
          </div>
        </CardContent>
      </Card>

      {/* StateFlow vs LiveData Deep Dive */}
      <Card className="border-2 border-blue-200">
        <CardHeader className="bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            StateFlow vs LiveData - 技術的詳細比較
          </CardTitle>
          <CardDescription>それぞれの内部動作と使い分け</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* Technical Comparison */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* LiveData */}
            <div className="space-y-3">
              <h3 className="font-semibold text-orange-700">LiveData の特徴</h3>
              <div className="space-y-2">
                <div className="bg-orange-50 p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-orange-800">内部動作</h4>
                  <ul className="text-xs text-orange-700 mt-1 space-y-1">
                    <li>• Android AAC (Architecture Components) 専用</li>
                    <li>• LifecycleOwner に自動的にバインド</li>
                    <li>• ACTIVE 状態 (STARTED/RESUMED) でのみ更新</li>
                    <li>• 自動的な購読解除でメモリリーク防止</li>
                  </ul>
                </div>
                <CodeBlock className="text-xs">
{`// LiveData の実装
class UserViewModel : ViewModel() {
    private val _user = MutableLiveData<User>()
    val user: LiveData<User> = _user
    
    private val _loading = MutableLiveData<Boolean>()
    val loading: LiveData<Boolean> = _loading
}

// Compose での使用 (observeAsState)
@Composable
fun UserScreen(viewModel: UserViewModel) {
    val user by viewModel.user.observeAsState()
    val loading by viewModel.loading.observeAsState(false)
    
    if (loading) {
        CircularProgressIndicator()
    } else {
        user?.let { Text(it.name) }
    }
}

// Fragment/Activity での使用
viewModel.user.observe(this) { user ->
    // ACTIVE状態でのみ呼ばれる
    updateUI(user)
}`}
                </CodeBlock>
              </div>
            </div>

            {/* StateFlow */}
            <div className="space-y-3">
              <h3 className="font-semibold text-blue-700">StateFlow の特徴</h3>
              <div className="space-y-2">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-800">内部動作</h4>
                  <ul className="text-xs text-blue-700 mt-1 space-y-1">
                    <li>• Kotlin Coroutines ベース</li>
                    <li>• プラットフォーム非依存 (KMP対応)</li>
                    <li>• Hot Stream - 常に最新値を保持</li>
                    <li>• Conflated - 最新値のみを配信</li>
                  </ul>
                </div>
                <CodeBlock className="text-xs">
{`// StateFlow の実装  
class UserViewModel : ViewModel() {
    private val _user = MutableStateFlow<User?>(null)
    val user: StateFlow<User?> = _user.asStateFlow()
    
    private val _loading = MutableStateFlow(false)
    val loading: StateFlow<Boolean> = _loading.asStateFlow()
}

// Compose での使用 (collectAsState)
@Composable
fun UserScreen(viewModel: UserViewModel) {
    val user by viewModel.user.collectAsState()
    val loading by viewModel.loading.collectAsState()
    
    if (loading) {
        CircularProgressIndicator()
    } else {
        user?.let { Text(it.name) }
    }
}

// Manual lifecycle handling
lifecycleScope.launch {
    repeatOnLifecycle(Lifecycle.State.STARTED) {
        viewModel.user.collect { user ->
            // STARTED以上でのみ実行
            updateUI(user)
        }
    }
}`}
                </CodeBlock>
              </div>
            </div>
          </div>

          {/* Complex State Management */}
          <div className="space-y-3">
            <h3 className="font-semibold">複雑な状態管理 - combine と transformation</h3>
            <CodeBlock className="text-sm">
{`@HiltViewModel
class SearchViewModel @Inject constructor(
    private val searchRepository: SearchRepository
) : ViewModel() {
    
    private val _query = MutableStateFlow("")
    val query: StateFlow<String> = _query.asStateFlow()
    
    private val _filters = MutableStateFlow(SearchFilters())
    val filters: StateFlow<SearchFilters> = _filters.asStateFlow()
    
    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()
    
    // 複数のStateFlowを結合して検索実行
    val searchResults: StateFlow<List<SearchResult>> = combine(
        query.debounce(300), // 300ms待ってから検索
        filters
    ) { queryText, currentFilters ->
        if (queryText.isBlank()) {
            emptyList()
        } else {
            _isLoading.value = true
            try {
                searchRepository.search(queryText, currentFilters)
            } catch (e: Exception) {
                emptyList()
            } finally {
                _isLoading.value = false
            }
        }
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = emptyList()
    )
    
    // UI状態を結合
    val uiState: StateFlow<SearchUiState> = combine(
        query,
        isLoading,
        searchResults
    ) { q, loading, results ->
        when {
            q.isBlank() -> SearchUiState.Empty
            loading -> SearchUiState.Loading(q)
            results.isEmpty() -> SearchUiState.NoResults(q)
            else -> SearchUiState.Success(results, q)
        }
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = SearchUiState.Empty
    )
    
    fun updateQuery(newQuery: String) {
        _query.value = newQuery
    }
    
    fun updateFilters(newFilters: SearchFilters) {
        _filters.value = newFilters
    }
}

sealed interface SearchUiState {
    object Empty : SearchUiState
    data class Loading(val query: String) : SearchUiState
    data class Success(val results: List<SearchResult>, val query: String) : SearchUiState
    data class NoResults(val query: String) : SearchUiState
}

data class SearchFilters(
    val category: String = "all",
    val sortBy: SortType = SortType.RELEVANCE,
    val dateRange: DateRange? = null
)`}
            </CodeBlock>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Patterns */}
      <Card className="border-2 border-orange-200">
        <CardHeader className="bg-gradient-to-br from-orange-50 to-red-50">
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            上級者向け: Repository + Room + StateFlow パターン
          </CardTitle>
          <CardDescription>プロダクションレベルのデータフロー設計</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* Complete Architecture */}
          <div className="space-y-3">
            <h3 className="font-semibold">完全なデータフロー実装</h3>
            <CodeBlock className="text-sm">
{`// Entity (Room)
@Entity(tableName = "users")
data class UserEntity(
    @PrimaryKey val id: String,
    val name: String,
    val email: String,
    val avatarUrl: String?,
    val lastUpdated: Long = System.currentTimeMillis()
)

// DAO (Room)
@Dao
interface UserDao {
    @Query("SELECT * FROM users ORDER BY name")
    fun getAllUsers(): Flow<List<UserEntity>>
    
    @Query("SELECT * FROM users WHERE id = :id")
    fun getUser(id: String): Flow<UserEntity?>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertUser(user: UserEntity)
    
    @Query("DELETE FROM users WHERE id = :id")
    suspend fun deleteUser(id: String)
}

// API Service
interface UserApiService {
    @GET("users")
    suspend fun getUsers(): List<UserDto>
    
    @GET("users/{id}")
    suspend fun getUser(@Path("id") id: String): UserDto
}

// Repository (Single Source of Truth)
@Singleton
class UserRepository @Inject constructor(
    private val userDao: UserDao,
    private val userApi: UserApiService,
    private val userMapper: UserMapper,
    @IoDispatcher private val dispatcher: CoroutineDispatcher
) {
    
    // Room DBから常に最新データを流す
    fun getAllUsers(): Flow<List<User>> = 
        userDao.getAllUsers()
            .map { entities -> entities.map { userMapper.entityToUser(it) } }
            .flowOn(dispatcher)
    
    fun getUser(id: String): Flow<User?> = 
        userDao.getUser(id)
            .map { entity -> entity?.let { userMapper.entityToUser(it) } }
            .flowOn(dispatcher)
    
    // ネットワークから取得してキャッシュ
    suspend fun refreshUsers(): Result<Unit> = withContext(dispatcher) {
        runCatching {
            val userDtos = userApi.getUsers()
            val userEntities = userDtos.map { userMapper.dtoToEntity(it) }
            userDao.insertUsers(userEntities)
        }
    }
    
    suspend fun refreshUser(id: String): Result<Unit> = withContext(dispatcher) {
        runCatching {
            val userDto = userApi.getUser(id)
            val userEntity = userMapper.dtoToEntity(userDto)
            userDao.insertUser(userEntity)
        }
    }
}

// ViewModel
@HiltViewModel
class UserListViewModel @Inject constructor(
    private val userRepository: UserRepository
) : ViewModel() {
    
    // Repository の Flow を StateFlow に変換
    val users: StateFlow<List<User>> = userRepository.getAllUsers()
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )
    
    private val _refreshing = MutableStateFlow(false)
    val refreshing: StateFlow<Boolean> = _refreshing.asStateFlow()
    
    private val _error = MutableSharedFlow<String>()
    val error: SharedFlow<String> = _error.asSharedFlow()
    
    // UI状態を組み合わせ
    val uiState: StateFlow<UserListUiState> = combine(
        users,
        refreshing
    ) { userList, isRefreshing ->
        when {
            userList.isEmpty() && !isRefreshing -> UserListUiState.Empty
            userList.isEmpty() && isRefreshing -> UserListUiState.Loading
            else -> UserListUiState.Success(userList, isRefreshing)
        }
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = UserListUiState.Loading
    )
    
    init {
        // 初期データロード
        refresh()
    }
    
    fun refresh() {
        viewModelScope.launch {
            _refreshing.value = true
            userRepository.refreshUsers()
                .onFailure { e -> 
                    _error.emit(e.message ?: "Failed to refresh users")
                }
            _refreshing.value = false
        }
    }
}

sealed interface UserListUiState {
    object Loading : UserListUiState
    object Empty : UserListUiState
    data class Success(
        val users: List<User>,
        val isRefreshing: Boolean = false
    ) : UserListUiState
}

// Compose UI
@Composable
fun UserListScreen(
    viewModel: UserListViewModel = hiltViewModel()
) {
    val uiState by viewModel.uiState.collectAsState()
    
    // エラー処理
    LaunchedEffect(Unit) {
        viewModel.error.collect { errorMessage ->
            // SnackBarなどでエラー表示
        }
    }
    
    when (val state = uiState) {
        is UserListUiState.Loading -> {
            LoadingScreen()
        }
        is UserListUiState.Empty -> {
            EmptyScreen(onRefresh = { viewModel.refresh() })
        }
        is UserListUiState.Success -> {
            val pullRefreshState = rememberPullRefreshState(
                refreshing = state.isRefreshing,
                onRefresh = { viewModel.refresh() }
            )
            
            Box(modifier = Modifier.pullRefresh(pullRefreshState)) {
                LazyColumn {
                    items(state.users) { user ->
                        UserItem(user = user)
                    }
                }
                
                PullRefreshIndicator(
                    refreshing = state.isRefreshing,
                    state = pullRefreshState,
                    modifier = Modifier.align(Alignment.TopCenter)
                )
            }
        }
    }
}`}
            </CodeBlock>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card className="border-2 border-android-green/20 bg-gradient-to-br from-android-green/5 to-android-blue/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            State管理ベストプラクティス
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Do's */}
            <div className="space-y-3">
              <h3 className="font-semibold text-green-700">✅ 推奨パターン</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-medium">UiStateパターンを使用</h4>
                  <p className="text-xs text-green-700">sealed interface で型安全な状態管理</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-medium">StateFlowをpublicに公開</h4>
                  <p className="text-xs text-green-700">MutableStateFlowはprivateで保持</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-medium">Repository パターン</h4>
                  <p className="text-xs text-green-700">データソースを抽象化、Single Source of Truth</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-medium">Hilt DI を活用</h4>
                  <p className="text-xs text-green-700">@HiltViewModel で依存性注入</p>
                </div>
              </div>
            </div>

            {/* Don'ts */}
            <div className="space-y-3">
              <h3 className="font-semibold text-red-700">❌ 避けるべきパターン</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-red-50 p-3 rounded-lg">
                  <h4 className="font-medium">ViewModelに Android 依存</h4>
                  <p className="text-xs text-red-700">Context, View等を直接参照しない</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <h4 className="font-medium">複数のStateFlowで同じ概念</h4>
                  <p className="text-xs text-red-700">loading, user, error → UiStateに統合</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <h4 className="font-medium">直接的なMutableStateFlow公開</h4>
                  <p className="text-xs text-red-700">asStateFlow()でimmutableに</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <h4 className="font-medium">メモリリーク</h4>
                  <p className="text-xs text-red-700">GlobalScope使用、リスナー解放忘れ</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cross-references */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">関連学習トピック</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-blue-900 flex items-center gap-2">
                <ArrowRight className="w-4 h-4" />
                状態管理比較
              </h4>
              <p className="text-sm text-blue-700 mb-2">LiveData vs Flow vs Compose State</p>
              <a href="/state-comparison" className="text-blue-600 hover:text-blue-800 underline text-sm font-medium">
                📊 状態管理技術比較ページ
              </a>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 flex items-center gap-2">
                <ArrowRight className="w-4 h-4" />
                依存性注入
              </h4>
              <p className="text-sm text-blue-700 mb-2">Hilt によるDI実装</p>
              <a href="/dependency-injection" className="text-blue-600 hover:text-blue-800 underline text-sm font-medium">
                🔧 依存性注入ページ
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}