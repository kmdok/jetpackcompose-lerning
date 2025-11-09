import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle2,
  AlertCircle,
  Code2,
  Layers,
  RefreshCw,
  Zap,
  GitBranch,
  Eye,
  ArrowRight,
} from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import { Link } from "react-router-dom";

export default function Composables() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 pb-8 sm:pb-12">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-android-green to-android-blue bg-clip-text text-transparent leading-tight">
          Composable 完全理解
        </h1>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 text-xs border rounded">宣言的UI</span>
          <span className="px-2 py-1 text-xs border rounded">
            関数型アプローチ
          </span>
          <span className="px-2 py-1 text-xs border rounded">
            Recomposition
          </span>
          <span className="px-2 py-1 text-xs border rounded">状態管理</span>
        </div>
      </div>

      {/* Core Concepts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-2 border-android-green/30">
          <CardHeader className="bg-gradient-to-br from-android-green/10 to-android-blue/10">
            <CardTitle className="flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              Composableとは何か
            </CardTitle>
            <CardDescription>宣言的UIの基本概念</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <p className="text-sm leading-relaxed">
              Composableは<strong>UI要素を記述する関数</strong>
              です。従来のAndroidの命令的UI（View）とは異なり、
              <strong>「何を表示するか」を宣言する</strong>
              関数型アプローチを採用します。
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">重要な特徴：</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>
                  • <strong>@Composable</strong>アノテーションが必須
                </li>
                <li>
                  • <strong>副作用なし</strong> - 同じ入力で同じ出力
                </li>
                <li>
                  • <strong>再実行可能</strong> - 状態変化で自動再実行
                </li>
                <li>
                  • <strong>順序依存</strong> - 呼び出し順序が重要
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-br from-blue-50 to-purple-50">
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Recomposition（再構成）
            </CardTitle>
            <CardDescription>Composeの核心メカニズム</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <p className="text-sm leading-relaxed">
              状態が変化すると、関連するComposableが
              <strong>自動的に再実行</strong>されます。
              これがRecompositionで、Composeの最も重要な概念です。
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">最適化のポイント：</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>
                  • <strong>Stable型</strong>の使用（primitives、data class）
                </li>
                <li>
                  • <strong>remember</strong>による計算結果キャッシュ
                </li>
                <li>
                  • <strong>derivedStateOf</strong>による派生状態
                </li>
                <li>
                  • <strong>key()</strong>による識別子指定
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Framework Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="w-5 h-5" />
            React/Flutter → Compose 概念マッピング
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-4">
            {/* React */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-react-blue"></div>
                <span className="font-semibold text-react-blue">React</span>
              </div>
              <CodeBlock
                language="javascript"
                className="text-xs bg-react-blue/5"
              >
                {`function Greeting({ name }) {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}`}
              </CodeBlock>
            </div>

            {/* Flutter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-flutter-blue"></div>
                <span className="font-semibold text-flutter-blue">Flutter</span>
              </div>
              <CodeBlock language="dart" className="text-xs bg-flutter-blue/5">
                {`class Greeting extends StatefulWidget {
  final String name;
  
  @override
  State<Greeting> createState() => _GreetingState();
}

class _GreetingState extends State<Greeting> {
  int count = 0;
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Hello, \${widget.name}!'),
        Text('Count: \$count'),
        ElevatedButton(
          onPressed: () => setState(() => count++),
          child: Text('Increment'),
        ),
      ],
    );
  }
}`}
              </CodeBlock>
            </div>

            {/* Compose */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-android-green"></div>
                <span className="font-semibold text-android-green">
                  Compose
                </span>
              </div>
              <CodeBlock className="text-xs bg-android-green/5">
                {`@Composable
fun Greeting(name: String) {
    var count by remember { mutableStateOf(0) }
    
    Column {
        Text("Hello, \$name!")
        Text("Count: \$count")
        Button(
            onClick = { count++ }
        ) {
            Text("Increment")
        }
    }
}`}
              </CodeBlock>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* State Management Deep Dive */}
      <Card className="border-2 border-purple-200">
        <CardHeader className="bg-gradient-to-br from-purple-50 to-pink-50">
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            状態管理の深い理解
          </CardTitle>
          <CardDescription>
            remember、mutableStateOf、derivedStateOf
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* remember */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              remember - 値のメモ化
            </h3>
            <p className="text-sm text-gray-700">
              Recomposition間で値を保持します。計算コストの高い処理や、オブジェクトの再生成を防ぐために使用。
            </p>
            <CodeBlock className="text-sm">
              {`@Composable
fun ExpensiveComponent() {
    // ❌ 毎回新しいリストが作成される
    val expensiveList = createExpensiveList()
    
    // ✅ 初回のみ作成、以降は同じインスタンス
    val memoizedList = remember { createExpensiveList() }
    
    // ✅ キーが変わった時のみ再計算
    val keyBasedList = remember(key1 = userId) { 
        createUserSpecificList(userId) 
    }
}`}
            </CodeBlock>
          </div>

          {/* mutableStateOf */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-600" />
              mutableStateOf - 監視可能な状態
            </h3>
            <p className="text-sm text-gray-700">
              値の変更を自動検出し、依存するComposableのRecompositionをトリガーします。
            </p>
            <CodeBlock className="text-sm">
              {`@Composable
fun StateExample() {
    // by デリゲートで直接的なアクセス
    var text by remember { mutableStateOf("") }
    
    // MutableState<T>として扱う場合
    val textState = remember { mutableStateOf("") }
    
    Column {
        // by デリゲート - シンプル
        TextField(
            value = text,
            onValueChange = { text = it }
        )
        
        // .value アクセス
        TextField(
            value = textState.value,
            onValueChange = { textState.value = it }
        )
        
        Text("入力: \$text")
    }
}`}
            </CodeBlock>
          </div>

          {/* derivedStateOf */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-600" />
              derivedStateOf - 派生状態の最適化
            </h3>
            <p className="text-sm text-gray-700">
              他の状態から計算される値の不要な再計算を防ぎます。依存する値が実際に変更された時のみ再計算。
            </p>
            <CodeBlock className="text-sm">
              {`@Composable
fun SearchList(items: List<String>) {
    var query by remember { mutableStateOf("") }
    
    // ❌ queryが変わらなくても毎回filter実行
    val filteredItems = items.filter { it.contains(query) }
    
    // ✅ queryまたはitemsが変わった時のみfilter実行
    val optimizedFilteredItems by remember {
        derivedStateOf {
            items.filter { it.contains(query, ignoreCase = true) }
        }
    }
    
    Column {
        TextField(
            value = query,
            onValueChange = { query = it },
            placeholder = { Text("検索...") }
        )
        
        LazyColumn {
            items(optimizedFilteredItems) { item ->
                Text(item)
            }
        }
    }
}`}
            </CodeBlock>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Concepts */}
      <Card className="border-2 border-orange-200">
        <CardHeader className="bg-gradient-to-br from-orange-50 to-red-50">
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            上級者向け：Composableの内部動作
          </CardTitle>
          <CardDescription>
            Slot Table、Composition、CompositionLocal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* Slot Table */}
          <div className="space-y-3">
            <h3 className="font-semibold">
              Slot Table - Composeの内部データ構造
            </h3>
            <p className="text-sm text-gray-700">
              Composeランタイムは Slot Table
              という木構造でComposableを管理します。
              各Composableの位置と状態を効率的に追跡し、最小限のRecompositionを実現。
            </p>
            <CodeBlock className="text-sm">
              {`// Composeが内部で管理する概念的な構造
// 実際のSlot Tableのイメージ
SlotTable {
    Group(key = "MyScreen") {
        Group(key = "Header") {
            Node("Text", content = "Hello")
        }
        Group(key = "Content") {
            Node("Button", onClick = {}, text = "Click")
            Node("Text", content = "Count: 5")
        }
    }
}

// key()を使った明示的な識別
@Composable
fun ItemList(items: List<Item>) {
    LazyColumn {
        items(items) { item ->
            key(item.id) { // 重要：一意なキーを指定
                ItemCard(item = item)
            }
        }
    }
}`}
            </CodeBlock>
          </div>

          {/* CompositionLocal */}
          <div className="space-y-3">
            <h3 className="font-semibold">
              CompositionLocal - 暗黙的な依存性注入
            </h3>
            <p className="text-sm text-gray-700">
              Composition階層を通じて値を暗黙的に渡すメカニズム。Reactのcontext、Flutterのtheme概念に相当。
            </p>
            <CodeBlock className="text-sm">
              {`// CompositionLocalの定義
val LocalUserPreferences = compositionLocalOf<UserPreferences> {
    error("UserPreferences not provided")
}

@Composable
fun App() {
    val userPrefs = remember { UserPreferences() }
    
    // 階層全体に値を提供
    CompositionLocalProvider(LocalUserPreferences provides userPrefs) {
        MainScreen()
    }
}

@Composable
fun SomeDeepComponent() {
    // どの深さからでもアクセス可能
    val userPrefs = LocalUserPreferences.current
    
    Text(
        "Theme: \${userPrefs.theme}",
        color = if (userPrefs.isDarkMode) Color.White else Color.Black
    )
}`}
            </CodeBlock>
          </div>

          {/* Performance Optimization */}
          <div className="space-y-3">
            <h3 className="font-semibold">パフォーマンス最適化テクニック</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-green-700">
                  ✅ 推奨パターン
                </h4>
                <CodeBlock className="text-xs">
                  {`// Stable型の使用
@Immutable
data class User(val id: String, val name: String)

// ラムダの外部定義
@Composable
fun MyScreen() {
    val onClickHandler = remember { { /* 処理 */ } }
    Button(onClick = onClickHandler) { Text("Click") }
}

// LaunchedEffectでの副作用
@Composable
fun DataLoader(userId: String) {
    var data by remember { mutableStateOf<Data?>(null) }
    
    LaunchedEffect(userId) {
        data = loadUserData(userId)
    }
    
    data?.let { DisplayData(it) }
}`}
                </CodeBlock>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-red-700">
                  ❌ 避けるべきパターン
                </h4>
                <CodeBlock className="text-xs">
                  {`// 不安定な型
data class MutableUser(var name: String)

// 毎回新しいラムダ
@Composable
fun BadExample() {
    Button(onClick = { /* 毎回新しい関数 */ }) {
        Text("Click")
    }
}

// Composable内での副作用
@Composable
fun BadComponent() {
    var data by remember { mutableStateOf<Data?>(null) }
    
    // ❌ 副作用をComposable内で直接実行
    loadUserData { result ->
        data = result
    }
}`}
                </CodeBlock>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Practical Example */}
      <Card className="border-2 border-android-green/30">
        <CardHeader className="bg-gradient-to-br from-android-green/10 to-android-blue/10">
          <CardTitle>実践例：完全なComposable設計</CardTitle>
          <CardDescription>
            プロダクションレベルのComposable実装
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <CodeBlock className="text-sm">
            {`@Stable
data class UserProfile(
    val id: String,
    val name: String,
    val avatarUrl: String,
    val isOnline: Boolean
)

@Composable
fun UserProfileCard(
    profile: UserProfile,
    modifier: Modifier = Modifier,
    onProfileClick: (String) -> Unit = {},
    onMessageClick: (String) -> Unit = {}
) {
    // ✅ 安定したコールバック
    val onClickHandler = remember(profile.id) {
        { onProfileClick(profile.id) }
    }
    
    Card(
        modifier = modifier
            .fillMaxWidth()
            .clickable { onClickHandler() },
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // ✅ AsyncImageでの非同期画像読み込み
            AsyncImage(
                model = profile.avatarUrl,
                contentDescription = "\${profile.name}のプロフィール画像",
                modifier = Modifier
                    .size(48.dp)
                    .clip(CircleShape),
                contentScale = ContentScale.Crop
            )
            
            Spacer(modifier = Modifier.width(12.dp))
            
            Column(
                modifier = Modifier.weight(1f)
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = profile.name,
                        style = MaterialTheme.typography.titleMedium,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )
                    
                    if (profile.isOnline) {
                        Spacer(modifier = Modifier.width(8.dp))
                        OnlineIndicator()
                    }
                }
                
                // ✅ derivedStateOfでの派生状態
                val statusText by remember {
                    derivedStateOf {
                        if (profile.isOnline) "オンライン" else "オフライン"
                    }
                }
                
                Text(
                    text = statusText,
                    style = MaterialTheme.typography.bodySmall,
                    color = LocalContentColor.current.copy(alpha = 0.7f)
                )
            }
            
            IconButton(
                onClick = { onMessageClick(profile.id) }
            ) {
                Icon(
                    imageVector = Icons.Default.Message,
                    contentDescription = "メッセージを送信"
                )
            }
        }
    }
}

@Composable
private fun OnlineIndicator() {
    Box(
        modifier = Modifier
            .size(8.dp)
            .background(
                color = Color.Green,
                shape = CircleShape
            )
    )
}`}
          </CodeBlock>
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
                State管理
              </h4>
              <p className="text-sm text-blue-700 mb-2">
                ViewModel + StateFlow/LiveData パターン
              </p>
              <Link
                to="/state-management"
                className="text-blue-600 hover:text-blue-800 underline text-sm font-medium"
              >
                📊 State管理ページ
              </Link>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 flex items-center gap-2">
                <ArrowRight className="w-4 h-4" />
                レイアウト構築
              </h4>
              <p className="text-sm text-blue-700 mb-2">
                Row、Column、Boxでの配置
              </p>
              <Link
                to="/layouts"
                className="text-blue-600 hover:text-blue-800 underline text-sm font-medium"
              >
                🏗️ レイアウトページ
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
