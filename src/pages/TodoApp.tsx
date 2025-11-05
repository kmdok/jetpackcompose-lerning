import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TodoApp() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
        実践例: TODOアプリ
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>ViewModel</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded-lg overflow-x-auto text-xs md:text-sm">
{`class TodoViewModel : ViewModel() {
    private val _todos =
        MutableStateFlow<List<Todo>>(emptyList())
    val todos: StateFlow<List<Todo>> =
        _todos.asStateFlow()

    fun addTodo(text: String) {
        val newTodo = Todo(
            id = _todos.value.size + 1,
            text = text
        )
        _todos.update { it + newTodo }
    }

    fun toggleTodo(id: Int) {
        _todos.update { todos ->
            todos.map {
                if (it.id == id)
                    it.copy(done = !it.done)
                else it
            }
        }
    }
}`}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>UI実装</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded-lg overflow-x-auto text-xs md:text-sm">
{`@Composable
fun TodoScreen(
    viewModel: TodoViewModel = viewModel()
) {
    val todos by
        viewModel.todos.collectAsState()

    Column {
        TodoInput(
            onAddTodo = { text ->
                viewModel.addTodo(text)
            }
        )

        LazyColumn {
            items(todos) { todo ->
                TodoItem(
                    todo = todo,
                    onToggle = {
                        viewModel.toggleTodo(todo.id)
                    }
                )
            }
        }
    }
}`}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>学んだこと</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
            <li>StateFlowでの状態管理</li>
            <li>LazyColumnでリスト表示</li>
            <li>ViewModelとComposeの連携</li>
            <li>状態の更新とUI再描画</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
