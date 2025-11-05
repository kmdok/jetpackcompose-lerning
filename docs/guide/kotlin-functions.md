# Kotlin関数とラムダ

Kotlinの関数とラムダ式を詳しく学びます。

## 関数の基本

### 基本構文

```kotlin
fun add(a: Int, b: Int): Int {
    return a + b
}
```

### 単一式関数

```kotlin
fun add(a: Int, b: Int) = a + b
```

### デフォルト引数

```kotlin
fun greet(name: String = "World") = "Hello, $name!"

println(greet())          // Hello, World!
println(greet("John"))    // Hello, John!
```

### 名前付き引数

```kotlin
fun createUser(name: String, age: Int, email: String) {
    // ...
}

createUser(
    name = "John",
    email = "john@example.com",
    age = 25
)
```

## ラムダ式

### 基本構文

```kotlin
val sum = { a: Int, b: Int -> a + b }
println(sum(3, 5))  // 8
```

### 型推論

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
val doubled = numbers.map { it * 2 }
```

### 複数行ラムダ

```kotlin
val process = { value: Int ->
    val doubled = value * 2
    val squared = doubled * doubled
    squared  // 最後の式が戻り値
}
```

## 高階関数

関数を引数や戻り値として扱える関数です。

```kotlin
fun operate(a: Int, b: Int, operation: (Int, Int) -> Int): Int {
    return operation(a, b)
}

val result = operate(10, 5) { a, b -> a + b }  // 15
```

## スコープ関数

### let

```kotlin
val name: String? = "John"
name?.let {
    println("Name is $it")
}
```

### apply

```kotlin
val user = User().apply {
    name = "John"
    age = 25
}
```

### also

```kotlin
val numbers = mutableListOf(1, 2, 3)
    .also { println("初期値: $it") }
    .apply { add(4) }
```

### with

```kotlin
val result = with(user) {
    "Name: $name, Age: $age"
}
```

### run

```kotlin
val result = user.run {
    "Name: $name, Age: $age"
}
```

## 拡張関数

既存のクラスに新しいメソッドを追加できます。

```kotlin
fun String.addExclamation() = "$this!"

println("Hello".addExclamation())  // Hello!
```

## インライン関数

パフォーマンス最適化のための機能です。

```kotlin
inline fun measureTime(block: () -> Unit) {
    val start = System.currentTimeMillis()
    block()
    val end = System.currentTimeMillis()
    println("Time: ${end - start}ms")
}
```

## 公式ドキュメント参考リンク

- [Kotlin Functions](https://kotlinlang.org/docs/functions.html)
- [Lambdas](https://kotlinlang.org/docs/lambdas.html)
- [Scope Functions](https://kotlinlang.org/docs/scope-functions.html)

## 次のステップ

- [Kotlinクラス](/guide/kotlin-classes)
- [null安全性](/guide/kotlin-null-safety)
