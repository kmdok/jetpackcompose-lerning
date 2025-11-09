import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, XCircle, AlertTriangle, Code, Users, Zap, TestTube } from 'lucide-react'
import { Link } from 'react-router-dom'
import CodeBlock from '@/components/CodeBlock'

export default function DependencyInjection() {
  const problems = [
    {
      title: 'テスタビリティの低下',
      description: 'Mockオブジェクトに差し替えできない',
      icon: TestTube,
      color: 'text-red-600'
    },
    {
      title: '柔軟性の欠如',
      description: '本番環境とテスト環境の切り替えが困難',
      icon: AlertTriangle,
      color: 'text-orange-600'
    },
    {
      title: 'コードの結合度の高さ',
      description: 'クラス間の依存関係が固定的',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: '初期化順序の管理困難',
      description: 'Singletonの初期化タイミング制御が複雑',
      icon: Zap,
      color: 'text-blue-600'
    }
  ]

  const comparisonData = [
    {
      aspect: '初期セットアップ',
      manual: '簡単 ⭐⭐⭐',
      hilt: '複雑 ⭐⭐'
    },
    {
      aspect: 'コード量',
      manual: '多い ⭐',
      hilt: '少ない ⭐⭐⭐'
    },
    {
      aspect: '実行時エラー',
      manual: '起こりやすい ⭐',
      hilt: '起こりにくい ⭐⭐⭐'
    },
    {
      aspect: 'テスト作成',
      manual: '複雑 ⭐',
      hilt: 'シンプル ⭐⭐⭐'
    },
    {
      aspect: '大規模開発',
      manual: '困難 ⭐',
      hilt: '適している ⭐⭐⭐'
    },
    {
      aspect: 'ビルド時間',
      manual: '早い ⭐⭐⭐',
      hilt: 'やや遅い ⭐⭐'
    },
    {
      aspect: '学習コスト',
      manual: '低い ⭐⭐⭐',
      hilt: '高い ⭐'
    },
    {
      aspect: 'デバッグ容易性',
      manual: '易しい ⭐⭐⭐',
      hilt: '困難 ⭐'
    }
  ]

  const teamStrategies = [
    {
      title: '小規模チーム（3-5人）',
      strategy: '段階導入戦略',
      phases: [
        'Phase 1: Repository層にHilt導入',
        'Phase 2: ViewModel層にHilt適用',
        'Phase 3: UseCase層追加（必要に応じて）'
      ],
      color: 'border-green-200 bg-green-50'
    },
    {
      title: '大規模チーム（10人以上）',
      strategy: 'モジュール分割戦略',
      phases: [
        'CoreModule（基本的な依存関係）',
        'NetworkModule（API関連）',
        'DatabaseModule（データ永続化）',
        'FeatureModule（機能別）'
      ],
      color: 'border-blue-200 bg-blue-50'
    }
  ]

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">
          Hilt依存性注入の完全理解
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          手動DIとの比較でHiltの必要性を理解し、テスト戦略まで含めた実践的スキルを習得
        </p>
      </section>

      {/* What is DI and Why */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">そもそも依存性注入とは？なぜ必要？</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <XCircle className="w-5 h-5" />
                問題のあるコード（DI不使用）
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock className="bg-red-50 border-red-200">
{`// ❌ 問題のあるコード：依存関係がハードコード
class UserRepository {
    private val apiService = UserApiService() // 直接インスタンス化
    private val database = AppDatabase.getInstance() // シングルトン依存
}

class UserViewModel : ViewModel() {
    private val repository = UserRepository() // 直接作成
    
    // テスト時：MockのUserRepositoryに差し替えできない！
    // 設定変更時：本番用とテスト用の切り替えが困難！
}`}
              </CodeBlock>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                解決：依存性注入使用
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock className="bg-green-50 border-green-200">
{`// ✅ 解決：依存性注入
@HiltViewModel
class UserViewModel @Inject constructor(
    private val repository: UserRepository // 注入される
) : ViewModel() {
    // repositoryは自動で注入される！
    // テスト時：MockのUserRepositoryを簡単に注入可能
}

// React/FlutterでいうContext.Provider的な概念`}
              </CodeBlock>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <Card key={index} className="text-center">
                <CardHeader>
                  <Icon className={`w-8 h-8 ${problem.color} mx-auto`} />
                  <CardTitle className="text-sm">{problem.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-600">{problem.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Manual DI vs Hilt Comparison */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">解決方法の比較：手動DI vs Hilt</h2>
        
        {/* Manual DI Example */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-600">方法1: 手動依存性注入（Hiltなし）</CardTitle>
            <CardDescription>
              React/Flutterでいう: 手動でProviderを設定するパターン
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock className="bg-orange-50 border-orange-200 mb-4">
{`// 1. インターフェースの定義
interface UserRepository {
    suspend fun getUsers(): List<User>
}

// 2. 実装クラス
class UserRepositoryImpl(
    private val apiService: UserApiService,
    private val userDao: UserDao
) : UserRepository {
    override suspend fun getUsers(): List<User> {
        return try {
            val users = apiService.getUsers()
            userDao.cacheUsers(users)
            users
        } catch (e: Exception) {
            userDao.getCachedUsers()
        }
    }
}

// 3. ViewModelファクトリで手動注入
class UserViewModelFactory(
    private val repository: UserRepository
) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(UserViewModel::class.java)) {
            return UserViewModel(repository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}

// 4. Activityでのセットアップ（複雑！）
class UserActivity : ComponentActivity() {
    private lateinit var viewModel: UserViewModel
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // 依存関係を手動で構築（エラーを起こしやすい）
        val database = AppDatabase.getInstance(this)
        val userDao = database.userDao()
        val apiService = UserApiService()
        val repository = UserRepositoryImpl(apiService, userDao)
        val factory = UserViewModelFactory(repository)
        
        viewModel = ViewModelProvider(this, factory)[UserViewModel::class.java]
        
        setContent {
            UserScreen(viewModel = viewModel)
        }
    }
}`}
            </CodeBlock>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-green-600 mb-2">✅ メリット:</h5>
                <ul className="space-y-1 text-gray-700">
                  <li>• 学習コストなし（純粋なKotlin）</li>
                  <li>• 依存関係が明確</li>
                  <li>• ビルド時間への影響なし</li>
                  <li>• アノテーション不要</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-red-600 mb-2">❌ デメリット:</h5>
                <ul className="space-y-1 text-gray-700">
                  <li>• コード量が多い</li>
                  <li>• 初期化コードが複雑</li>
                  <li>• エラーを起こしやすい</li>
                  <li>• Singletonの管理が困難</li>
                  <li>• スケールしない（大規模アプリで破綻）</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hilt Example */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-600">方法2: Hilt依存性注入</CardTitle>
            <CardDescription>
              React/Flutterでいう: 自動的にContext.Provider が設定されるパターン
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock className="bg-green-50 border-green-200 mb-4">
{`// 1. Application拡張
@HiltAndroidApp
class TaskApp : Application()

// 2. Repositoryインターフェース
interface UserRepository {
    suspend fun getUsers(): List<User>
}

// 3. 実装クラスにアノテーション
@Singleton // シングルトンとして管理
class UserRepositoryImpl @Inject constructor(
    private val apiService: UserApiService,
    private val userDao: UserDao
) : UserRepository {
    override suspend fun getUsers(): List<User> {
        return try {
            val users = apiService.getUsers()
            userDao.cacheUsers(users)
            users
        } catch (e: Exception) {
            userDao.getCachedUsers()
        }
    }
}

// 4. インターフェース実装のバインド
@Module
@InstallIn(SingletonComponent::class)
abstract class RepositoryModule {
    @Binds
    abstract fun bindUserRepository(
        userRepositoryImpl: UserRepositoryImpl
    ): UserRepository
}

// 5. APIサービスとDatabaseの提供
@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {
    @Provides
    @Singleton
    fun provideUserApiService(): UserApiService {
        return Retrofit.Builder()
            .baseUrl("https://api.example.com/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(UserApiService::class.java)
    }
}

// 6. ViewModel（自動注入）
@HiltViewModel
class UserViewModel @Inject constructor(
    private val repository: UserRepository
) : ViewModel() {
    private val _uiState = MutableStateFlow(UserUiState())
    val uiState: StateFlow<UserUiState> = _uiState.asStateFlow()
    
    // repositoryは自動で注入される！
}

// 7. Activity（シンプル！）
@AndroidEntryPoint
class UserActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        setContent {
            // ViewModelは自動で注入される
            UserScreen()
        }
    }
}

// 8. Composableでの使用
@Composable
fun UserScreen(
    viewModel: UserViewModel = hiltViewModel()
) {
    val uiState by viewModel.uiState.collectAsState()
    // UIコンテンツ
}`}
            </CodeBlock>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-green-600 mb-2">✅ メリット:</h5>
                <ul className="space-y-1 text-gray-700">
                  <li>• ボイラープレートコードの削減</li>
                  <li>• コンパイル時の依存関係チェック</li>
                  <li>• ライフサイクル管理自動化</li>
                  <li>• テスト用Mockの簡単な差し替え</li>
                  <li>• Singletonの自動管理</li>
                  <li>• 大規模アプリでのスケーラビリティ</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-red-600 mb-2">❌ デメリット:</h5>
                <ul className="space-y-1 text-gray-700">
                  <li>• 初期学習コスト</li>
                  <li>• コンパイル時間の増加</li>
                  <li>• アノテーション処理の理解必要</li>
                  <li>• デバッグ時の複雑さ</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Comparison Table */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">実践的な比較表</h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold">観点</th>
                    <th className="text-left p-4 font-semibold text-orange-600">手動DI</th>
                    <th className="text-left p-4 font-semibold text-green-600">Hilt</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-4 font-medium">{row.aspect}</td>
                      <td className="p-4">{row.manual}</td>
                      <td className="p-4">{row.hilt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Testing Comparison */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">テスタビリティの比較</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-700">手動DI でのテスト</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock className="bg-orange-100 border-orange-300">
{`class UserViewModelTest {
    @Test
    fun loadUsers_success() = runTest {
        // Mockリポジトリを手動作成
        val mockRepository = object : UserRepository {
            override suspend fun getUsers(): List<User> {
                return listOf(User(1, "Test User", "test@example.com"))
            }
        }
        
        // ViewModelを手動で作成
        val viewModel = UserViewModel(mockRepository)
        
        viewModel.loadUsers()
        
        val uiState = viewModel.uiState.value
        assertEquals(1, uiState.users.size)
        assertFalse(uiState.loading)
    }
}`}
              </CodeBlock>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-700">Hiltでのテスト</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock className="bg-green-50 border-green-200">
{`@HiltAndroidTest
class UserViewModelTest {
    @get:Rule
    var hiltRule = HiltAndroidRule(this)
    
    @BindValue // テスト用のMockを注入
    @JvmField
    val mockRepository: UserRepository = mockk()
    
    @Test
    fun loadUsers_success() = runTest {
        // Mockの動作設定
        coEvery { mockRepository.getUsers() } returns listOf(
            User(1, "Test User", "test@example.com")
        )
        
        // Hiltが自動でMockを注入したViewModelを作成
        val viewModel = UserViewModel(mockRepository)
        
        viewModel.loadUsers()
        
        val uiState = viewModel.uiState.value
        assertEquals(1, uiState.users.size)
        assertFalse(uiState.loading)
    }
}`}
              </CodeBlock>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Learning Roadmap */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">段階的学習アプローチ</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                Week 1: 依存性注入の概念理解
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Day 1-2: 依存性とは何か？問題点の理解</li>
                <li>• Day 3-4: 手動DIの実装（シンプルなケース）</li>
                <li>• Day 5-7: 手動DIの限界を体験（複雑なアプリでの困難さ）</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                Week 2: Hilt基礎
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Day 1-2: @Inject, @Module, @Provides基礎</li>
                <li>• Day 3-4: ViewModel への Hilt適用</li>
                <li>• Day 5-7: 実際のアプリでHilt導入</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                Week 3: Hilt応用
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• Day 1-3: Interface binding, Qualifier使用</li>
                <li>• Day 4-7: テスト環境でのHilt活用</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Development Patterns */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">業務レベルでの実践パターン</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {teamStrategies.map((strategy, index) => (
            <Card key={index} className={strategy.color}>
              <CardHeader>
                <CardTitle className="text-gray-800">{strategy.title}</CardTitle>
                <CardDescription className="font-semibold">
                  {strategy.strategy}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {strategy.phases.map((phase, phaseIndex) => (
                    <li key={phaseIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{phase}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Advanced Topics */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">応用テクニック</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-purple-600" />
                Qualifier使用例
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock className="bg-purple-50 border-purple-200">
{`@Qualifier
@Retention(AnnotationRetention.BINARY)
annotation class RemoteDataSource

@Qualifier
@Retention(AnnotationRetention.BINARY)
annotation class LocalDataSource

@Module
@InstallIn(SingletonComponent::class)
object DataModule {
    @Provides
    @RemoteDataSource
    fun provideRemoteDataSource(): UserDataSource = 
        RemoteUserDataSource()
    
    @Provides
    @LocalDataSource  
    fun provideLocalDataSource(): UserDataSource = 
        LocalUserDataSource()
}

class UserRepository @Inject constructor(
    @RemoteDataSource private val remoteDataSource: UserDataSource,
    @LocalDataSource private val localDataSource: UserDataSource
)`}
              </CodeBlock>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="w-5 h-5 text-green-600" />
                テスト用Module
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock className="bg-green-50 border-green-200">
{`@TestInstallIn(
    components = [SingletonComponent::class],
    replaces = [NetworkModule::class]
)
@Module
object TestNetworkModule {
    @Provides
    @Singleton
    fun provideMockApiService(): UserApiService = mockk {
        coEvery { getUsers() } returns listOf(
            User(1, "Test User", "test@example.com")
        )
    }
}

// テスト時は自動的にMockが注入される
@HiltAndroidTest
class UserRepositoryTest {
    @get:Rule
    var hiltRule = HiltAndroidRule(this)
    
    @Inject
    lateinit var repository: UserRepository // Mock版が注入される
}`}
              </CodeBlock>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Navigation */}
      <section className="flex justify-between items-center py-8 border-t">
        <Link to="/state-comparison">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 rotate-180" />
            前のページ: 状態管理比較
          </Button>
        </Link>
        <Link to="/kotlin-basics">
          <Button className="flex items-center gap-2 bg-gradient-to-r from-android-green to-android-blue text-white">
            学習を続ける: Kotlin基礎
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>
    </div>
  )
}