# Composableとは

Composable関数はJetpack ComposeでUIを構築する基本単位です。ReactのコンポーネントやFlutterのWidgetに相当します。

## 基本構文

```kotlin
@Composable
fun Greeting(name: String) {
    Text("Hello, $name!")
}
```

::: tip
`@Composable`アノテーションを付けることで、関数がUI要素になります。
:::

## React/Flutterとの比較

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

Composeは関数ベースで、Reactに最も近い書き方です。

## Composable関数の特徴

### 1. 関数名は大文字で始める

```kotlin
// ✅ 正しい
@Composable
fun MyButton() { }

// ❌ 間違い
@Composable
fun myButton() { }
```

::: tip
UIコンポーネントは大文字で始める慣習があります（ReactやFlutterと同じ）。
:::

### 2. 戻り値は持たない

```kotlin
@Composable
fun MyComponent() {
    // UIを出力するが、returnは不要
    Text("Hello")
}
```

### 3. 他のComposableから呼び出す

```kotlin
@Composable
fun App() {
    Column {
        Greeting("John")    // Composableを呼び出し
        Greeting("Jane")
    }
}
```

## 基本的なComposable

### Text

```kotlin
@Composable
fun TextExample() {
    Text("Simple text")

    Text(
        text = "Styled text",
        fontSize = 20.sp,
        fontWeight = FontWeight.Bold,
        color = Color.Blue
    )
}
```

### Button

```kotlin
@Composable
fun ButtonExample() {
    Button(onClick = { println("Clicked") }) {
        Text("Click me")
    }
}
```

::: tip
最後の引数がラムダの場合、Kotlinの末尾ラムダ構文で括弧の外に書けます。
:::

### Image

```kotlin
@Composable
fun ImageExample() {
    Image(
        painter = painterResource(id = R.drawable.my_image),
        contentDescription = "説明文"
    )
}
```

## Composableの構成

### 子要素を受け取る

Reactの`children`やFlutterの`child`に相当する仕組みです。

```kotlin
@Composable
fun Card(content: @Composable () -> Unit) {
    Surface(
        shape = RoundedCornerShape(8.dp),
        shadowElevation = 4.dp
    ) {
        content()  // 子要素を表示
    }
}

// 使用例
@Composable
fun App() {
    Card {
        Text("This is inside the card")
    }
}
```

::: tip React/Flutterとの比較
```jsx
// React
function Card({ children }) {
  return <div className="card">{children}</div>;
}

// Flutter
class Card extends StatelessWidget {
  final Widget child;
  Card({required this.child});
}

// Compose
@Composable
fun Card(content: @Composable () -> Unit) {
  content()
}
```
:::

## プレビュー

Android Studioでエミュレータなしにプレビュー可能です。

```kotlin
@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    Greeting("Android")
}
```

### 複数のプレビュー

```kotlin
@Preview(name = "ライトモード", showBackground = true)
@Preview(
    name = "ダークモード",
    uiMode = Configuration.UI_MODE_NIGHT_YES,
    showBackground = true
)
@Composable
fun MultiPreview() {
    MyAppTheme {
        Greeting("Android")
    }
}
```

### インタラクティブモード

プレビューでインタラクティブに操作することも可能です。

```kotlin
@Preview(showBackground = true)
@Composable
fun InteractivePreview() {
    var count by remember { mutableStateOf(0) }

    Button(onClick = { count++ }) {
        Text("Clicked $count times")
    }
}
```

## Composable関数の命名規則

### UIを返す場合

```kotlin
@Composable
fun UserProfile() { }  // 名詞

@Composable
fun LoginScreen() { }  // 名詞
```

### UIを返さない場合（副作用など）

```kotlin
@Composable
fun ObserveUserState() { }  // 動詞

@Composable
fun TrackScreenView() { }  // 動詞
```

## Composableの再利用

### プロパティで柔軟に

```kotlin
@Composable
fun UserCard(
    name: String,
    email: String,
    avatarUrl: String? = null,
    onCardClick: () -> Unit = {}
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onCardClick() }
    ) {
        Row {
            avatarUrl?.let {
                Image(/* ... */)
            }
            Column {
                Text(name, fontWeight = FontWeight.Bold)
                Text(email, fontSize = 14.sp)
            }
        }
    }
}
```

## Composableの階層構造

```kotlin
@Composable
fun App() {
    MyAppTheme {                    // レベル1: テーマ
        Scaffold(                    // レベル2: レイアウト
            topBar = { TopBar() }
        ) { padding ->
            Column(                  // レベル3: コンテナ
                modifier = Modifier.padding(padding)
            ) {
                Greeting("World")    // レベル4: コンテンツ
                Counter()
            }
        }
    }
}
```

## パフォーマンスの考慮

### スキップ可能性 (Skippable)

Composeは賢く、変更のないComposableはスキップされます。

```kotlin
@Composable
fun ExpensiveComponent(data: String) {
    // dataが変わらなければ再構築されない
    Text(data)
}
```

### 安定性 (Stable)

以下の型は「安定」とみなされ、スキップ可能：

- プリミティブ型（Int, String, Boolean等）
- 不変オブジェクト
- `@Stable`アノテーション付きクラス

```kotlin
// ❌ 再構築される可能性が高い
@Composable
fun UserList(users: List<User>) { }

// ✅ ImmutableListなら最適化される
@Composable
fun UserList(users: ImmutableList<User>) { }
```

::: tip
通常は気にしなくてOKですが、パフォーマンスが問題になったら意識しましょう。
:::

## 実践例

### シンプルなプロフィールカード

```kotlin
@Composable
fun ProfileCard(
    name: String,
    bio: String,
    imageUrl: String
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        elevation = CardDefaults.cardElevation(4.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            AsyncImage(
                model = imageUrl,
                contentDescription = null,
                modifier = Modifier
                    .size(80.dp)
                    .clip(CircleShape)
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = name,
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = bio,
                fontSize = 14.sp,
                color = Color.Gray
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
fun ProfileCardPreview() {
    ProfileCard(
        name = "John Doe",
        bio = "Android Developer",
        imageUrl = "https://example.com/avatar.jpg"
    )
}
```

## まとめ

- `@Composable`関数でUIを構築
- 関数名は大文字で始める
- 末尾ラムダで子要素を受け取る
- `@Preview`でエミュレータ不要でプレビュー
- ReactやFlutterと似た考え方

## 次のステップ

- [State管理](/guide/state-management) - 状態の扱い方を学ぶ
- [Modifierの使い方](/guide/modifiers) - スタイリングを学ぶ
- [レイアウト基礎](/guide/layouts) - UIの配置方法を学ぶ
