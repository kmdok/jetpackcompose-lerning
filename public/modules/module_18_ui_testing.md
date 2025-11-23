# Module 18: UIテスト (Compose)

**ゴール**: 画面の表示、クリック動作、そして見た目 (スクリーンショット) のテストを自動化する。

🔗 **公式ドキュメント (日本語)**:
*   [Compose レイアウトのテスト](https://developer.android.com/jetpack/compose/testing?hl=ja)

---

## 1. ComposeTestRule
UIテストのエントリーポイントです。

```kotlin
class MyScreenTest {
    @get:Rule
    val composeTestRule = createComposeRule()

    @Test
    fun showHello() {
        composeTestRule.setContent {
            MyScreen("World")
        }

        // 検証
        composeTestRule
            .onNodeWithText("Hello World")
            .assertIsDisplayed()
    }
}
```

---

## 2. Finder, Matcher, Action
Semantics Tree を検索し、操作します。

### Finder (探す)
*   `onNodeWithText("Login")`
*   `onNodeWithContentDescription("Settings")`
*   `onNodeWithTag("MyList")` (`Modifier.testTag` が必要)

### Matcher (検証する)
*   `assertIsDisplayed()`
*   `assertIsEnabled()`
*   `assertTextEquals("Success")`

### Action (操作する)
*   `performClick()`
*   `performTextInput("password")`
*   `performScrollTo()`

```kotlin
composeTestRule
    .onNodeWithText("Login")
    .performClick()

composeTestRule
    .onNodeWithText("Welcome")
    .assertIsDisplayed()
```

---

## 3. スクリーンショットテスト (VRT)
レイアウト崩れを防ぐため、画面のキャプチャを撮って正解画像と比較します。
標準ライブラリには含まれていないため、**Roborazzi** や **Paparazzi** を使います。

```kotlin
@Test
fun captureScreen() {
    composeTestRule.setContent { MyScreen() }
    
    // Roborazziの例
    composeTestRule
        .onRoot()
        .captureRoboImage()
}
```

> [!TIP]
> **Roborazzi** はRobolectric (JVM) 上で動くため、エミュレータなしで高速にスクリーンショットテストが可能です。CIでの実行に最適です。

---

## 🛑 理解度チェック

### クイズ 1: 要素の特定
ボタンにテキストがなく、アイコンしかない場合、どうやってテストで特定する？
*   A) `onNodeWithText`
*   B) `onNodeWithContentDescription`
*   C) 座標を指定する

<details>
<summary>答え</summary>

**B) `onNodeWithContentDescription`**。アクセシビリティのためにも設定されているはずです。または `Modifier.testTag` を使います。

</details>

### クイズ 2: 非同期待機
ボタンを押してAPI通信中、ローディングが表示されるのを待ちたい。どうする？
*   A) `Thread.sleep(1000)`
*   B) `composeTestRule.waitUntil { ... }`
*   C) 自動で待ってくれる

<details>
<summary>答え</summary>

**C) 自動で待ってくれる** (基本的には)。ComposeTestRuleはUIがアイドル状態になるのを自動で待ちます。ただし、独自のアニメーションや長時間処理の場合は `waitUntil` が必要なこともあります。

</details>

### クイズ 3: 実行環境
`createComposeRule` を使ったテストはどこで動く？
*   A) JVM (ローカルPC) のみ
*   B) Android端末 / エミュレータ (androidTest)
*   C) どちらでも動く

<details>
<summary>答え</summary>

**B) Android端末 / エミュレータ** (`androidTest` フォルダ)。ただし、Robolectricを使えばJVM (`test` フォルダ) でも動かせます。

</details>
