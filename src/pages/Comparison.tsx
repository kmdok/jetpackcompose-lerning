import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Code2, Layers, Zap, Database, Box } from 'lucide-react'
import CodeBlock from '@/components/CodeBlock'

export default function Comparison() {
  const architectureComparison = [
    {
      concept: 'アーキテクチャ',
      react: { code: 'Redux / Context', desc: '状態管理ライブラリ' },
      flutter: { code: 'Provider / Riverpod', desc: '状態管理パッケージ' },
      compose: { code: 'ViewModel + Flow/LiveData', desc: 'Android AAC' },
    },
    {
      concept: 'DI(依存性注入)',
      react: { code: 'なし (手動)', desc: 'ライブラリは任意' },
      flutter: { code: 'GetIt / Riverpod', desc: 'サードパーティ' },
      compose: { code: 'Hilt / Koin', desc: 'Hilt推奨' },
    },
    {
      concept: '非同期処理',
      react: { code: 'async/await, Promise', desc: 'JavaScript標準' },
      flutter: { code: 'Future, async/await', desc: 'Dart標準' },
      compose: { code: 'Coroutine, Flow', desc: 'Kotlin標準' },
    },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-android-green to-android-blue bg-clip-text text-transparent">
          Flutter/React との比較
        </h1>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
          実際のプロジェクトで使われるアーキテクチャパターン（ViewModel + LiveData/Flow + Hilt）を前提に、
          React/Flutterとの対応関係を解説します。
        </p>
      </div>

      {/* Architecture Cards */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Layers className="w-6 h-6" />
          アーキテクチャ比較
        </h2>

        {architectureComparison.map((item, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
              <CardTitle className="text-lg md:text-xl">{item.concept}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-react-blue"></div>
                    <span className="font-semibold text-react-blue text-sm">React</span>
                  </div>
                  <CodeBlock className="text-xs break-words">
                    {item.react.code}
                  </CodeBlock>
                  <p className="text-xs text-gray-600">{item.react.desc}</p>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-flutter-blue"></div>
                    <span className="font-semibold text-flutter-blue text-sm">Flutter</span>
                  </div>
                  <CodeBlock className="text-xs break-words">
                    {item.flutter.code}
                  </CodeBlock>
                  <p className="text-xs text-gray-600">{item.flutter.desc}</p>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-android-green"></div>
                    <span className="font-semibold text-android-green text-sm">Compose</span>
                  </div>
                  <CodeBlock className="text-xs break-words">
                    {item.compose.code}
                  </CodeBlock>
                  <p className="text-xs text-gray-600">{item.compose.desc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-world Architecture */}
      <Card className="border-2 border-android-green/30">
        <CardHeader className="bg-gradient-to-r from-android-green/10 to-android-blue/10">
          <CardTitle className="flex items-center gap-2">
            <Box className="w-5 h-5" />
            実践的なComposeアーキテクチャ
          </CardTitle>
          <CardDescription>ViewModel + StateFlow/LiveData + Hilt構成</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Database className="w-4 h-4" />
                レイヤー構成
              </h3>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• <strong>UI Layer</strong>: Composable</li>
                <li>• <strong>ViewModel</strong>: 状態管理</li>
                <li>• <strong>Repository</strong>: データソース抽象化</li>
                <li>• <strong>Data Source</strong>: API/DB</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4" />
                主要コンポーネント
              </h3>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• <strong>Hilt</strong>: DI (依存性注入)</li>
                <li>• <strong>StateFlow/LiveData</strong>: 状態監視</li>
                <li>• <strong>Coroutine</strong>: 非同期処理</li>
                <li>• <strong>Room/Retrofit</strong>: データ永続化/通信</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* StateFlow vs LiveData */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Code2 className="w-6 h-6" />
          StateFlow vs LiveData
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* LiveData */}
          <Card className="border-2 border-orange-200">
            <CardHeader className="bg-gradient-to-br from-orange-50 to-orange-100">
              <CardTitle className="text-lg">LiveData</CardTitle>
              <CardDescription>従来の方法（シンプル）</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <CodeBlock className="text-xs">
{`// ViewModel
class UserViewModel @Inject constructor(
    private val repository: UserRepository
) : ViewModel() {
    private val _user = MutableLiveData<User?>()
    val user: LiveData<User?> = _user

    fun loadUser(id: Int) {
        viewModelScope.launch {
            _user.value = repository.getUser(id)
        }
    }
}

// Composable
@Composable
fun UserScreen(
    viewModel: UserViewModel = hiltViewModel()
) {
    val user by viewModel.user
        .observeAsState(initial = null)

    user?.let {
        Text("Name: \${it.name}")
    }
}`}
              </CodeBlock>
              <div className="space-y-1 text-xs text-gray-600">
                <p>✅ シンプルで理解しやすい</p>
                <p>✅ ライフサイクル自動対応</p>
                <p>⚠️ Kotlin Flowとの統合が弱い</p>
              </div>
            </CardContent>
          </Card>

          {/* StateFlow */}
          <Card className="border-2 border-android-green/30">
            <CardHeader className="bg-gradient-to-br from-android-green/10 to-android-blue/10">
              <CardTitle className="text-lg">StateFlow (推奨)</CardTitle>
              <CardDescription>モダンで柔軟</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <CodeBlock className="text-xs">
{`// ViewModel
class UserViewModel @Inject constructor(
    private val repository: UserRepository
) : ViewModel() {
    private val _user = MutableStateFlow<User?>(null)
    val user: StateFlow<User?> = _user.asStateFlow()

    fun loadUser(id: Int) {
        viewModelScope.launch {
            _user.value = repository.getUser(id)
        }
    }
}

// Composable
@Composable
fun UserScreen(
    viewModel: UserViewModel = hiltViewModel()
) {
    val user by viewModel.user
        .collectAsState()

    user?.let {
        Text("Name: \${it.name}")
    }
}`}
              </CodeBlock>
              <div className="space-y-1 text-xs text-gray-600">
                <p>✅ Kotlin Coroutineと統合</p>
                <p>✅ より柔軟な変換/結合</p>
                <p>✅ Google推奨</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Hilt DI Example */}
      <Card>
        <CardHeader>
          <CardTitle>Hilt による依存性注入</CardTitle>
          <CardDescription>実際のプロジェクト構成</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CodeBlock className="text-xs">
{`// Application
@HiltAndroidApp
class MyApplication : Application()

// Activity
@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyApp()
        }
    }
}

// Module
@Module
@InstallIn(SingletonComponent::class)
object AppModule {
    @Provides
    @Singleton
    fun provideUserRepository(
        api: UserApi,
        dao: UserDao
    ): UserRepository {
        return UserRepositoryImpl(api, dao)
    }
}

// ViewModel (自動注入)
@HiltViewModel
class UserViewModel @Inject constructor(
    private val repository: UserRepository
) : ViewModel() {
    // ...
}

// Composable (自動取得)
@Composable
fun UserScreen(
    viewModel: UserViewModel = hiltViewModel()
) {
    // ViewModelはHiltから自動で注入される
}`}
          </CodeBlock>
          <div className="mt-4 space-y-2 text-sm text-gray-700">
            <p><strong>@HiltAndroidApp</strong>: Application クラスに付与</p>
            <p><strong>@AndroidEntryPoint</strong>: Activity/Fragment に付与</p>
            <p><strong>@HiltViewModel</strong>: ViewModelに付与</p>
            <p><strong>hiltViewModel()</strong>: Composableで取得</p>
          </div>
        </CardContent>
      </Card>

      {/* Related Resources */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">関連リソース</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-medium text-blue-900">🔄 React/Flutter開発者向け</h4>
            <p className="text-sm text-blue-700 mb-2">既存のスキルを活かした効率的学習</p>
            <a href="/react-flutter-mapping" className="text-blue-600 hover:text-blue-800 underline text-sm font-medium">
              📋 React/Flutter → Compose 概念マッピング表
            </a>
          </div>
          <div>
            <h4 className="font-medium text-blue-900">⚖️ 状態管理の選択</h4>
            <p className="text-sm text-blue-700 mb-2">LiveData vs Flow vs Compose State の使い分け</p>
            <a href="/state-comparison" className="text-blue-600 hover:text-blue-800 underline text-sm font-medium">
              📊 状態管理技術比較ページ
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Learning Path */}
      <Card className="border-2 border-android-green/20 bg-gradient-to-br from-android-green/5 to-android-blue/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            学習のロードマップ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-android-green text-white flex items-center justify-center text-xs font-bold">1</div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Kotlin基礎</h3>
                <p className="text-xs text-gray-600">null安全性、Coroutine、データクラスを理解</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-android-green text-white flex items-center justify-center text-xs font-bold">2</div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">ViewModel + StateFlow/LiveData</h3>
                <p className="text-xs text-gray-600">状態管理の基本パターンをマスター</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-android-green text-white flex items-center justify-center text-xs font-bold">3</div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Hilt (DI)</h3>
                <p className="text-xs text-gray-600">依存性注入でテストしやすいコードを書く</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-android-green text-white flex items-center justify-center text-xs font-bold">4</div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Composable UI</h3>
                <p className="text-xs text-gray-600">宣言的UIの構築（React/Flutter経験が活きる）</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
