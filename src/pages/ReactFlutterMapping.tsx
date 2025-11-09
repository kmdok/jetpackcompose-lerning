import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Code, Lightbulb, Zap, ArrowUpDown, CheckCircle, Monitor } from 'lucide-react'
import { Link } from 'react-router-dom'
import ComparisonCode from '@/components/ComparisonCode'

export default function ReactFlutterMapping() {
  const conceptMappings = [
    {
      category: '状態管理',
      mappings: [
        { 
          reactFlutter: 'useState/setState', 
          android: 'remember { mutableStateOf() }',
          description: 'ローカル状態管理'
        },
        { 
          reactFlutter: 'useEffect', 
          android: 'LaunchedEffect/DisposableEffect',
          description: 'ライフサイクル効果管理'
        },
        { 
          reactFlutter: 'Redux/Provider/Riverpod', 
          android: 'ViewModel + StateFlow',
          description: 'グローバル状態管理'
        },
        { 
          reactFlutter: 'Context/InheritedWidget', 
          android: 'CompositionLocal',
          description: 'データの階層提供'
        }
      ]
    },
    {
      category: 'コンポーネント',
      mappings: [
        { 
          reactFlutter: 'Function Component/StatelessWidget', 
          android: '@Composable fun',
          description: 'UI構築の基本単位'
        },
        { 
          reactFlutter: 'Props/Parameters', 
          android: 'Function Parameters',
          description: 'コンポーネント間データ受け渡し'
        },
        { 
          reactFlutter: 'Children/child', 
          android: 'Content Lambda',
          description: '子要素の受け渡し'
        },
        { 
          reactFlutter: 'HOC/Wrapper Widget', 
          android: 'Composable Wrappers',
          description: 'コンポーネント拡張パターン'
        }
      ]
    },
    {
      category: 'ナビゲーション',
      mappings: [
        { 
          reactFlutter: 'React Router/Navigator', 
          android: 'Navigation Compose',
          description: '画面遷移管理'
        },
        { 
          reactFlutter: 'Route Parameters', 
          android: 'Navigation Arguments',
          description: 'パラメータ受け渡し'
        },
        { 
          reactFlutter: 'Guards/CanActivate', 
          android: 'Navigation Conditional Logic',
          description: '遷移条件制御'
        }
      ]
    },
    {
      category: 'API通信',
      mappings: [
        { 
          reactFlutter: 'fetch/dio/http', 
          android: 'Retrofit + OkHttp',
          description: 'HTTP通信'
        },
        { 
          reactFlutter: 'async/await', 
          android: 'suspend functions + coroutines',
          description: '非同期処理'
        },
        { 
          reactFlutter: 'Error Boundaries/try-catch', 
          android: 'try/catch + Error UI States',
          description: 'エラーハンドリング'
        }
      ]
    }
  ]

  const advantages = [
    {
      icon: CheckCircle,
      title: '宣言的UI設計思想',
      description: 'React Hooks ≈ Compose State の概念理解',
      color: 'text-green-600'
    },
    {
      icon: Monitor,
      title: 'コンポーネント設計パターン',
      description: 'コンポーネント分割と再利用の考え方',
      color: 'text-blue-600'
    },
    {
      icon: ArrowUpDown,
      title: '状態管理概念',
      description: 'Redux/Provider ≈ ViewModel/Flow',
      color: 'text-purple-600'
    },
    {
      icon: Zap,
      title: '非同期処理',
      description: 'Promise/Future ≈ Coroutine/Flow',
      color: 'text-yellow-600'
    },
    {
      icon: Code,
      title: '関数型プログラミング思想',
      description: 'map, filter, reduce等の高階関数',
      color: 'text-indigo-600'
    }
  ]

  const learningGaps = [
    {
      title: 'Kotlin言語特性',
      details: ['Null Safety', 'Extension Functions', 'Data Classes', 'Sealed Classes'],
      priority: 'high',
      color: 'border-red-200 bg-red-50'
    },
    {
      title: 'Android特有の概念',
      details: ['Activity/Fragment ライフサイクル', 'Permission システム', 'Intent と Bundle'],
      priority: 'high',
      color: 'border-orange-200 bg-orange-50'
    },
    {
      title: 'プラットフォーム固有API',
      details: ['Camera/Location API', 'File System Access', 'Background Processing'],
      priority: 'medium',
      color: 'border-yellow-200 bg-yellow-50'
    },
    {
      title: 'Jetpack Compose最適化',
      details: ['Recomposition', 'Performance optimization', 'Memory management'],
      priority: 'medium',
      color: 'border-blue-200 bg-blue-50'
    }
  ]

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">
          React/Flutter → Android/Compose
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          既存知識からの効率的学習：概念マッピングで理解を加速
        </p>
      </section>

      {/* Advantages */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">
          アドバンテージ（活用可能な既存スキル）
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon
            return (
              <Card key={index} className="text-center">
                <CardHeader>
                  <Icon className={`w-8 h-8 ${advantage.color} mx-auto`} />
                  <CardTitle className="text-lg">{advantage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{advantage.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
        <div className="p-6 bg-green-50 rounded-xl border border-green-200">
          <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            学習加速要因
          </h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• UI設計パターンの理解</li>
            <li>• 状態とイベントの分離概念</li>
            <li>• テストピラミッドの理解</li>
            <li>• コンポーネント指向開発の経験</li>
          </ul>
        </div>
      </section>

      {/* Concept Mappings */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">概念マッピング：既存知識からの効率的学習</h2>
        <div className="space-y-8">
          {conceptMappings.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.mappings.map((mapping, mappingIndex) => (
                    <div key={mappingIndex} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <code className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {mapping.reactFlutter}
                        </code>
                      </div>
                      <ArrowRight className="w-6 h-6 text-gray-400 flex-shrink-0" />
                      <div className="flex-1">
                        <code className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                          {mapping.android}
                        </code>
                      </div>
                      <div className="flex-1 text-sm text-gray-600">
                        {mapping.description}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Code Examples */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">実践的変換例</h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">React Hooks → Compose State</CardTitle>
            <CardDescription>
              React経験者が最も理解しやすいパターン
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ComparisonCode 
              reactCode={`function UserProfile() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    loadUser().then(setUser);
  }, []);
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h1>{user.name}</h1>
    </div>
  );
}`}
              composeCode={`@Composable
fun UserProfile() {
    var user by remember { mutableStateOf<User?>(null) }
    
    LaunchedEffect(Unit) {
        user = loadUser()
    }
    
    user?.let { userInfo ->
        Column {
            Text(userInfo.name)
        }
    } ?: run {
        CircularProgressIndicator()
    }
}`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Flutter Widgets → Compose Components</CardTitle>
            <CardDescription>
              Widget設計パターンの移行
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ComparisonCode 
              flutterCode={`class UserCard extends StatelessWidget {
  final User user;
  final VoidCallback onTap;
  
  const UserCard({
    Key? key,
    required this.user,
    required this.onTap,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        title: Text(user.name),
        onTap: onTap,
      ),
    );
  }
}`}
              composeCode={`@Composable
fun UserCard(
    user: User,
    onTap: () -> Unit
) {
    Card(
        modifier = Modifier.clickable { onTap() }
    ) {
        ListItem(
            headlineContent = { Text(user.name) }
        )
    }
}`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Redux/Provider → ViewModel + StateFlow</CardTitle>
            <CardDescription>
              グローバル状態管理の移行
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ComparisonCode 
              reactCode={`// Store
const userSlice = createSlice({
  name: 'user',
  initialState: { users: [], loading: false },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    }
  }
});

// Component
function UserList() {
  const { users, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  
  return loading ? <Loading /> : <UserGrid users={users} />;
}`}
              composeCode={`// ViewModel
data class UserUiState(
    val users: List<User> = emptyList(),
    val loading: Boolean = false
)

class UserViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(UserUiState())
    val uiState: StateFlow<UserUiState> = _uiState.asStateFlow()
    
    fun loadUsers() {
        _uiState.value = _uiState.value.copy(loading = true)
        // API呼び出し処理
    }
}

// Composable
@Composable
fun UserList(viewModel: UserViewModel = viewModel()) {
    val uiState by viewModel.uiState.collectAsState()
    
    LaunchedEffect(Unit) {
        viewModel.loadUsers()
    }
    
    if (uiState.loading) {
        CircularProgressIndicator()
    } else {
        UserGrid(users = uiState.users)
    }
}`}
            />
          </CardContent>
        </Card>
      </section>

      {/* Learning Gaps */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">主要な学習ギャップ</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {learningGaps.map((gap, index) => (
            <Card key={index} className={gap.color}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {gap.priority === 'high' && <div className="w-3 h-3 bg-red-500 rounded-full"></div>}
                  {gap.priority === 'medium' && <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>}
                  {gap.title}
                </CardTitle>
                <CardDescription className="font-medium">
                  優先度: {gap.priority === 'high' ? '高' : '中'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {gap.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="p-6 bg-orange-50 rounded-xl border border-orange-200">
          <h3 className="font-semibold text-orange-800 mb-2">⚠️ 注意すべき違い</h3>
          <ul className="text-sm text-orange-700 space-y-2">
            <li>• <strong>ビルドシステム</strong>: Gradle vs npm/pub - 依存関係管理方法が大きく異なる</li>
            <li>• <strong>依存性注入</strong>: Hilt vs React Context/Flutter GetIt - より強力だが学習コストが高い</li>
            <li>• <strong>プラットフォーム統合</strong>: ネイティブモジュール連携の方法が特殊</li>
            <li>• <strong>デバッグ方法</strong>: Chrome DevTools vs Android Studio - ツールが全く異なる</li>
          </ul>
        </div>
      </section>

      {/* Learning Strategy */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">効率的学習戦略</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">1</span>
              </div>
              <CardTitle>既存パターンから開始</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                React/Flutterで実装したアプリの1画面を、同じロジックでCompose版として再実装
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">2</span>
              </div>
              <CardTitle>段階的複雑化</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                シンプルな状態管理から始めて、ViewModel、Repository、Hiltと段階的に導入
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3</span>
              </div>
              <CardTitle>Android特化学習</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                基本を習得後、Android特有概念（ライフサイクル、Permission等）を集中学習
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Practice Exercise */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">実践エクササイズ</h2>
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">
              Challenge: 既存アプリのCompose版実装
            </CardTitle>
            <CardDescription>
              React/Flutterで開発した簡単なアプリを、Jetpack Composeで再実装してみましょう
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h4 className="font-semibold">推奨アプリ例:</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium mb-2">1. カウンターアプリ</h5>
                  <ul className="space-y-1 text-gray-600">
                    <li>• 状態管理（カウント値）</li>
                    <li>• イベントハンドリング（+/-ボタン）</li>
                    <li>• 条件付きレンダリング</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">2. TODO リスト</h5>
                  <ul className="space-y-1 text-gray-600">
                    <li>• リスト表示とスクロール</li>
                    <li>• アイテム追加・削除</li>
                    <li>• 状態変更（完了/未完了）</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <h5 className="font-medium mb-2">学習ポイント:</h5>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• 既存のロジックをCompose Stateに移植</li>
                  <li>• React/Flutter開発で使った状態管理パターンの違いを理解</li>
                  <li>• Android特有のライフサイクルやNavigationの扱いを体験</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Navigation */}
      <section className="flex justify-between items-center py-8 border-t">
        <Link to="/composables">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 rotate-180" />
            前のページ: Composable詳細
          </Button>
        </Link>
        <Link to="/kotlin-basics">
          <Button className="flex items-center gap-2 bg-gradient-to-r from-android-green to-android-blue text-white">
            次のページ: Kotlin基礎
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>
    </div>
  )
}