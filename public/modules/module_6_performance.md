# Module 6: パフォーマンスと高度なレイアウト

**ゴール**: 「カクつく」アプリを卒業し、Composeのレンダリングを極限まで最適化する。

🔗 **公式ドキュメント (日本語)**:
*   [Compose のパフォーマンス](https://developer.android.com/jetpack/compose/performance?hl=ja)
*   [安定性 (Stability)](https://developer.android.com/jetpack/compose/performance/stability?hl=ja)

---

## 1. 安定性 (Stability) とスキップ
Composeは引数が「変更されていない」と判断できた場合のみ、再コンポジションをスキップします。

### 安定 (Stable) な型
*   プリミティブ型 (Int, String...)
*   関数 (Lambda)
*   全てのプロパティが `val` で、かつ中身も Stable なクラス。

### 不安定 (Unstable) な型
*   `var` を含むクラス。
*   `List`, `Map` などのコレクション (インターフェースなので中身が可変かもしれない)。
*   **外部モジュールのクラス** (コンパイラが推論できない)。

> [!WARNING]
> 引数に `List<T>` を渡すと、中身が変わっていなくても**毎回再コンポジション**されます！
> (Composeコンパイラは List が不変であることを保証できないため)

### 対策: `@Immutable` / `@Stable`
アノテーションをつけて「これは不変です」とコンパイラに約束します。
あるいは、Kotlinx Immutable Collections を使います。

```kotlin
@Immutable
data class UserList(val users: List<User>)

@Composable
fun UserListScreen(list: UserList) {
    // これならスキップ可能！
}
```

---

## 2. Layout Inspector とデバッグ
Android Studioの **Layout Inspector** を使うと、再コンポジションの回数とスキップ回数が可視化されます。
*   **Recompositions**: 実行回数。
*   **Skipped**: スキップ回数。

「何もしていないのに Recompositions が増え続ける」場合は、Unstableな引数が原因のことが多いです。

---

## 3. カスタムレイアウト
`Row` や `Column` で表現できないレイアウトを作る場合。
Flutterの `CustomMultiChildLayout` に近いです。

```kotlin
@Composable
fun MyCustomLayout(
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit
) {
    Layout(content = content, modifier = modifier) { measurables, constraints ->
        // 1. 計測 (Measure)
        val placeables = measurables.map { it.measure(constraints) }

        // 2. 配置 (Layout)
        layout(width, height) {
            placeables.forEach { it.place(x, y) }
        }
    }
}
```

---

## 4. SubcomposeLayout
「子のサイズがわかってから、別の子を表示したい」場合に使います。
パフォーマンスコストが高いので注意。

---

## 🛑 理解度チェック

### クイズ 1: パフォーマンス
`List<String>` を引数に持つComposableは、デフォルトでスキップ可能？
*   A) はい
*   B) いいえ

<details>
<summary>答え</summary>

**B) いいえ**。`List` はインターフェースであり、実装が可変(ArrayListなど)かもしれないため、ComposeはUnstableとみなします。

</details>

### クイズ 2: 最適化
UnstableなクラスをStable扱いにするアノテーションは？
*   A) `@Composable`
*   B) `@Immutable`
*   C) `@Preview`

<details>
<summary>答え</summary>

**B) `@Immutable`** (または `@Stable`)。

</details>

### クイズ 3: デバッグ
再コンポジション回数を確認するツールは？
*   A) Logcat
*   B) Layout Inspector
*   C) Profiler

<details>
<summary>答え</summary>

**B) Layout Inspector**。

</details>
