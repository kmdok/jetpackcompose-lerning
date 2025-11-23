# Module 2: Composeのメンタルモデル

**ゴール**: ComposeがUIを描画する仕組み、Flutter/Reactとの違い、そして「再コンポジション」の魔法を理解する。

🔗 **公式ドキュメント (日本語)**:
*   [Compose のメンタルモデル](https://developer.android.com/jetpack/compose/mental-model?hl=ja)
*   [コンポーザブルのライフサイクル](https://developer.android.com/jetpack/compose/lifecycle?hl=ja)

---

## 1. 宣言的UI: パラダイムシフト
*   **従来 (XML)**: 命令的。`view.setText()` でViewを書き換える。
*   **Compose**: 宣言的。`Text("Hello")`。ある状態におけるUIを記述する。

### 関数こそがViewである
UIコンポーネントは `@Composable` が付いたただの関数です。

```kotlin
@Composable
fun Greeting(name: String) {
    Text(text = "Hello $name")
}
```

> [!NOTE]
> **比較**:
> *   **React (TS)**: 関数コンポーネント (`const Greeting = ({name}: {name: string}) => { ... }`)。
> *   **Flutter**: `StatelessWidget` / `StatefulWidget` クラス。
> ComposeはFlutter(クラスベース)よりもReact(関数ベース)に近いです。

---

## 2. UIツリーと3つのフェーズ
Composeは1フレームを描画するために3つのフェーズを経ます。

1.  **コンポジション (Composition)**: 「何を表示するか」。関数を実行し、UIツリーを構築/更新する。
2.  **レイアウト (Layout)**: 「どこに配置するか」。サイズを測り、配置する。
3.  **描画 (Drawing)**: 「どう描くか」。ピクセルを描画する。

🔗 [Compose のフェーズ (JP)](https://developer.android.com/jetpack/compose/phases?hl=ja)

---

## 3. 再コンポジション (Recomposition): 核となる仕組み
**再コンポジション** = 入力が変化したとき、関数を再実行すること。

### スマートな再コンポジション
Composeは賢く、引数が変わっていない関数は**スキップ**します。

```kotlin
@Composable
fun Profile(user: User) {
    // user.nameが変わっていなければスキップされる
    Header(user.name) 
}
```

### 位置によるメモ化 (`remember`)
関数は実行されるたびにローカル変数がリセットされます。値を保持するには `remember` を使います。

*   **React**: `useMemo`, `useState`.
*   **Flutter**: `State` オブジェクト.
*   **Compose**: `remember`.

```kotlin
@Composable
fun Counter() {
    // 再コンポジションされても値が保持される
    val count = remember { mutableStateOf(0) } 
}
```

🔗 [状態と Jetpack Compose (JP)](https://developer.android.com/jetpack/compose/state?hl=ja)

---

## 4. Widgetツリー vs Slot API
Composeは内部的に「スロットテーブル」を使いますが、APIはツリーのように見えます。

### Slot API (子要素の渡し方)
Flutterの `child` の代わりに、末尾のラムダ式を使います。

```kotlin
// Flutter: child: Text("Hi")
// Compose:
Box {
    Text("Hi")
}
```

---

## 5. Modifier: 万能の属性
*   **Flutter**: Widgetでラップする (`Padding(child: ...)`).
*   **Compose**: Modifierをチェーンする。

```kotlin
Text(
    text = "Hello",
    modifier = Modifier
        .padding(16.dp)
        .background(Color.Red)
        .clickable { ... }
)
```

> [!WARNING]
> **順序が重要**:
> `padding` -> `background` = 背景の外側にパディング。
> `background` -> `padding` = 背景の内側にパディング。

🔗 [Modifier (JP)](https://developer.android.com/jetpack/compose/modifiers?hl=ja)

---

## 🛑 理解度チェック

### クイズ 1: 再コンポジション
```kotlin
@Composable
fun Screen() {
    var count = 0 // 間違い！
    Button(onClick = { count++ }) {
        Text("$count")
    }
}
```
ボタンをクリックしました。表示は？
*   A) "1"
*   B) "0"

<details>
<summary>答え</summary>

**B) "0"**。
`count` は State ではなく、`remember` もされていないため、再コンポジションのたびに 0 にリセットされます（そもそも再コンポジションがトリガーされません）。

</details>

### クイズ 2: Modifier
Flutterの `GestureDetector(child: Padding(...))` をComposeで書くと？

<details>
<summary>答え</summary>

`Modifier.clickable { }.padding(...)`
(クリック領域を広げたいなら padding の前に clickable)

</details>

### クイズ 3: 3つのフェーズ
色のアニメーションだけを行う場合、実行されるフェーズは？
*   A) 全て
*   B) 描画 (Drawing) のみ

<details>
<summary>答え</summary>

**B) 描画 (Drawing) のみ** (最適化されている場合)。

</details>
