# Module 1: Java/Dart開発者のためのKotlin速習

**ゴール**: Java/Dartの知識を活かして、Jetpack Composeで頻出するKotlinの機能をマスターする。

🔗 **公式ドキュメント (日本語)**:
*   [Android 向け Kotlin](https://developer.android.com/kotlin?hl=ja)
*   [よく使われる Kotlin のパターン](https://developer.android.com/kotlin/common-patterns?hl=ja)

---

## 1. 基本: 構文とNull安全性

### `val` vs `var`
*   **Java**: `final String` vs `String`
*   **Dart**: `final` vs `var`
*   **TypeScript**: `const` vs `let`
*   **Kotlin**:
    *   `val`: 読み取り専用 (再代入不可)。**基本はこれを使う**。
    *   `var`: 可変。

### Null安全性: "?" の魔法
DartのNull SafetyやTypeScriptのStrict Null Checksと似ています。
*   `String`: Null不可。
*   `String?`: Null許容 (TSの `string | null` または `string | undefined`)。

```kotlin
// Kotlin
val name: String = "Antigravity"
// val name: String = null // コンパイルエラー

val nullable: String? = null
// 安全な呼び出し + Elvis演算子 (Dart/TSの ?? と同じ)
val len = nullable?.length ?: 0 
```

🔗 [Null 安全性 (JP)](https://developer.android.com/kotlin/null-safety?hl=ja)

### Data Classes
Dartの `freezed` や Javaの `Record` に相当します。

```kotlin
data class User(
    val id: String, 
    val name: String
)

val u1 = User("1", "Alice")
val u2 = u1.copy(name = "Bob") // copyメソッドが自動生成される！
```

> [!NOTE]
> `equals`, `hashCode`, `toString`, `copy` が自動生成されます。アノテーション処理は不要です。

---

## 2. 関数型プログラミングと拡張関数

### 拡張関数 (Extension Functions)
継承を使わずに、既存のクラスにメソッドを追加できます。

```kotlin
fun String.addBang(): String = "$this!"
val excited = "Hi".addBang() // "Hi!"
```

### スコープ関数
Kotlin特有のイディオムです。Composeでは頻出します。

| 関数 | Context | 戻り値 | 用途 |
| :--- | :--- | :--- | :--- |
| `let` | `it` | Lambdaの結果 | Nullチェック: `name?.let { ... }` |
| `apply` | `this` | Context自身 | 初期化・設定: `Dialog().apply { ... }` |
| `also` | `it` | Context自身 | 副作用 (ログ出力など) |

**クイズ 1: スコープ関数**
```kotlin
val user = User("1", "Alice").apply {
    // ここでの 'this' は何？
    // この式は何を返す？
}
```
<details>
<summary>答え</summary>

`this` は Userオブジェクト。式全体も Userオブジェクトを返す（初期化に便利）。

</details>

🔗 [スコープ関数 (JP)](https://kotlinlang.org/docs/scope-functions.html)

---

## 3. Coroutines: 非同期処理エンジン

### `suspend` キーワード
関数を「一時停止」と「再開」できるようにします。`Future`のようなラッパー型は使いません。

```kotlin
// Kotlin
suspend fun fetchUser(): User { ... }
```

> [!IMPORTANT]
> **メンタルモデルの転換**: `suspend` 関数は `T` を直接返しますが、必ずコルーチンまたは別の `suspend` 関数の中から呼び出す必要があります。

### コルーチンの起動 (Builders)
コルーチンを開始するための関数を **Builder** と呼びます。主に以下の3つを使います。

#### 1. `launch`: Fire-and-Forget (投げっぱなし)
*   **戻り値**: `Job` (結果を返さない)。
*   **用途**: 画面更新、ログ送信など、結果を待つ必要がない処理。
*   **例外**: クラッシュします (try-catchが必要)。

```kotlin
viewModelScope.launch {
    // 結果を返さない。処理が終わるのを待つだけ。
    updateUI() 
}
```

#### 2. `async`: 結果を待つ
*   **戻り値**: `Deferred<T>` (Future/Promiseのようなもの)。
*   **用途**: 並列処理して結果を受け取りたい場合。
*   **例外**: `await()` した瞬間に投げられます。

```kotlin
viewModelScope.launch {
    // 2つのAPIを並列に叩く
    val deferredUser = async { api.fetchUser() }
    val deferredSettings = async { api.fetchSettings() }

    // 両方終わるのを待つ
    val user = deferredUser.await()
    val settings = deferredSettings.await()
}
```

#### 3. `runBlocking`: スレッドをブロックする (注意！)
*   **用途**: テストコードや、`main` 関数でのみ使用。
*   **Androidアプリのコード内では絶対に使ってはいけません** (UIがフリーズします)。

### Dispatchers (スレッド)
*   `Main`: UIスレッド。
*   `IO`: ネットワーク/ディスクI/O。
*   `Default`: CPU負荷の高い処理。

```kotlin
suspend fun heavy() = withContext(Dispatchers.Default) {
    calculatePi() // バックグラウンドスレッドで実行
}
```

🔗 [コルーチン ガイド (JP)](https://developer.android.com/kotlin/coroutines?hl=ja)

---

## 4. Flows: リアクティブストリーム

### Hot vs Cold
*   **Flow (Cold)**: `collect` するたびに処理が走る。
*   **StateFlow (Hot)**: 最新の値を保持する。**RiverpodのProvider** や **ReactのuseState** に近い。

### StateFlow vs LiveData
現代のAndroid開発では `StateFlow` を使います。

```kotlin
// ViewModel
private val _uiState = MutableStateFlow(UiState.Loading)
val uiState = _uiState.asStateFlow()

fun update() {
    _uiState.value = UiState.Success("Data")
}
```

🔗 [Android での Kotlin Flow (JP)](https://developer.android.com/kotlin/flow?hl=ja)

---

## 🛑 理解度チェック

### クイズ 1: Null安全性
以下のコードを実行するとどうなる？
```kotlin
val list: List<String?> = listOf("A", null)
val len = list[1]?.length ?: -1
```
*   A) NullPointerException
*   B) 0
*   C) -1

<details>
<summary>答え</summary>

**C) -1**。`list[1]` は null。`?.length` も null。Elvis演算子 `?:` で右側の -1 が採用される。

</details>

### クイズ 2: コルーチンコンテキスト
`viewModelScope.launch` (Mainスレッド) 内で重いファイルを読み込む場合、どうすべき？

*   A) そのまま `File.readText()`
*   B) `withContext(Dispatchers.IO)` で囲む
*   C) `withContext(Dispatchers.Main)` で囲む

<details>
<summary>答え</summary>

**B)**。メインスレッドを決してブロックしてはいけない。

</details>

### クイズ 3: Dart vs Kotlin
Dartの `user.copyWith(name: "Dave")` は Kotlinでは？

<details>
<summary>答え</summary>

`user.copy(name = "Dave")`

</details>
