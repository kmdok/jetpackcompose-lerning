# Kotlinクラスとデータクラス

Kotlinのクラスとオブジェクト指向の概念を学びます。

## 基本的なクラス

```kotlin
class Person(val name: String, var age: Int) {
    fun introduce() = "I'm $name, $age years old"
}

val person = Person("John", 25)
println(person.introduce())
```

## データクラス

データを保持するだけのクラスに最適です。

```kotlin
data class User(
    val id: Int,
    val name: String,
    val email: String
)
```

### 自動生成されるメソッド

- `equals()` / `hashCode()`
- `toString()`
- `copy()`
- `componentN()`（分解宣言用）

```kotlin
val user1 = User(1, "John", "john@example.com")
val user2 = user1.copy(name = "Jane")

println(user1)  // User(id=1, name=John, email=john@example.com)
```

## プロパティ

### getter/setter

```kotlin
class Person(val firstName: String, val lastName: String) {
    val fullName: String
        get() = "$firstName $lastName"

    var age: Int = 0
        set(value) {
            if (value >= 0) {
                field = value
            }
        }
}
```

## コンストラクタ

### プライマリコンストラクタ

```kotlin
class Person(val name: String, var age: Int)
```

### セカンダリコンストラクタ

```kotlin
class Person(val name: String) {
    var age: Int = 0

    constructor(name: String, age: Int) : this(name) {
        this.age = age
    }
}
```

## 継承

```kotlin
open class Animal(val name: String) {
    open fun sound() = "Some sound"
}

class Dog(name: String) : Animal(name) {
    override fun sound() = "Woof!"
}
```

## インターフェース

```kotlin
interface Clickable {
    fun click()
    fun showOff() = println("I'm clickable!")  // デフォルト実装
}

class Button : Clickable {
    override fun click() = println("Button clicked")
}
```

## オブジェクト

### Singletonオブジェクト

```kotlin
object DatabaseManager {
    fun connect() {
        println("Connected to database")
    }
}

DatabaseManager.connect()
```

### Companionオブジェクト

```kotlin
class User(val name: String) {
    companion object {
        fun create(name: String): User {
            return User(name)
        }
    }
}

val user = User.create("John")
```

## sealed class

限定された継承階層を表現します。

```kotlin
sealed class Result {
    data class Success(val data: String) : Result()
    data class Error(val message: String) : Result()
    object Loading : Result()
}

fun handleResult(result: Result) = when (result) {
    is Result.Success -> println("Data: ${result.data}")
    is Result.Error -> println("Error: ${result.message}")
    Result.Loading -> println("Loading...")
}
```

::: tip
sealed classはUIの状態管理に非常に有用です！
:::

## 公式ドキュメント参考リンク

- [Kotlin Classes](https://kotlinlang.org/docs/classes.html)
- [Data Classes](https://kotlinlang.org/docs/data-classes.html)
- [Sealed Classes](https://kotlinlang.org/docs/sealed-classes.html)

## 次のステップ

- [null安全性](/guide/kotlin-null-safety)
- [Composableとは](/guide/composables)
