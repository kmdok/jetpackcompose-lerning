import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Zap, GitBranch, Play } from 'lucide-react'
import CodeBlock from '@/components/CodeBlock'

export default function KotlinBasics() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-kotlin-purple to-pink-500 bg-clip-text text-transparent">
          Kotlin基礎 + Coroutines + Flow
        </h1>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
          KotlinはGoogleが推奨するAndroid開発の公式言語です。
          Coroutines と Flow は、非同期処理とリアクティブプログラミングの中核です。
        </p>
      </div>

      {/* Quick Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-2 border-kotlin-purple/30">
          <CardHeader className="bg-gradient-to-br from-kotlin-purple/10 to-pink-500/10">
            <CardTitle className="text-base flex items-center gap-2">
              <Play className="w-4 h-4" />
              Kotlin基礎
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-xs text-gray-700">
            null安全、data class、拡張関数など
          </CardContent>
        </Card>
        <Card className="border-2 border-android-green/30">
          <CardHeader className="bg-gradient-to-br from-android-green/10 to-android-blue/10">
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Coroutines
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-xs text-gray-700">
            非同期処理を同期的に書ける
          </CardContent>
        </Card>
        <Card className="border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-br from-blue-50 to-purple-50">
            <CardTitle className="text-base flex items-center gap-2">
              <GitBranch className="w-4 h-4" />
              Flow
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-xs text-gray-700">
            リアクティブなデータストリーム
          </CardContent>
        </Card>
      </div>

      {/* Kotlin Basics Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-kotlin-purple">Part 1: Kotlin基礎</h2>

        <Card>
          <CardHeader>
            <CardTitle>変数宣言とnull安全性</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock className="text-xs">
{`// val (不変) vs var (可変)
val name = "John"      // 不変 (変更不可)
var age = 25           // 可変

age = 26               // OK
// name = "Jane"       // コンパイルエラー

// null安全性
var notNull: String = "John"
// notNull = null      // コンパイルエラー

var nullable: String? = "John"
nullable = null        // OK

// Safe call (?.)
val length = nullable?.length  // null の場合は null

// Elvis operator (?:)
val length2 = nullable?.length ?: 0  // null の場合は 0

// !! operator (null でないと確信している場合)
val length3 = nullable!!.length  // null なら NullPointerException`}
            </CodeBlock>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-xs text-blue-900">
                <strong>💡 比較:</strong> React/Flutterではランタイムエラー。Kotlinはコンパイル時にnullチェック！
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>データクラスとsealed class</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock className="text-xs">
{`// Data class (equals, hashCode, toString, copy が自動生成)
data class User(
    val id: Int,
    val name: String,
    val email: String
)

val user = User(1, "John", "john@example.com")
val updated = user.copy(name = "Jane")  // 一部だけ変更

// Sealed class (型安全なEnum、when式で網羅性チェック)
sealed interface UiState {
    object Loading : UiState
    data class Success(val data: String) : UiState
    data class Error(val message: String) : UiState
}

fun render(state: UiState) = when (state) {
    is UiState.Loading -> "Loading..."
    is UiState.Success -> state.data
    is UiState.Error -> "Error: \${state.message}"
    // 全パターン網羅しないとコンパイルエラー
}`}
            </CodeBlock>
            <div className="grid md:grid-cols-2 gap-3 text-xs">
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-green-900">
                  <strong>data class:</strong> ReactのTypeScript型 / FlutterのClass に相当
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-purple-900">
                  <strong>sealed class:</strong> TypeScriptのUnion型に似ている（型安全）
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>高階関数とラムダ式</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock className="text-xs">
{`val numbers = listOf(1, 2, 3, 4, 5)

// map, filter (React/Flutterと同じ)
val doubled = numbers.map { it * 2 }           // [2, 4, 6, 8, 10]
val evens = numbers.filter { it % 2 == 0 }    // [2, 4]

// it パラメータ (単一パラメータの場合)
val doubled2 = numbers.map { number -> number * 2 }  // 明示的
val doubled3 = numbers.map { it * 2 }                // 暗黙的 (it)

// 高階関数 (関数を引数に取る)
fun repeat(times: Int, action: (Int) -> Unit) {
    for (i in 0 until times) {
        action(i)
    }
}

repeat(3) { index ->
    println("Index: $index")
}

// 拡張関数 (既存クラスにメソッドを追加)
fun String.addExclamation() = "$this!"

val greeting = "Hello".addExclamation()  // "Hello!"`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Coroutines Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-android-green">Part 2: Coroutines (非同期処理)</h2>

        <Card className="border-2 border-android-green/30">
          <CardHeader className="bg-gradient-to-r from-android-green/10 to-android-blue/10">
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Coroutinesとは？
            </CardTitle>
            <CardDescription>非同期処理を同期的なコードで書ける</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-3 gap-4 text-xs">
              <div className="space-y-2">
                <h4 className="font-semibold text-kotlin-purple">⚛️ React</h4>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded block">async/await + Promise</code>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-flutter-blue">🐦 Flutter</h4>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded block">async/await + Future</code>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-android-green">🤖 Kotlin</h4>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded block">suspend + Coroutines</code>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-xs text-blue-900">
                <strong>💡 ポイント:</strong> Coroutinesは軽量スレッド。何千ものコルーチンを同時実行可能。
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>suspend 関数 (基礎)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock className="text-xs">
{`// suspend 関数 (コルーチン内でのみ呼び出せる)
suspend fun fetchUser(id: Int): User {
    delay(1000)  // 1秒待つ (非ブロッキング)
    return User(id, "John", "john@example.com")
}

// コルーチンスコープで実行
viewModelScope.launch {
    val user = fetchUser(1)  // await不要！同期的に書ける
    println(user.name)
}

// 複数の非同期処理を順次実行
viewModelScope.launch {
    val user = fetchUser(1)      // 1秒待つ
    val posts = fetchPosts(user.id)  // さらに1秒待つ
    // 合計2秒
}

// 並列実行 (async/await)
viewModelScope.launch {
    val userDeferred = async { fetchUser(1) }
    val postsDeferred = async { fetchPosts(1) }

    val user = userDeferred.await()
    val posts = postsDeferred.await()
    // 合計1秒 (並列実行)
}`}
            </CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Coroutine Scope と Dispatcher</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock className="text-xs">
{`// ViewModelScope (ViewModelと連動、自動キャンセル)
@HiltViewModel
class MyViewModel @Inject constructor() : ViewModel() {
    fun loadData() {
        viewModelScope.launch {
            // ViewModelが破棄されると自動的にキャンセル
            val data = fetchData()
        }
    }
}

// lifecycleScope (Activity/Fragmentのライフサイクルと連動)
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        lifecycleScope.launch {
            // Activityが破棄されると自動キャンセル
        }
    }
}

// Dispatcher (実行するスレッドを指定)
viewModelScope.launch(Dispatchers.IO) {
    // IO処理用スレッド (ネットワーク、DB)
    val data = fetchFromNetwork()

    withContext(Dispatchers.Main) {
        // UIスレッドに切り替え
        updateUI(data)
    }
}

// Dispatchers の種類
// - Dispatchers.Main: UIスレッド
// - Dispatchers.IO: ネットワーク、DB (最大64スレッド)
// - Dispatchers.Default: CPU集約処理 (CPUコア数分)
// - Dispatchers.Unconfined: 呼び出し元スレッド`}
            </CodeBlock>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-xs text-purple-900">
                <strong>💡 React比較:</strong> useEffectのcleanup関数が自動で呼ばれるイメージ。
                ViewModelが破棄されると全てのコルーチンが自動キャンセル。
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>エラーハンドリング</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock className="text-xs">
{`// try-catch で捕捉
viewModelScope.launch {
    try {
        val user = fetchUser(1)
        _uiState.value = UiState.Success(user)
    } catch (e: Exception) {
        _uiState.value = UiState.Error(e.message ?: "Unknown error")
    }
}

// Result型を使う (推奨)
suspend fun fetchUserSafe(id: Int): Result<User> = runCatching {
    fetchUser(id)
}

viewModelScope.launch {
    fetchUserSafe(1)
        .onSuccess { user ->
            _uiState.value = UiState.Success(user)
        }
        .onFailure { e ->
            _uiState.value = UiState.Error(e.message ?: "Unknown error")
        }
}

// CoroutineExceptionHandler
val handler = CoroutineExceptionHandler { _, exception ->
    println("Caught: $exception")
}

viewModelScope.launch(handler) {
    throw Exception("Error!")
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Flow Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-blue-600">Part 3: Flow (リアクティブストリーム)</h2>

        <Card className="border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="w-5 h-5" />
              Flow とは？
            </CardTitle>
            <CardDescription>非同期データストリーム (Cold Stream)</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-3 gap-4 text-xs">
              <div className="space-y-2">
                <h4 className="font-semibold text-react-blue">⚛️ React</h4>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded block">Observable (RxJS)</code>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-flutter-blue">🐦 Flutter</h4>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded block">Stream</code>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-android-green">🤖 Kotlin</h4>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded block">Flow</code>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-xs text-blue-900">
                <strong>💡 Cold Stream:</strong> collectされるまで実行されない。collectするたびに最初から実行。
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Flow の基本</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock className="text-xs">
{`// Flowの作成
fun numbers(): Flow<Int> = flow {
    for (i in 1..3) {
        delay(1000)  // 1秒待つ
        emit(i)      // 値を発行
    }
}

// Flowの購読 (collect)
viewModelScope.launch {
    numbers().collect { value ->
        println(value)  // 1秒ごとに 1, 2, 3 と出力
    }
}

// 変換 operators
fun fetchUsers(): Flow<List<User>> = flow {
    val users = repository.getUsers()
    emit(users)
}

viewModelScope.launch {
    fetchUsers()
        .map { users -> users.filter { it.age > 18 } }  // 変換
        .onEach { users -> println("Got \${users.size} users") }
        .catch { e -> println("Error: $e") }  // エラーハンドリング
        .collect { users ->
            _uiState.value = UiState.Success(users)
        }
}`}
            </CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Flow Operators (主要なもの)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock className="text-xs">
{`// map: 値を変換
flow { emit(1); emit(2) }
    .map { it * 2 }
    .collect { println(it) }  // 2, 4

// filter: 条件でフィルタ
flow { emit(1); emit(2); emit(3) }
    .filter { it % 2 == 0 }
    .collect { println(it) }  // 2

// flatMapConcat: Flowを順次結合
flow { emit(1); emit(2) }
    .flatMapConcat { value ->
        flow {
            emit("a$value")
            emit("b$value")
        }
    }
    .collect { println(it) }  // a1, b1, a2, b2

// flatMapLatest: 最新のFlowのみ (前のはキャンセル)
searchQuery
    .flatMapLatest { query ->
        searchRepository.search(query)  // 新しい検索が来たら前の検索をキャンセル
    }
    .collect { results -> updateUI(results) }

// combine: 複数のFlowを結合
val flow1 = MutableStateFlow("A")
val flow2 = MutableStateFlow(1)

combine(flow1, flow2) { text, number ->
    "$text$number"
}.collect { println(it) }  // A1

// debounce: 一定時間内の連続した値を無視
searchQuery
    .debounce(300)  // 300ms待つ
    .collect { query -> search(query) }  // ユーザーが入力を止めたら検索

// distinctUntilChanged: 連続した同じ値を無視
flow { emit(1); emit(1); emit(2); emit(2) }
    .distinctUntilChanged()
    .collect { println(it) }  // 1, 2`}
            </CodeBlock>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-xs text-green-900">
                <strong>💡 リアルタイム検索:</strong> debounce + flatMapLatest の組み合わせが強力！
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>StateFlow と SharedFlow (Hot Stream)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock className="text-xs">
{`// StateFlow: 常に最新の値を保持 (Hot Stream)
private val _count = MutableStateFlow(0)
val count: StateFlow<Int> = _count.asStateFlow()

fun increment() {
    _count.value++  // または _count.update { it + 1 }
}

// SharedFlow: イベント用 (Hot Stream)
private val _events = MutableSharedFlow<Event>()
val events: SharedFlow<Event> = _events.asSharedFlow()

fun sendEvent(event: Event) {
    viewModelScope.launch {
        _events.emit(event)  // 全ての購読者に通知
    }
}

// StateFlow vs SharedFlow
// StateFlow:
//   - 初期値が必要
//   - 常に最新値を保持
//   - 購読開始時に即座に最新値を受け取る
//   - 用途: UI状態管理

// SharedFlow:
//   - 初期値なし
//   - 値を保持しない (イベント)
//   - 購読開始時は何も受け取らない
//   - 用途: イベント通知 (Navigation, SnackBar等)

// Room + Flow (DBの変更を自動監視)
@Dao
interface UserDao {
    @Query("SELECT * FROM users")
    fun getAllUsers(): Flow<List<User>>  // DBが更新されると自動で新しい値を流す
}

class UserRepository @Inject constructor(
    private val dao: UserDao
) {
    fun getAllUsers(): Flow<List<User>> = dao.getAllUsers()
}

// ViewModel
@HiltViewModel
class UserListViewModel @Inject constructor(
    private val repository: UserRepository
) : ViewModel() {
    val users: StateFlow<List<User>> = repository.getAllUsers()
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )
}`}
            </CodeBlock>
            <div className="grid md:grid-cols-2 gap-3 text-xs">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-blue-900">
                  <strong>StateFlow:</strong> ReactのuseState、Flutter ChangeNotifier に相当
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-purple-900">
                  <strong>SharedFlow:</strong> ReactのEventEmitter、Flutter EventChannel に相当
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>stateIn() - FlowをStateFlowに変換</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock className="text-xs">
{`// Repository が Flow<List<User>> を返す場合
interface UserRepository {
    fun getUsers(): Flow<List<User>>
}

// ViewModel で StateFlow に変換
@HiltViewModel
class UserViewModel @Inject constructor(
    private val repository: UserRepository
) : ViewModel() {

    val users: StateFlow<List<User>> = repository.getUsers()
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )
}

// SharingStarted の種類
// - WhileSubscribed(5000): 購読者がいる間だけアクティブ、5秒後に停止
// - Eagerly: 即座に開始、永続的
// - Lazily: 最初の購読時に開始、永続的

// Compose で購読
@Composable
fun UserListScreen(
    viewModel: UserViewModel = hiltViewModel()
) {
    val users by viewModel.users.collectAsState()

    LazyColumn {
        items(users) { user ->
            Text(user.name)
        }
    }
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Comparison */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">React/Flutter経験者向け</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-blue-700 mb-3">
            KotlinのCoroutine + Flowは、ReactのPromise/RxJSやFlutterのFuture/Streamと同様の非同期処理を提供します。
          </p>
          <div className="space-y-2">
            <div className="text-xs">
              <strong>async/await</strong> → <code className="bg-blue-100 px-1 rounded">suspend fun</code>
            </div>
            <div className="text-xs">
              <strong>Promise/Future</strong> → <code className="bg-blue-100 px-1 rounded">Deferred</code>
            </div>
            <div className="text-xs">
              <strong>RxJS/Stream</strong> → <code className="bg-blue-100 px-1 rounded">Flow</code>
            </div>
          </div>
          <div className="mt-4">
            <a href="/react-flutter-mapping" className="text-blue-600 hover:text-blue-800 underline text-sm font-medium">
              📋 詳細な概念マッピング表を見る
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card className="border-2 border-android-green/20 bg-gradient-to-br from-android-green/5 to-android-blue/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Coroutines + Flow のベストプラクティス
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-android-green text-white flex items-center justify-center text-xs font-bold">1</div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">viewModelScope を使う</h3>
                <p className="text-xs text-gray-600">ViewModelが破棄されると自動的にキャンセル</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-android-green text-white flex items-center justify-center text-xs font-bold">2</div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Dispatcher を適切に使い分け</h3>
                <p className="text-xs text-gray-600">IO処理は Dispatchers.IO、UI更新は Dispatchers.Main</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-android-green text-white flex items-center justify-center text-xs font-bold">3</div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">StateFlow で状態管理</h3>
                <p className="text-xs text-gray-600">UI状態は StateFlow、イベントは SharedFlow</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-android-green text-white flex items-center justify-center text-xs font-bold">4</div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Room は Flow を返す</h3>
                <p className="text-xs text-gray-600">DBの変更を自動監視してUIに反映</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-android-green text-white flex items-center justify-center text-xs font-bold">5</div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">エラーハンドリングは Result型</h3>
                <p className="text-xs text-gray-600">runCatching + onSuccess/onFailure で安全に</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
