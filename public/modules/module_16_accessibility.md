# Module 16: アクセシビリティ (a11y)

**ゴール**: 視覚障がい者や高齢者を含む、全てのユーザーが使えるアプリを作る。TalkBack対応をマスターする。

🔗 **公式ドキュメント (日本語)**:
*   [Compose のアクセシビリティ](https://developer.android.com/jetpack/compose/accessibility?hl=ja)

---

## 1. Semantics (セマンティクス)
ComposeはUIツリーとは別に、**Semantics Tree** を生成します。
アクセシビリティサービス (TalkBackなど) やテストフレームワークは、このツリーを見て画面を理解します。

### 基本的な属性
標準コンポーネント (`Text`, `Button`) は自動的にセマンティクスを持ちますが、カスタム描画や画像には追加が必要です。

```kotlin
Image(
    painter = painterResource(R.drawable.icon),
    contentDescription = "設定を開く" // 必須！装飾用なら null
)
```

### `semantics` Modifier
手動で情報を追加・上書きします。

```kotlin
Box(
    modifier = Modifier
        .clickable { ... }
        .semantics {
            role = Role.Button
            contentDescription = "再生"
            stateDescription = "停止中"
        }
)
```

---

## 2. タッチターゲットサイズ
ボタンなどの操作可能な要素は、最低でも **48x48dp** のサイズが必要です。
見た目は小さくても、タッチ領域は大きく確保します。

```kotlin
IconButton(onClick = { ... }) {
    Icon(...) // アイコン自体は24dpでも、IconButtonが48dpを確保してくれる
}
```

---

## 3. マージ (MergeDescendants)
複数の要素をまとめて1つの読み上げ対象にします。
例えば、記事のタイトルと日付を別々に読むのではなく、まとめて読ませたい場合。

```kotlin
Row(modifier = Modifier.semantics(mergeDescendants = true) { }) {
    Text("タイトル")
    Text("日付")
}
```

---

## 🛑 理解度チェック

### クイズ 1: 画像
装飾用の画像 (背景パターンなど) の `contentDescription` はどうすべき？
*   A) "背景画像" と書く
*   B) 空文字 "" にする
*   C) `null` にする

<details>
<summary>答え</summary>

**C) `null` にする**。そうするとTalkBackはその画像をスキップします。

</details>

### クイズ 2: カスタムボタン
`Box` を `clickable` にしてボタンを作った。TalkBackはこれをどう読み上げる？
*   A) 「ボタン、[テキスト]」
*   B) 単にテキストだけ読み上げる (ボタンだと認識されない)

<details>
<summary>答え</summary>

**B)**。`Role.Button` が設定されていないため、ユーザーはそれがクリック可能か分かりにくいです。`Modifier.semantics { role = Role.Button }` を追加すべきです。

</details>

### クイズ 3: テスト
Semantics Treeはアクセシビリティ以外に何に使われる？
*   A) レイアウト計算
*   B) UIテスト (`composeTestRule`)
*   C) ネットワーク通信

<details>
<summary>答え</summary>

**B) UIテスト**。`onNodeWithText` などはSemantics Treeを検索しています。

</details>
