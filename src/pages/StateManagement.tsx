import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function StateManagement() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
        State管理
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>remember と mutableStateOf</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded-lg overflow-x-auto text-xs md:text-sm">
{`@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }

    Button(onClick = { count++ }) {
        Text("Count: $count")
    }
}`}
          </pre>
          <div className="mt-4 bg-blue-50 p-3 md:p-4 rounded-lg">
            <p className="text-sm text-blue-900">
              💡 <strong>React/Flutterとの比較:</strong><br/>
              React: <code>const [count, setCount] = useState(0)</code><br/>
              Flutter: <code>setState(() &#123; count++; &#125;)</code><br/>
              Compose: <code>var count by remember &#123; mutableStateOf(0) &#125;</code>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>状態の巻き上げ (State Hoisting)</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded-lg overflow-x-auto text-xs md:text-sm">
{`@Composable
fun CounterScreen() {
    var count by remember { mutableStateOf(0) }

    Column {
        Counter(
            count = count,
            onIncrement = { count++ }
        )
    }
}

@Composable
fun Counter(
    count: Int,
    onIncrement: () -> Unit
) {
    Button(onClick = onIncrement) {
        Text("Count: $count")
    }
}`}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ViewModel との連携</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded-lg overflow-x-auto text-xs md:text-sm">
{`class CounterViewModel : ViewModel() {
    private val _count = MutableStateFlow(0)
    val count: StateFlow<Int> = _count.asStateFlow()

    fun increment() {
        _count.value++
    }
}

@Composable
fun CounterScreen(
    viewModel: CounterViewModel = viewModel()
) {
    val count by viewModel.count.collectAsState()

    Button(onClick = { viewModel.increment() }) {
        Text("Count: $count")
    }
}`}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
