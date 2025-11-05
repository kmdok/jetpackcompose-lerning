# Kotlin基礎

KotlinはGoogleが推奨するAndroid開発の公式言語です。モダンで安全、かつ表現力豊かな言語です。

## 変数宣言

### val と var

```kotlin
val name = "John"      // 不変 (変更不可)
var age = 25           // 可変 (変更可能)

age = 26               // OK
name = "Jane"          // エラー: valは再代入不可
```

::: tip React/JavaScriptとの比較
- `val` = `const`
- `var` = `let`
:::

### 型推論と型注釈

```kotlin
val name = "John"              // 型推論: String
val age: Int = 25              // 型注釈
val price = 19.99              // 型推論: Double
val isActive: Boolean = true   // 明示的な型指定
```

## 基本的な型

```kotlin
val integer: Int = 42
val long: Long = 42L
val double: Double = 3.14
val float: Float = 3.14f
val boolean: Boolean = true
val char: Char = 'A'
val string: String = "Hello"
```

## 文字列

### 文字列テンプレート

```kotlin
val name = "John"
val age = 25

// JavaScript/Dartのテンプレートリテラルと同様
val message = "My name is $name and I'm $age years old"
val calculation = "Next year I'll be ${age + 1}"
```

::: tip
- JavaScript: `` `Hello ${name}` ``
- Dart: `"Hello $name"`
- Kotlin: `"Hello $name"`
:::

### 複数行文字列

```kotlin
val multiline = """
    Hello
    World
    Jetpack Compose
""".trimIndent()
```

## null安全性

Kotlinの最大の特徴の一つがnull安全性です。

### null許容型

```kotlin
var name: String = "John"
name = null  // エラー: nullは代入できない

var nullableName: String? = "John"
nullableName = null  // OK: ?を付けるとnull許容
```

### 安全な呼び出し

```kotlin
val name: String? = null

// 安全な呼び出し演算子 ?.
val length = name?.length  // nameがnullならnullを返す

// エルビス演算子 ?:
val length = name?.length ?: 0  // nameがnullなら0を返す

// !! 演算子 (非推奨: 使用注意)
val length = name!!.length  // nullならNullPointerException
```

::: tip TypeScript/Dartとの比較
```typescript
// TypeScript
const length = name?.length ?? 0;

// Dart
final length = name?.length ?? 0;

// Kotlin
val length = name?.length ?: 0
```
:::

## 関数

### 基本的な関数

```kotlin
fun greet(name: String): String {
    return "Hello, $name!"
}

// 単一式関数（型推論）
fun greet(name: String) = "Hello, $name!"

// デフォルト引数
fun greet(name: String = "World") = "Hello, $name!"
```

### 名前付き引数

```kotlin
fun createUser(name: String, age: Int, email: String) {
    // ...
}

// 名前付き引数で呼び出し
createUser(
    name = "John",
    age = 25,
    email = "john@example.com"
)

// 順序を変えてもOK
createUser(
    email = "john@example.com",
    name = "John",
    age = 25
)
```

::: tip
FlutterのWidgetコンストラクタと同じ感覚で使えます！
:::

## ラムダ式

### 基本構文

```kotlin
// 通常のラムダ
val sum = { a: Int, b: Int -> a + b }
val result = sum(3, 5)  // 8

// 型推論
val numbers = listOf(1, 2, 3, 4, 5)
val doubled = numbers.map { it * 2 }  // [2, 4, 6, 8, 10]
```

### 末尾ラムダ (Trailing Lambda)

Kotlinの重要な機能で、Jetpack Composeでも頻繁に使います。

```kotlin
// 通常の書き方
Button(onClick = { println("Clicked") })

// 末尾ラムダ（最後の引数がラムダの場合）
Button(onClick = {
    println("Clicked")
})

// さらにラムダが唯一の引数の場合、括弧を省略可能
items.forEach { item ->
    println(item)
}
```

::: tip React/Flutterとの比較
```jsx
// React
<Button onClick={() => console.log("Clicked")}>

// Flutter
ElevatedButton(
  onPressed: () => print("Clicked"),
  child: Text("Click"),
)

// Compose
Button(onClick = { println("Clicked") }) {
    Text("Click")
}
```
:::

### it パラメータ

単一パラメータのラムダでは`it`が使えます。

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

// itを使用
val doubled = numbers.map { it * 2 }

// 明示的なパラメータ名
val doubled = numbers.map { number -> number * 2 }
```

## クラス

### 基本的なクラス

```kotlin
class User(val name: String, var age: Int) {
    fun greet() = "Hello, I'm $name"
}

val user = User("John", 25)
println(user.name)     // John
println(user.greet())  // Hello, I'm John
user.age = 26          // OK: varなので変更可能
```

### データクラス

データを保持するだけのクラスに最適です。

```kotlin
data class User(
    val id: Int,
    val name: String,
    val email: String
)

val user = User(1, "John", "john@example.com")

// 自動生成されるメソッド
println(user.toString())  // User(id=1, name=John, email=john@example.com)

// copy（不変性を保ちながら一部を変更）
val updatedUser = user.copy(name = "Jane")
```

::: tip
データクラスは自動的に以下を生成：
- `equals()` / `hashCode()`
- `toString()`
- `copy()`
- 分解宣言のサポート
:::

### 分解宣言

```kotlin
data class Point(val x: Int, val y: Int)

val point = Point(10, 20)
val (x, y) = point  // 分解宣言
println("x: $x, y: $y")
```

## コレクション

### List

```kotlin
// 不変リスト
val numbers = listOf(1, 2, 3, 4, 5)

// 可変リスト
val mutableNumbers = mutableListOf(1, 2, 3)
mutableNumbers.add(4)

// 操作
val doubled = numbers.map { it * 2 }
val evens = numbers.filter { it % 2 == 0 }
val sum = numbers.sum()
```

### Map

```kotlin
val ages = mapOf(
    "John" to 25,
    "Jane" to 30,
    "Bob" to 35
)

val johnAge = ages["John"]  // 25

// 可変Map
val mutableAges = mutableMapOf("John" to 25)
mutableAges["Jane"] = 30
```

## when式（switch文）

```kotlin
fun describe(obj: Any) = when (obj) {
    1 -> "One"
    "Hello" -> "Greeting"
    is Long -> "Long number"
    !is String -> "Not a string"
    else -> "Unknown"
}

// 値の範囲
fun checkAge(age: Int) = when (age) {
    in 0..12 -> "Child"
    in 13..19 -> "Teenager"
    in 20..64 -> "Adult"
    else -> "Senior"
}
```

## スコープ関数

Kotlinの便利な機能で、オブジェクトのコンテキスト内でコードを実行します。

### let

```kotlin
val name: String? = "John"
name?.let {
    println("Name is $it")
}
```

### apply

オブジェクトの設定に便利です。

```kotlin
val user = User("John", 25).apply {
    age = 26
    // thisはUser自身
}
```

### also

```kotlin
val numbers = mutableListOf(1, 2, 3)
    .also { println("Initial: $it") }
    .apply { add(4) }
    .also { println("After add: $it") }
```

## 拡張関数

既存のクラスに新しいメソッドを追加できます。

```kotlin
fun String.addExclamation() = "$this!"

val greeting = "Hello".addExclamation()  // "Hello!"
```

## 実践的な例

### ユーザーデータの処理

```kotlin
data class User(
    val id: Int,
    val name: String,
    val email: String?,
    val age: Int
)

val users = listOf(
    User(1, "John", "john@example.com", 25),
    User(2, "Jane", null, 30),
    User(3, "Bob", "bob@example.com", 17)
)

// 成人ユーザーのメールアドレスリスト
val adultEmails = users
    .filter { it.age >= 18 }
    .mapNotNull { it.email }
    .map { it.lowercase() }

println(adultEmails)  // [john@example.com, bob@example.com]
```

## 次のステップ

Kotlinの基礎を学んだら、Jetpack Composeの学習に進みましょう！

- [Composableとは](/guide/composables) - Composeの基本
- [Kotlin関数とラムダ](/guide/kotlin-functions) - より深く学ぶ
