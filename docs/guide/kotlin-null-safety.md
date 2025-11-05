# Kotlinのnull安全性

Kotlinの最大の特徴の一つであるnull安全性を学びます。

## null許容型

```kotlin
var name: String = "John"
name = null  // エラー

var nullableName: String? = "John"
nullableName = null  // OK
```

::: info
型の後に`?`を付けると、null許容型になります。
:::

## 安全な呼び出し演算子 ?.

```kotlin
val name: String? = null
val length = name?.length  // nullならnullを返す
```

## エルビス演算子 ?:

```kotlin
val name: String? = null
val length = name?.length ?: 0  // nullなら0を返す
```

## 非null表明演算子 !!

```kotlin
val name: String? = "John"
val length = name!!.length  // nullならNullPointerException
```

::: warning
`!!`は使用を避け、他の方法を検討しましょう。
:::

## let関数との組み合わせ

```kotlin
val name: String? = "John"

name?.let {
    println("Name is $it")
    println("Length is ${it.length}")
}
```

## 安全なキャスト as?

```kotlin
val obj: Any = "Hello"
val str: String? = obj as? String  // 失敗したらnull
```

## Nullチェック

```kotlin
fun processName(name: String?) {
    if (name != null) {
        // この中では name は String型（非null）として扱える
        println(name.length)
    }
}
```

## lateinit

初期化を遅延させたいが、nullは許容したくない場合に使用します。

```kotlin
class MyClass {
    lateinit var name: String

    fun initialize() {
        name = "John"
    }

    fun printName() {
        if (::name.isInitialized) {
            println(name)
        }
    }
}
```

::: warning
`lateinit`はvarのみで使用可能で、プリミティブ型には使えません。
:::

## lazy

遅延初期化でvalに使用します。

```kotlin
val heavyObject: ExpensiveObject by lazy {
    println("Initializing...")
    ExpensiveObject()
}
```

## 実践例

```kotlin
data class User(
    val id: Int,
    val name: String,
    val email: String?
)

fun sendEmail(user: User) {
    user.email?.let { email ->
        println("Sending email to $email")
    } ?: println("No email address")
}

// 使用例
val user1 = User(1, "John", "john@example.com")
val user2 = User(2, "Jane", null)

sendEmail(user1)  // Sending email to john@example.com
sendEmail(user2)  // No email address
```

## 公式ドキュメント参考リンク

- [Null Safety](https://kotlinlang.org/docs/null-safety.html)

## 次のステップ

- [Composableとは](/guide/composables)
- [State管理](/guide/state-management)
