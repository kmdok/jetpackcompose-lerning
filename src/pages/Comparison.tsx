import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Comparison() {
  const comparisons = [
    {
      concept: 'UIコンポーネント',
      react: 'Component',
      flutter: 'Widget',
      compose: 'Composable',
    },
    {
      concept: '状態管理',
      react: 'useState',
      flutter: 'setState',
      compose: 'remember + mutableStateOf',
    },
    {
      concept: 'レイアウト',
      react: 'div, flex',
      flutter: 'Column, Row',
      compose: 'Column, Row',
    },
    {
      concept: 'リスト',
      react: 'map()',
      flutter: 'ListView.builder',
      compose: 'LazyColumn',
    },
    {
      concept: '副作用',
      react: 'useEffect',
      flutter: 'initState/dispose',
      compose: 'LaunchedEffect/DisposableEffect',
    },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-android-green to-android-blue bg-clip-text text-transparent">
          Flutter/React との比較
        </h1>
        <p className="text-lg text-gray-600">
          FlutterやReactの経験がある方向けに、Jetpack Composeとの対応関係を解説します。
        </p>
      </div>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>基本概念の対応表</CardTitle>
          <CardDescription>既知の概念とJetpack Composeの対応関係</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold">概念</th>
                  <th className="text-left p-4 font-semibold text-react-blue">React</th>
                  <th className="text-left p-4 font-semibold text-flutter-blue">Flutter</th>
                  <th className="text-left p-4 font-semibold text-android-green">Jetpack Compose</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium">{item.concept}</td>
                    <td className="p-4 font-mono text-sm text-react-blue">{item.react}</td>
                    <td className="p-4 font-mono text-sm text-flutter-blue">{item.flutter}</td>
                    <td className="p-4 font-mono text-sm text-android-green">{item.compose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Code Examples */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-2 border-react-blue/20">
          <CardHeader className="bg-gradient-to-br from-react-blue/10 to-react-blue/5">
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">⚛️</span>
              React
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`function Counter() {
  const [count, setCount] =
    useState(0);

  return (
    <button onClick={() =>
      setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`}
            </pre>
          </CardContent>
        </Card>

        <Card className="border-2 border-flutter-blue/20">
          <CardHeader className="bg-gradient-to-br from-flutter-blue/10 to-flutter-blue/5">
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🐦</span>
              Flutter
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`class Counter extends
  StatefulWidget {
  @override
  State createState() =>
    _CounterState();
}

class _CounterState
  extends State<Counter> {
  int count = 0;
  //...
}`}
            </pre>
          </CardContent>
        </Card>

        <Card className="border-2 border-android-green/20">
          <CardHeader className="bg-gradient-to-br from-android-green/10 to-android-green/5">
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              Compose
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`@Composable
fun Counter() {
  var count by remember {
    mutableStateOf(0)
  }

  Button(onClick = {
    count++
  }) {
    Text("Count: $count")
  }
}`}
            </pre>
          </CardContent>
        </Card>
      </div>

      {/* Key Differences */}
      <Card>
        <CardHeader>
          <CardTitle>重要な違い</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">✅ Composeの利点</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Kotlinの型システムを活用した安全性</li>
              <li>Null安全性が組み込まれている</li>
              <li>Android Studioでのリアルタイムプレビュー</li>
              <li>Material Design 3の完全サポート</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">📝 学習のポイント</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>ReactやFlutterの知識は直接活かせます</li>
              <li>まずKotlinの基礎を理解しましょう</li>
              <li>Composableは関数ベースで、Reactに最も近い</li>
              <li>状態管理の考え方はReact Hooksと似ています</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
