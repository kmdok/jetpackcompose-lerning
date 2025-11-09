import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'
import CodeBlock from '@/components/CodeBlock'

export default function StateComparison() {
  const comparisonTable = [
    {
      aspect: '用途',
      livedata: 'View層での状態観察',
      flow: '非同期データストリーム',
      state: 'Compose UI状態管理'
    },
    {
      aspect: 'ライフサイクル',
      livedata: '自動対応 ⭐⭐⭐',
      flow: '手動管理 ⭐⭐',
      state: 'Compose内自動 ⭐⭐⭐'
    },
    {
      aspect: '学習コスト',
      livedata: '低い ⭐⭐⭐',
      flow: '中程度 ⭐⭐',
      state: '低い ⭐⭐⭐'
    },
    {
      aspect: 'パフォーマンス',
      livedata: '良好 ⭐⭐',
      flow: '優秀 ⭐⭐⭐',
      state: '優秀 ⭐⭐⭐'
    },
    {
      aspect: 'テスタビリティ',
      livedata: '中程度 ⭐⭐',
      flow: '優秀 ⭐⭐⭐',
      state: '良好 ⭐⭐⭐'
    },
    {
      aspect: 'Jetpack Compose連携',
      livedata: '可能 ⭐⭐',
      flow: '優秀 ⭐⭐⭐',
      state: 'ネイティブ ⭐⭐⭐'
    }
  ]

  const guidelines = [
    {
      title: '小規模アプリ（画面数 < 10）',
      recommendation: 'Flow + ViewModel',
      reason: 'バランスの良い設計、将来の拡張性',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: '中規模アプリ（画面数 10-30）',
      recommendation: 'Flow + ViewModel + Repository',
      reason: '状態管理の一元化、テスタビリティ',
      icon: CheckCircle,
      color: 'text-blue-600'
    },
    {
      title: '大規模アプリ（画面数 > 30）',
      recommendation: 'Flow + ViewModel + Repository + Domain層',
      reason: '複雑性管理、チーム間協調',
      icon: AlertTriangle,
      color: 'text-orange-600'
    },
    {
      title: 'レガシー統合',
      recommendation: 'LiveData → Flow段階移行',
      reason: '既存コードへの影響最小化',
      icon: XCircle,
      color: 'text-red-600'
    }
  ]

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">
          状態管理技術の完全比較
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          LiveData vs Flow vs Compose State の使い分けを実例で理解し、業務で迷わない判断力を養成
        </p>
      </section>

      {/* Why State Management Matters */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">なぜ状態管理が重要か？</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <XCircle className="w-5 h-5" />
                悪い例：状態管理なし
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock className="bg-red-50 border-red-200">
{`// ❌ 状態管理なしの混乱
class BadUserScreen : ComponentActivity() {
    private var users: MutableList<User> = mutableListOf()
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // データ取得後のUI更新方法が不明確
        // エラー時の処理も困難
        // テストも困難
    }
}`}
              </CodeBlock>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                良い例：適切な状態管理
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock className="bg-green-50 border-green-200">
{`// ✅ 適切な状態管理
class UserViewModel : ViewModel() {
    private val _users = MutableLiveData<List<User>>()
    val users: LiveData<List<User>> = _users
    
    // 明確な状態遷移、テスト可能、UI更新自動
}`}
              </CodeBlock>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">比較表：LiveData vs Flow vs Compose State</h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold">観点</th>
                    <th className="text-left p-4 font-semibold text-blue-600">LiveData</th>
                    <th className="text-left p-4 font-semibold text-green-600">Flow</th>
                    <th className="text-left p-4 font-semibold text-purple-600">Compose State</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-4 font-medium">{row.aspect}</td>
                      <td className="p-4">{row.livedata}</td>
                      <td className="p-4">{row.flow}</td>
                      <td className="p-4">{row.state}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Implementation Examples */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">実践的比較：同じ機能を3つの方法で実装</h2>
        <p className="text-lg text-gray-600">
          シナリオ: ユーザー一覧の取得・表示・エラーハンドリング
        </p>

        <div className="space-y-8">
          {/* LiveData Example */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">方法1: LiveData（従来のAndroid開発）</CardTitle>
              <CardDescription>
                React/Flutterでいう: Class Component + setState に近い
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock className="bg-blue-50 border-blue-200">
{`class UserViewModel : ViewModel() {
    private val _users = MutableLiveData<List<User>>()
    val users: LiveData<List<User>> = _users
    
    private val _loading = MutableLiveData<Boolean>()
    val loading: LiveData<Boolean> = _loading
    
    private val _error = MutableLiveData<String?>()
    val error: LiveData<String?> = _error
    
    fun loadUsers() {
        _loading.value = true
        _error.value = null
        
        viewModelScope.launch {
            try {
                val result = repository.getUsers()
                _users.value = result
            } catch (e: Exception) {
                _error.value = e.message
            } finally {
                _loading.value = false
            }
        }
    }
}

// Compose使用時
@Composable
fun UserScreen(viewModel: UserViewModel) {
    val users by viewModel.users.observeAsState(initial = emptyList())
    val loading by viewModel.loading.observeAsState(initial = false)
    val error by viewModel.error.observeAsState()
    
    // UIコンテンツ
}`}
              </CodeBlock>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">メリット・デメリット</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-green-600 mb-1">✅ メリット:</h5>
                    <ul className="space-y-1 text-gray-700">
                      <li>• ライフサイクル自動管理</li>
                      <li>• 学習コスト低い</li>
                      <li>• 既存プロジェクトとの互換性</li>
                      <li>• メモリリーク防止</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-600 mb-1">❌ デメリット:</h5>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Compose専用機能ではない</li>
                      <li>• 複数の状態管理が冗長</li>
                      <li>• 変換操作が複雑</li>
                      <li>• コルーチンとの組み合わせが不自然</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Flow Example */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">方法2: Flow（モダンなKotlin非同期）</CardTitle>
              <CardDescription>
                React/Flutterでいう: useReducer + async/await に近い
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock className="bg-green-50 border-green-200">
{`data class UserUiState(
    val users: List<User> = emptyList(),
    val loading: Boolean = false,
    val error: String? = null
)

class UserViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(UserUiState())
    val uiState: StateFlow<UserUiState> = _uiState.asStateFlow()
    
    fun loadUsers() {
        _uiState.value = _uiState.value.copy(loading = true, error = null)
        
        viewModelScope.launch {
            try {
                val users = repository.getUsers()
                _uiState.value = _uiState.value.copy(
                    users = users,
                    loading = false
                )
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    loading = false,
                    error = e.message
                )
            }
        }
    }
    
    // Flow操作子を使った高度な処理
    fun searchUsers(query: String) {
        viewModelScope.launch {
            repository.searchUsers(query)
                .catch { e -> _uiState.value = _uiState.value.copy(error = e.message) }
                .collect { users ->
                    _uiState.value = _uiState.value.copy(users = users, loading = false)
                }
        }
    }
}

// Compose使用時
@Composable
fun UserScreen(viewModel: UserViewModel) {
    val uiState by viewModel.uiState.collectAsState()
    
    when {
        uiState.loading -> LoadingIndicator()
        uiState.error != null -> ErrorMessage(uiState.error)
        else -> UserList(uiState.users)
    }
}`}
              </CodeBlock>
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">メリット・デメリット</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-green-600 mb-1">✅ メリット:</h5>
                    <ul className="space-y-1 text-gray-700">
                      <li>• 状態をまとめて管理可能</li>
                      <li>• 強力なflow操作子</li>
                      <li>• コルーチンとの自然な統合</li>
                      <li>• 高いパフォーマンス</li>
                      <li>• 優れたテスタビリティ</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-600 mb-1">❌ デメリット:</h5>
                    <ul className="space-y-1 text-gray-700">
                      <li>• 初学者には学習コストが高い</li>
                      <li>• ライフサイクル管理を手動で行う必要</li>
                      <li>• メモリリークの可能性</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compose State Example */}
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-600">方法3: Compose State（Compose専用）</CardTitle>
              <CardDescription>
                React/Flutterでいう: useState + useEffect に最も近い
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock className="bg-purple-50 border-purple-200">
{`@Composable
fun UserScreen(repository: UserRepository = UserRepository()) {
    var uiState by remember { 
        mutableStateOf(UserUiState()) 
    }
    
    // LaunchedEffectでデータ取得
    LaunchedEffect(Unit) {
        uiState = uiState.copy(loading = true, error = null)
        try {
            val users = repository.getUsers()
            uiState = uiState.copy(users = users, loading = false)
        } catch (e: Exception) {
            uiState = uiState.copy(loading = false, error = e.message)
        }
    }
    
    when {
        uiState.loading -> LoadingIndicator()
        uiState.error != null -> ErrorMessage(uiState.error!!)
        else -> UserList(uiState.users)
    }
}

// より複雑な場合：カスタムComposable
@Composable
fun rememberUserState(repository: UserRepository): UserState {
    return remember { UserState(repository) }
}

class UserState(private val repository: UserRepository) {
    var uiState by mutableStateOf(UserUiState())
        private set
    
    suspend fun loadUsers() {
        uiState = uiState.copy(loading = true, error = null)
        try {
            val users = repository.getUsers()
            uiState = uiState.copy(users = users, loading = false)
        } catch (e: Exception) {
            uiState = uiState.copy(loading = false, error = e.message)
        }
    }
}`}
              </CodeBlock>
              <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">メリット・デメリット</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-green-600 mb-1">✅ メリット:</h5>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Composeとの完璧な統合</li>
                      <li>• 最小限のコード</li>
                      <li>• 学習コスト最低</li>
                      <li>• 自動再コンポーズ</li>
                      <li>• 優れたパフォーマンス</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-600 mb-1">❌ デメリット:</h5>
                    <ul className="space-y-1 text-gray-700">
                      <li>• UI外での状態管理困難</li>
                      <li>• 複雑なビジネスロジックには不向き</li>
                      <li>• テストがやや困難</li>
                      <li>• 画面回転等での状態保持に工夫が必要</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">使い分けガイドライン</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {guidelines.map((guideline, index) => {
            const Icon = guideline.icon
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${guideline.color}`}>
                    <Icon className="w-5 h-5" />
                    {guideline.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    <strong>推奨:</strong> {guideline.recommendation}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    <strong>理由:</strong> {guideline.reason}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">具体的なケース別推奨</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-purple-700">シンプルなフォーム画面</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock className="bg-purple-100 border-purple-300 text-xs mb-3">
{`@Composable
fun ContactForm() {
    var name by remember { 
        mutableStateOf("") 
    }
    var email by remember { 
        mutableStateOf("") 
    }
    // 👆 Compose State適用
}`}
              </CodeBlock>
              <p className="text-sm text-purple-700 font-medium">
                → Compose State推奨（シンプルで十分）
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-700">API通信を含む一覧画面</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock className="bg-green-100 border-green-300 text-xs mb-3">
{`class UserListViewModel : ViewModel() {
    private val _uiState = 
        MutableStateFlow(UserListUiState())
    val uiState: StateFlow<UserListUiState> = 
        _uiState.asStateFlow()
    // 👆 Flow推奨
}`}
              </CodeBlock>
              <p className="text-sm text-green-700 font-medium">
                → Flow推奨（非同期処理とエラーハンドリング）
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-700">レガシーコードとの統合</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock className="bg-blue-100 border-blue-300 text-xs mb-3">
{`class LegacyUserViewModel : ViewModel() {
    private val _users = 
        MutableLiveData<List<User>>()
    val users: LiveData<List<User>> = _users
    // 👆 LiveData
}`}
              </CodeBlock>
              <p className="text-sm text-blue-700 font-medium">
                → LiveData（既存コードとの整合性重視）
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Learning Roadmap */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">学習ロードマップ</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                Week 1: Compose State基礎
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Day 1-2: remember, mutableStateOf</li>
                <li>• Day 3-4: LaunchedEffect, DisposableEffect</li>
                <li>• Day 5-7: 簡単なフォーム・カウンターアプリ作成</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                Week 2: LiveData導入
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Day 1-2: ViewModel + LiveData基礎</li>
                <li>• Day 3-4: observeAsState使用法</li>
                <li>• Day 5-7: 既存Compose StateをLiveDataに変換</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                Week 3-4: Flow完全習得
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• Week 3: StateFlow, SharedFlow基礎</li>
                <li>• Week 4: Flow操作子（map, filter, combine）</li>
                <li>• 実習: 同じアプリをFlow版で再実装</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Resources */}
      <section className="space-y-6">
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">関連リソース</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-medium text-green-900">🛠️ 実装パターン</h4>
              <p className="text-sm text-green-700 mb-2">具体的な実装方法とベストプラクティス</p>
              <a href="/state-management" className="text-green-600 hover:text-green-800 underline text-sm font-medium">
                📝 状態管理実装ガイド
              </a>
            </div>
            <div>
              <h4 className="font-medium text-green-900">🔄 概念マッピング</h4>
              <p className="text-sm text-green-700 mb-2">React/Flutter経験者向けの対応表</p>
              <a href="/react-flutter-mapping" className="text-green-600 hover:text-green-800 underline text-sm font-medium">
                📋 React/Flutter → Android マッピング
              </a>
            </div>
            <div>
              <h4 className="font-medium text-green-900">🔗 依存性注入</h4>
              <p className="text-sm text-green-700 mb-2">ViewModelとRepositoryの連携</p>
              <a href="/dependency-injection" className="text-green-600 hover:text-green-800 underline text-sm font-medium">
                ⚙️ Hilt依存性注入ガイド
              </a>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Navigation */}
      <section className="flex justify-between items-center py-8 border-t">
        <Link to="/state-management">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 rotate-180" />
            前のページ: State管理基礎
          </Button>
        </Link>
        <Link to="/dependency-injection">
          <Button className="flex items-center gap-2 bg-gradient-to-r from-android-green to-android-blue text-white">
            次のページ: Hilt依存性注入
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>
    </div>
  )
}