# Module 4: 副作用 (Side Effects) とライフサイクル

**ゴール**: ワンショットのイベント (APIコール、分析ログ) を処理し、コンポジションのライフサイクルから脱出する方法を学ぶ。

🔗 **公式ドキュメント (日本語)**:
*   [Compose における副作用](https://developer.android.com/jetpack/compose/side-effects?hl=ja)

---

## 1. 問題点
Composable関数は**何度も**実行されます (再コンポジション)。
以下のようなコードは**NG**です。

```kotlin
@Composable
fun MyScreen() {
    // ダメ！再コンポジションのたびに実行されてしまう
    api.fetchData() 
}
```

---

## 2. `LaunchedEffect`: ワンショットの非同期処理
コンポジションに入ったタイミングで `suspend` ブロックを実行します。
コンポジションから出るとキャンセルされます。
`key` が変化すると再実行されます。

*   **React**: `useEffect(() => { ... }, [key])`.
*   **Flutter**: `initState` / `didUpdateWidget`.

```kotlin
LaunchedEffect(userId) {
    // userIdが変わった時、または初回表示時に実行
    viewModel.refresh(userId)
}
```

### `Unit` をキーにする
`LaunchedEffect(Unit)` は、**初回表示時に1回だけ**実行されます。

---

## 3. `DisposableEffect`: クリーンアップが必要な処理
リスナーの登録/解除など、終了処理が必要な場合に使います。
*   **React**: `useEffect` の戻り値 (クリーンアップ関数)。
*   **Flutter**: `dispose`.

```kotlin
DisposableEffect(lifecycleOwner) {
    val observer = LifecycleEventObserver { ... }
    lifecycleOwner.addObserver(observer)

    onDispose {
        // クリーンアップ！
        lifecycleOwner.removeObserver(observer)
    }
}
```

---

## 4. `rememberCoroutineScope`: クリックで起動
`LaunchedEffect` は**コンポジション**のライフサイクル用です。
**ユーザー操作** (クリックなど) で非同期処理をする場合は、Scopeを使います。

```kotlin
val scope = rememberCoroutineScope()

Button(onClick = {
    // ここで直接 suspend 関数は呼べない
    scope.launch {
        snackbarHostState.showSnackbar("Hello")
    }
}) { ... }
```

---

## 5. `derivedStateOf`: パフォーマンス最適化
頻繁に変わる状態を、頻度の低い状態に変換します。
*   **Riverpod**: `select`.
*   **React**: `useMemo` (に近い).

**シナリオ**: 100pxスクロールしたら「トップへ戻る」ボタンを表示したい。

```kotlin
val listState = rememberLazyListState()

// BAD: 1pxスクロールするたびに再コンポジションが発生
// val showButton = listState.firstVisibleItemIndex > 0

// GOOD: true/false が切り替わった時だけ再コンポジション
val showButton by remember {
    derivedStateOf { listState.firstVisibleItemIndex > 0 }
}
```

🔗 [derivedStateOf (JP)](https://developer.android.com/jetpack/compose/side-effects?hl=ja#derivedstateof)

---

## 🛑 理解度チェック

### クイズ 1: APIコール
画面表示時のAPIコールはどこで行う？
*   A) Composable関数の中に直接書く
*   B) `LaunchedEffect(Unit)`
*   C) `SideEffect`

<details>
<summary>答え</summary>

**B) `LaunchedEffect(Unit)`**。
Aは実行回数が多すぎる。Cはコンポジション成功後に毎回実行されるため不適切。

</details>

### クイズ 2: ボタンクリック
ボタンクリック時に `suspend` 関数を呼びたい。
*   A) `LaunchedEffect`
*   B) `rememberCoroutineScope().launch`

<details>
<summary>答え</summary>

**B)**。`LaunchedEffect` はコンポジションのライフサイクル用。

</details>

### クイズ 3: クリーンアップ
センサーを監視したい。どのEffectを使う？
*   A) `LaunchedEffect`
*   B) `DisposableEffect`

<details>
<summary>答え</summary>

**B)**。`onDispose` でセンサーの登録解除が必要。

</details>
