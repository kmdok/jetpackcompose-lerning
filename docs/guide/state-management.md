# State管理

Jetpack ComposeにおけるState管理は、ReactのHooksやFlutterのStatefulWidgetと似た概念です。

## 基本概念

Composeでは、**状態が変わるとUIが自動的に再構築（Recomposition）**されます。

```kotlin
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }

    Button(onClick = { count++ }) {
        Text("Count: $count")
    }
}
```

## remember と mutableStateOf

### remember

`remember`は再構築時に値を保持します。

```kotlin
var count by remember { mutableStateOf(0) }
```

::: tip React/Flutterとの比較
```jsx
// React
const [count, setCount] = useState(0);

// Flutter
int count = 0;
setState(() { count++; });

// Compose
var count by remember { mutableStateOf(0) }
```
:::

### mutableStateOf

状態を保持し、変更を監視します。

```kotlin
// 方法1: by デリゲート（推奨）
var count by remember { mutableStateOf(0) }
count++  // 直接代入可能

// 方法2: 明示的
val count = remember { mutableStateOf(0) }
count.value++  // .valueを使う
```

## 状態の種類

### 1. 単純な値

```kotlin
var text by remember { mutableStateOf("") }
var isChecked by remember { mutableStateOf(false) }
var count by remember { mutableStateOf(0) }
```

### 2. オブジェクト

```kotlin
data class User(val name: String, val age: Int)

var user by remember { mutableStateOf(User("John", 25)) }

// 更新時は新しいインスタンスを作成
user = user.copy(age = 26)
```

### 3. リスト

```kotlin
var items by remember { mutableStateOf(listOf<String>()) }

// 追加
items = items + "New Item"

// 削除
items = items.filter { it != "Remove me" }
```

::: warning
`mutableStateListOf`も使えますが、不変リストの方が推奨されます。
:::

## 状態の巻き上げ (State Hoisting)

状態を親コンポーネントに持ち上げて、複数の子で共有します。

### 悪い例: 状態が分散

```kotlin
@Composable
fun CounterScreen() {
    Column {
        Counter()  // 各Counterが独立した状態を持つ
        Counter()
    }
}

@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    Button(onClick = { count++ }) {
        Text("Count: $count")
    }
}
```

### 良い例: 状態を巻き上げ

```kotlin
@Composable
fun CounterScreen() {
    var count by remember { mutableStateOf(0) }

    Column {
        Counter(
            count = count,
            onIncrement = { count++ }
        )
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
}
```

::: tip React/Flutterとの比較
これはReactの「状態の巻き上げ」、Flutterの「状態を親が管理」と同じパターンです。
:::

## ステートレス vs ステートフル

### ステートレス Composable（推奨）

状態を持たず、プロパティで受け取る。

```kotlin
@Composable
fun Greeting(name: String, onNameChange: (String) -> Unit) {
    TextField(
        value = name,
        onValueChange = onNameChange
    )
}
```

### ステートフル Composable

内部で状態を管理する。

```kotlin
@Composable
fun GreetingWithState() {
    var name by remember { mutableStateOf("") }

    TextField(
        value = name,
        onValueChange = { name = it }
    )
}
```

::: tip ベストプラクティス
- **ステートレス**を優先
- 再利用しやすい
- テストしやすい
- 状態の流れが明確
:::

## rememberSaveable

画面回転などでも状態を保持します。

```kotlin
var text by rememberSaveable { mutableStateOf("") }
```

::: tip
`remember`は画面回転で消えますが、`rememberSaveable`は保持されます。
:::

## ViewModel との連携

実際のアプリでは、ViewModelで状態を管理することが多いです。

### ViewModel定義

```kotlin
class CounterViewModel : ViewModel() {
    private val _count = MutableStateFlow(0)
    val count: StateFlow<Int> = _count.asStateFlow()

    fun increment() {
        _count.value++
    }
}
```

### Composableから使用

```kotlin
@Composable
fun CounterScreen(viewModel: CounterViewModel = viewModel()) {
    val count by viewModel.count.collectAsState()

    Button(onClick = { viewModel.increment() }) {
        Text("Count: $count")
    }
}
```

::: tip
ViewModelはライフサイクルを超えて状態を保持できます。
:::

## 派生状態 (Derived State)

他の状態から計算される状態です。

```kotlin
@Composable
fun UserProfile() {
    var firstName by remember { mutableStateOf("John") }
    var lastName by remember { mutableStateOf("Doe") }

    // 派生状態
    val fullName by remember(firstName, lastName) {
        derivedStateOf { "$firstName $lastName" }
    }

    Text("Full name: $fullName")
}
```

::: tip React/Flutterとの比較
```jsx
// React
const fullName = useMemo(
  () => `${firstName} ${lastName}`,
  [firstName, lastName]
);

// Compose
val fullName by remember(firstName, lastName) {
  derivedStateOf { "$firstName $lastName" }
}
```
:::

## 実践例

### TODOリスト

```kotlin
data class Todo(val id: Int, val text: String, val done: Boolean)

@Composable
fun TodoList() {
    var todos by remember {
        mutableStateOf(
            listOf(
                Todo(1, "Learn Compose", false),
                Todo(2, "Build an app", false)
            )
        )
    }

    Column {
        todos.forEach { todo ->
            TodoItem(
                todo = todo,
                onToggle = {
                    todos = todos.map {
                        if (it.id == todo.id) it.copy(done = !it.done)
                        else it
                    }
                }
            )
        }
    }
}

@Composable
fun TodoItem(
    todo: Todo,
    onToggle: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onToggle() }
            .padding(16.dp)
    ) {
        Checkbox(
            checked = todo.done,
            onCheckedChange = { onToggle() }
        )
        Text(
            text = todo.text,
            textDecoration = if (todo.done) {
                TextDecoration.LineThrough
            } else {
                null
            }
        )
    }
}
```

### フォーム入力

```kotlin
@Composable
fun LoginForm() {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var isLoading by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center
    ) {
        TextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("Email") },
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(8.dp))

        TextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Password") },
            visualTransformation = PasswordVisualTransformation(),
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(16.dp))

        Button(
            onClick = {
                isLoading = true
                // ログイン処理
            },
            enabled = !isLoading && email.isNotEmpty() && password.isNotEmpty(),
            modifier = Modifier.fillMaxWidth()
        ) {
            if (isLoading) {
                CircularProgressIndicator(
                    modifier = Modifier.size(20.dp),
                    color = Color.White
                )
            } else {
                Text("Login")
            }
        }
    }
}
```

## パフォーマンスの考慮

### 不必要な再構築を避ける

```kotlin
// ❌ 悪い例: 毎回新しいラムダが生成される
@Composable
fun BadExample(items: List<String>) {
    items.forEach { item ->
        Text(
            text = item,
            modifier = Modifier.clickable {
                println(item)  // 新しいラムダ
            }
        )
    }
}

// ✅ 良い例: rememberで最適化
@Composable
fun GoodExample(items: List<String>) {
    items.forEach { item ->
        val onClick = remember(item) {
            { println(item) }
        }
        Text(
            text = item,
            modifier = Modifier.clickable(onClick = onClick)
        )
    }
}
```

## まとめ

| 概念 | 用途 |
|------|------|
| `remember` | 再構築時に値を保持 |
| `mutableStateOf` | 変更可能な状態 |
| `rememberSaveable` | 画面回転でも保持 |
| `derivedStateOf` | 他の状態から計算 |
| State Hoisting | 状態を親で管理 |
| ViewModel | ライフサイクルを超えた状態管理 |

## 次のステップ

- [LaunchedEffect](/guide/launched-effect) - 副作用を扱う
- [レイアウト基礎](/guide/layouts) - UIの配置を学ぶ
- [実践例: TODOアプリ](/examples/todo-app) - 実際に作ってみる
