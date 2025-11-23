# Module 9: ネットワーク通信とシリアライズ

**ゴール**: Retrofitを使ったAPI通信、Kotlinx SerializationによるJSON解析、そして安全なエラーハンドリングを学ぶ。

🔗 **公式ドキュメント (日本語)**:
*   [ネットワーク オペレーションの概要](https://developer.android.com/training/basics/network-ops?hl=ja)
*   [Kotlin Serialization ガイド](https://kotlinlang.org/docs/serialization.html)

---

## 1. Retrofit + OkHttp
Androidのデファクトスタンダードです。
*   **Retrofit**: インターフェースをHTTPクライアントに変換。
*   **OkHttp**: 通信エンジン (ログ、インターセプター)。

### 定義

```kotlin
interface ApiService {
    @GET("users/{id}")
    suspend fun getUser(@Path("id") id: String): UserResponse
}
```

> [!NOTE]
> `suspend` 関数にすることで、Retrofitが自動的にバックグラウンドスレッドで通信を行い、結果を返してくれます。コールバック地獄は不要です。

---

## 2. Kotlinx Serialization
GsonやMoshiに代わる、Kotlin純正のシリアライズライブラリです。
リフレクションを使わず、コンパイル時にコード生成するため高速かつ軽量です。

```kotlin
@Serializable
data class UserResponse(
    val id: String,
    @SerialName("full_name") val name: String, // JSONのキーと違う場合
    val email: String? = null // Null許容
)
```

### Retrofitとの統合
`retrofit2-kotlinx-serialization-converter` を使います。

```kotlin
val json = Json { ignoreUnknownKeys = true } // 知らないキーがあっても無視

val retrofit = Retrofit.Builder()
    .baseUrl("https://api.example.com/")
    .addConverterFactory(json.asConverterFactory("application/json".toMediaType()))
    .build()
```

---

## 3. 安全なエラーハンドリング (Resultパターン)
`try-catch` を毎回書くのは大変です。`runCatching` や独自の `Result` 型を使うと綺麗に書けます。

```kotlin
class UserRepository(private val api: ApiService) {
    suspend fun getUser(id: String): Result<User> {
        return runCatching {
            api.getUser(id).toDomain() // 成功時
        }.onFailure { e ->
            // エラーログ送信など
            Log.e("Repo", "Error", e)
        }
    }
}
```

### ViewModelでの利用

```kotlin
viewModelScope.launch {
    repo.getUser("1")
        .onSuccess { user -> _uiState.value = UiState.Success(user) }
        .onFailure { e -> _uiState.value = UiState.Error(e.message) }
}
```

---

## 4. インターセプター (Interceptor)
OkHttpの機能で、全てのリクエスト/レスポンスに割り込みます。
*   **認証ヘッダーの付与**: `Authorization: Bearer token`
*   **ログ出力**: `HttpLoggingInterceptor`

```kotlin
val authInterceptor = Interceptor { chain ->
    val newRequest = chain.request().newBuilder()
        .addHeader("Authorization", "Bearer $token")
        .build()
    chain.proceed(newRequest)
}

val client = OkHttp.Builder()
    .addInterceptor(authInterceptor)
    .build()
```

---

## 🛑 理解度チェック

### クイズ 1: シリアライズ
JSONに、データクラスに定義されていないフィールドが含まれていた。`Json { ignoreUnknownKeys = false }` (デフォルト) の場合どうなる？
*   A) 無視される
*   B) クラッシュする (SerializationException)

<details>
<summary>答え</summary>

**B) クラッシュする**。APIの変更に強くするために、通常は `ignoreUnknownKeys = true` を設定します。

</details>

### クイズ 2: スレッド
Retrofitの `suspend` 関数をメインスレッド (ViewModelなど) から呼んでもUIはフリーズしない？
*   A) はい
*   B) いいえ

<details>
<summary>答え</summary>

**A) はい**。Retrofitは内部でブロッキングIOをバックグラウンドスレッドで行うように実装されています。

</details>

### クイズ 3: エラー処理
HTTP 404エラーが返ってきた場合、Retrofitはどうする？
*   A) `null` を返す
*   B) 例外 (`HttpException`) を投げる
*   C) 空のオブジェクトを返す

<details>
<summary>答え</summary>

**B) 例外を投げる**。なので `try-catch` や `runCatching` で囲む必要があります。

</details>
