# Module 19: Hiltと統合テスト

**ゴール**: DI (Hilt) を使ったアプリの統合テストを行い、本番に近い環境で動作を保証する。

🔗 **公式ドキュメント (日本語)**:
*   [Hilt を使用したアプリのテスト](https://developer.android.com/training/dependency-injection/hilt-testing?hl=ja)

---

## 1. Hiltのテストセットアップ
Hiltを使ったActivityやFragmentをテストするには、特別な設定が必要です。

1.  `@HiltAndroidTest` アノテーションをつける。
2.  `HiltAndroidRule` を追加する。
3.  `hiltRule.inject()` を呼ぶ。

```kotlin
@HiltAndroidTest
class MainActivityTest {
    @get:Rule(order = 0)
    val hiltRule = HiltAndroidRule(this)

    @get:Rule(order = 1)
    val composeRule = createAndroidComposeRule<MainActivity>()

    @Test
    fun verifyInjection() {
        hiltRule.inject()
        // ...
    }
}
```

---

## 2. 依存関係の差し替え (Fake vs Mock)
統合テストでは、ネットワーク通信などの不安定な要素を **Fake (偽物)** に差し替えるのが一般的です。

### Fakeの作成
インターフェースを実装した、メモリ上で動くクラスを作ります。

```kotlin
class FakeUserRepository : UserRepository {
    private val users = mutableListOf<User>()
    
    override suspend fun getUser(id: String): User {
        return users.find { it.id == id } ?: throw Exception("Not found")
    }
}
```

### モジュールの置換 (`@TestInstallIn`)
本番用のHiltモジュールを、テスト用のモジュールで丸ごと置き換えます。

```kotlin
@Module
@TestInstallIn(
    components = [SingletonComponent::class],
    replaces = [DataModule::class] // 本番用モジュール
)
object TestDataModule {
    @Provides
    fun provideUserRepository(): UserRepository = FakeUserRepository()
}
```

これにより、テスト実行時は自動的に `FakeUserRepository` が注入されます。

---

## 3. End-to-End (E2E) テスト
HiltとComposeTestRuleを組み合わせることで、アプリの起動から終了までのシナリオテストが可能になります。

```kotlin
@Test
fun loginFlow() {
    // 1. ログイン画面が表示されている
    composeRule.onNodeWithText("Login").assertIsDisplayed()
    
    // 2. ユーザー名とパスワードを入力
    composeRule.onNodeWithTag("username").performTextInput("alice")
    composeRule.onNodeWithTag("password").performTextInput("pass")
    
    // 3. ボタンを押す
    composeRule.onNodeWithText("Submit").performClick()
    
    // 4. ホーム画面に遷移したことを確認 (FakeRepoが成功を返す)
    composeRule.onNodeWithText("Welcome, Alice").assertIsDisplayed()
}
```

---

## 🛑 理解度チェック

### クイズ 1: ルールの順序
`HiltAndroidRule` と `ComposeTestRule` を併用する場合、順序 (`order`) はどうすべき？
*   A) Hiltが先 (0), Composeが後 (1)
*   B) Composeが先 (0), Hiltが後 (1)
*   C) どちらでも良い

<details>
<summary>答え</summary>

**A) Hiltが先**。Activityが起動する前にHiltのコンポーネントが初期化されている必要があるためです。

</details>

### クイズ 2: 差し替え
`@TestInstallIn` を使うメリットは？
*   A) テストコード内で手動で `bind` しなくて済む
*   B) 全てのテストで一括して依存関係を差し替えられる
*   C) 両方

<details>
<summary>答え</summary>

**C) 両方**。グローバルな差し替えが可能になり、ボイラープレートコードが減ります。特定のテストだけで差し替えたい場合は `@UninstallModules` を使います。

</details>

### クイズ 3: Mock vs Fake
統合テストにおいて、MockitoなどのMockよりもFakeクラスが推奨される理由は？
*   A) Fakeの方が動作が高速だから
*   B) Fakeの方が本物のロジックに近い挙動 (状態保持など) を再現でき、テストが堅牢になるから
*   C) MockitoはAndroidで動かないから

<details>
<summary>答え</summary>

**B)**。Mockは振る舞いを都度定義する必要があり、複雑なシナリオでは管理が大変になります。Fakeは「軽量な本物」として振る舞うため、E2Eテストに適しています。

</details>
