# Flutter/React との比較

FlutterやReactの経験がある方向けに、Jetpack Composeとの対応関係を解説します。

## 基本概念の対応表

| 概念 | React | Flutter | Jetpack Compose |
|------|-------|---------|-----------------|
| UIコンポーネント | Component | Widget | Composable |
| 状態管理 | useState | setState | remember + mutableStateOf |
| プロパティ | props | widget properties | function parameters |
| 子要素 | children | child/children | content lambda |
| レイアウト | div, flex | Column, Row | Column, Row |
| リスト | map() | ListView.builder | LazyColumn |
| 条件分岐 | { condition && <Component/> } | if (condition) Widget() | if (condition) Composable() |
| スタイル | CSS, styled-components | TextStyle, BoxDecoration | Modifier |
| 副作用 | useEffect | initState/dispose | LaunchedEffect/DisposableEffect |
| コンテキスト | Context API | InheritedWidget | CompositionLocal |
| ナビゲーション | React Router | Navigator | Navigation Compose |

## UIコンポーネントの定義

### React

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

### Flutter

```dart
class Greeting extends StatelessWidget {
  final String name;

  const Greeting({required this.name});

  @override
  Widget build(BuildContext context) {
    return Text('Hello, $name!');
  }
}
```

### Jetpack Compose

```kotlin
@Composable
fun Greeting(name: String) {
    Text("Hello, $name!")
}
```

::: tip
ComposeはReactと同様に関数ベースで、Flutterよりも簡潔に書けます。
:::

## 状態管理

### React (Hooks)

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### Flutter

```dart
class Counter extends StatefulWidget {
  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: $count'),
        ElevatedButton(
          onPressed: () => setState(() { count++; }),
          child: Text('Increment'),
        ),
      ],
    );
  }
}
```

### Jetpack Compose

```kotlin
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }

    Column {
        Text("Count: $count")
        Button(onClick = { count++ }) {
            Text("Increment")
        }
    }
}
```

::: tip
Composeの`remember`はReactの`useState`に非常に近い概念です。
:::

## レイアウト

### React (Flexbox)

```jsx
<div style={{ display: 'flex', flexDirection: 'column' }}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Flutter

```dart
Column(
  children: [
    Text('Item 1'),
    Text('Item 2'),
    Text('Item 3'),
  ],
)
```

### Jetpack Compose

```kotlin
Column {
    Text("Item 1")
    Text("Item 2")
    Text("Item 3")
}
```

## リスト表示

### React

```jsx
function ItemList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### Flutter

```dart
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text(items[index].name),
    );
  },
)
```

### Jetpack Compose

```kotlin
LazyColumn {
    items(itemsList) { item ->
        Text(item.name)
    }
}
```

## スタイリング / Modifier

### React (CSS-in-JS)

```jsx
<button
  style={{
    padding: '16px',
    backgroundColor: 'blue',
    borderRadius: '8px'
  }}
>
  Click me
</button>
```

### Flutter

```dart
Container(
  padding: EdgeInsets.all(16),
  decoration: BoxDecoration(
    color: Colors.blue,
    borderRadius: BorderRadius.circular(8),
  ),
  child: Text('Click me'),
)
```

### Jetpack Compose

```kotlin
Button(
    onClick = { /* ... */ },
    modifier = Modifier
        .padding(16.dp)
        .background(Color.Blue)
        .clip(RoundedCornerShape(8.dp))
) {
    Text("Click me")
}
```

::: tip
ComposeのModifierはFlutterのWidgetラッピングよりも読みやすく、チェーン可能です。
:::

## 副作用 (Side Effects)

### React (useEffect)

```jsx
useEffect(() => {
  // マウント時の処理
  const timer = setInterval(() => {
    console.log('tick');
  }, 1000);

  // クリーンアップ
  return () => clearInterval(timer);
}, []);
```

### Flutter

```dart
@override
void initState() {
  super.initState();
  timer = Timer.periodic(Duration(seconds: 1), (timer) {
    print('tick');
  });
}

@override
void dispose() {
  timer.cancel();
  super.dispose();
}
```

### Jetpack Compose

```kotlin
LaunchedEffect(Unit) {
    while (true) {
        delay(1000)
        println("tick")
    }
}

// またはクリーンアップが必要な場合
DisposableEffect(Unit) {
    val timer = Timer()
    timer.schedule(/* ... */)

    onDispose {
        timer.cancel()
    }
}
```

## 条件付きレンダリング

### React

```jsx
{isLoggedIn && <UserProfile />}
{isLoggedIn ? <UserProfile /> : <LoginButton />}
```

### Flutter

```dart
if (isLoggedIn) UserProfile()

// または
isLoggedIn ? UserProfile() : LoginButton()
```

### Jetpack Compose

```kotlin
if (isLoggedIn) {
    UserProfile()
}

// または
if (isLoggedIn) UserProfile() else LoginButton()
```

## イベントハンドリング

### React

```jsx
<button onClick={() => handleClick()}>
  Click me
</button>
```

### Flutter

```dart
ElevatedButton(
  onPressed: () => handleClick(),
  child: Text('Click me'),
)
```

### Jetpack Compose

```kotlin
Button(onClick = { handleClick() }) {
    Text("Click me")
}
```

## フォーム入力

### React

```jsx
const [text, setText] = useState('');

<input
  value={text}
  onChange={(e) => setText(e.target.value)}
/>
```

### Flutter

```dart
final controller = TextEditingController();

TextField(
  controller: controller,
  onChanged: (value) { /* ... */ },
)
```

### Jetpack Compose

```kotlin
var text by remember { mutableStateOf("") }

TextField(
    value = text,
    onValueChange = { text = it }
)
```

## 主な違いと注意点

### 1. 型安全性

ComposeはKotlinの強力な型システムを活用します。ReactのTypeScriptやFlutterのDartと同様に、コンパイル時に多くのエラーを検出できます。

### 2. null安全性

KotlinはNull安全性が組み込まれており、NullPointerExceptionを防ぎます。

```kotlin
var name: String = "Hello"  // null不可
var nullableName: String? = null  // null許容
```

### 3. 再構築 (Recomposition)

ReactのVirtual DOMやFlutterのWidget treeと同様に、Composeも効率的な差分更新を行いますが、より細かい粒度で最適化されています。

### 4. プレビュー機能

Android Studioで`@Preview`アノテーションを使うと、エミュレータなしでUIをプレビューできます。

```kotlin
@Preview
@Composable
fun PreviewGreeting() {
    Greeting("World")
}
```

## 学習の進め方

1. **Kotlin基礎を習得** - 言語の基本をまず理解する
2. **Composableの概念** - UIコンポーネントの作り方を学ぶ
3. **State管理** - ReactのHooksと同様の概念を理解
4. **実践** - 簡単なアプリを作って練習

次は[環境セットアップ](/guide/setup)または[Kotlin基礎](/guide/kotlin-basics)に進みましょう！
