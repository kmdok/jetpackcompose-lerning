# Module 3: 状態管理 (State Management) 完全攻略

**ゴール**: スナップショットシステム、状態ホイスティング、ViewModelとの連携をマスターする。

🔗 **公式ドキュメント (日本語)**:
*   [Compose の状態](https://developer.android.com/jetpack/compose/state?hl=ja)
*   [状態ホイスティング](https://developer.android.com/jetpack/compose/state-hoisting?hl=ja)
*   [ViewModel と Compose](https://developer.android.com/jetpack/compose/state?hl=ja#viewmodel-state)

---

## 1. スナップショットシステム
Composeは単に変数を監視しているわけではなく、**スナップショットシステム**を使用しています。
コンポジション中に `State<T>` を読み取ると、Composeはその値を「購読」します。

```kotlin
// MutableState<T>
val count = remember { mutableStateOf(0) }

// 'value' を読み取ると、読み取りアクセスが記録される
Text("Count: ${count.value}") 
```

### `remember` vs `rememberSaveable`
*   `remember`: 再コンポジション中も値を保持。**画面回転で消える**。
*   `rememberSaveable`: 再コンポジションに加え、**プロセス死や画面回転**でも値を保持。
    *   Fragmentの `savedInstanceState` に相当。

```kotlin
var name by rememberSaveable { mutableStateOf("") }
```

---

## 2. 状態ホイスティング (単方向データフロー)
**ルール**: 状態は下へ、イベントは上へ。
*   **Stateful**: 状態を持つ。再利用しにくい。
*   **Stateless**: 状態を受け取る。再利用・テストしやすい。

```kotlin
// Stateless (Pure)
@Composable
fun Counter(count: Int, onInc: () -> Unit) {
    Button(onClick = onInc) { Text("$count") }
}

// Stateful (Container)
@Composable
fun CounterScreen() {
    var count by remember { mutableStateOf(0) }
    Counter(count = count, onInc = { count++ })
}
```

> [!TIP]
> **Flutter比較**: 親の `setState` を呼ぶためのコールバックを子Widgetに渡すのと全く同じです。

---

## 3. ViewModelとの連携
本番アプリでは、状態は `ViewModel` (画面回転しても生き残る) に置きます。

### `collectAsStateWithLifecycle`
FlowをUIで安全に収集するために使います。

```kotlin
// ViewModel
class HomeViewModel : ViewModel() {
    private val _state = MutableStateFlow(HomeState())
    val state = _state.asStateFlow()
}

// Composable
@Composable
fun HomeScreen(viewModel: HomeViewModel = hiltViewModel()) {
    // ライフサイクルを考慮して安全に購読
    val state by viewModel.state.collectAsStateWithLifecycle()
    
    HomeContent(state)
}
```

> [!NOTE]
> **Riverpod比較**:
> `viewModel.state` は `StateNotifierProvider` のようなもの。
> `collectAsStateWithLifecycle` は `ref.watch` に相当。

---

## 4. CompositionLocal (暗黙的な状態)
引数として渡さずに、ツリーの下層にデータを渡す仕組み (テーマ、Contextなど)。
*   **React**: `Context`.
*   **Flutter**: `InheritedWidget` / `Provider`.
*   **Compose**: `CompositionLocal`.

```kotlin
val LocalUser = compositionLocalOf { User.Guest }

// Provide (供給)
CompositionLocalProvider(LocalUser provides currentUser) {
    // Consume (利用) - ツリーの深い場所で
    val user = LocalUser.current
}
```

🔗 [CompositionLocal (JP)](https://developer.android.com/jetpack/compose/compositionlocal?hl=ja)

---

## 🛑 理解度チェック

### クイズ 1: 画面回転
`remember { mutableStateOf(0) }` を使っています。画面を回転させると値はどうなる？
*   A) 0 にリセットされる
*   B) 保持される

<details>
<summary>答え</summary>

**A) 0 にリセットされる**。回転後も保持するには `rememberSaveable` を使う。

</details>

### クイズ 2: ホイスティング
なぜ状態をホイスティング（持ち上げ）するのか？
*   A) コードを長くするため
*   B) コンポーネントを再利用・テストしやすくするため
*   C) パフォーマンス向上のため

<details>
<summary>答え</summary>

**B)**。Statelessなコンポーネントは扱いやすい。

</details>

### クイズ 3: ViewModel
ComposeでFlowを監視する正しい方法は？
*   A) `flow.collect()`
*   B) `flow.collectAsState()`
*   C) `flow.collectAsStateWithLifecycle()`

<details>
<summary>答え</summary>

**C)**。アプリがバックグラウンドに行った時に自動で購読を停止し、リソースを節約してくれる。

</details>
