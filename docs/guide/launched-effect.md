# LaunchedEffect と副作用

Jetpack Composeでの副作用（Side Effects）の扱い方を学びます。

## 副作用とは

::: info
**副作用（Side Effect）**とは、Composable関数の外部に影響を与える処理のことです。

例：
- API呼び出し
- データベース操作
- タイマー処理
- ログ出力
- アナリティクス送信
:::

::: tip React/Flutterとの比較
- **React**: `useEffect`
- **Flutter**: `initState`, `dispose`, `didUpdateWidget`
- **Compose**: `LaunchedEffect`, `DisposableEffect`, `SideEffect`
:::

## LaunchedEffect

### 基本的な使い方

```kotlin
@Composable
fun UserScreen(userId: Int, viewModel: UserViewModel = viewModel()) {
    LaunchedEffect(userId) {
        viewModel.loadUser(userId)
    }

    val user by viewModel.user.collectAsState()

    // UI
}
```

::: info LaunchedEffectとは
Composableがコンポジション（画面に表示）されたときに一度だけ実行され、keyが変更されたら再実行されます。
:::

### キーの役割

```kotlin
// userIdが変わるたびに実行
LaunchedEffect(userId) {
    loadUser(userId)
}

// 一度だけ実行（キーが変わらない）
LaunchedEffect(Unit) {
    setupSomething()
}

// 複数のキー
LaunchedEffect(userId, category) {
    loadData(userId, category)
}
```

::: tip
- `Unit`をキーにすると一度だけ実行
- 変数をキーにするとその値が変わるたびに実行
:::

## DisposableEffect

クリーンアップが必要な処理に使用します。

```kotlin
@Composable
fun TimerScreen() {
    DisposableEffect(Unit) {
        val timer = Timer()
        timer.schedule(/* ... */)

        onDispose {
            timer.cancel()  // クリーンアップ
        }
    }
}
```

::: info DisposableEffectとは
Composableが画面から削除されるときに`onDispose`が呼ばれ、リソースを解放できます。

React useEffectのクリーンアップ関数、Flutterのdisposeメソッドに相当します。
:::

### 実践例: ライフサイクルObserver

```kotlin
@Composable
fun LifecycleAwareComposable(
    lifecycleOwner: LifecycleOwner = LocalLifecycleOwner.current
) {
    DisposableEffect(lifecycleOwner) {
        val observer = LifecycleEventObserver { _, event ->
            when (event) {
                Lifecycle.Event.ON_RESUME -> println("resumed")
                Lifecycle.Event.ON_PAUSE -> println("paused")
                else -> {}
            }
        }

        lifecycleOwner.lifecycle.addObserver(observer)

        onDispose {
            lifecycleOwner.lifecycle.removeObserver(observer)
        }
    }
}
```

## SideEffect

Composeの状態を非Compose APIに伝えるときに使用します。

```kotlin
@Composable
fun AnalyticsScreen(screenName: String) {
    SideEffect {
        // 再構築のたびに実行される
        Analytics.logScreenView(screenName)
    }
}
```

::: warning
`SideEffect`は再構築のたびに実行されるため、頻繁に呼ばれる可能性があります。多くの場合、`LaunchedEffect`を使うべきです。
:::

## rememberCoroutineScope

Composableの外でCoroutineを起動する必要がある場合に使用します。

```kotlin
@Composable
fun ButtonExample() {
    val scope = rememberCoroutineScope()

    Button(onClick = {
        scope.launch {
            // 非同期処理
            val result = fetchData()
            println(result)
        }
    }) {
        Text("Fetch Data")
    }
}
```

::: info rememberCoroutineScopeとは
Composableのライフサイクルに紐づいたCoroutineScopeを提供します。Composableが削除されると自動的にキャンセルされます。
:::

## produceState

Flowや非同期データをStateに変換します。

```kotlin
@Composable
fun UserScreen(userId: Int) {
    val userState by produceState<User?>(initialValue = null, userId) {
        value = userRepository.getUser(userId)
    }

    userState?.let { user ->
        Text("Hello, ${user.name}")
    }
}
```

::: info produceStateとは
非同期データソースをComposeのStateに変換する便利な関数です。
:::

## derivedStateOf

他の状態から計算される状態を作成します。

```kotlin
@Composable
fun TodoList(todos: List<Todo>) {
    val completedCount by remember {
        derivedStateOf {
            todos.count { it.completed }
        }
    }

    Text("Completed: $completedCount / ${todos.size}")
}
```

::: tip
`derivedStateOf`を使うと、依存する状態が変わった時だけ再計算されます。
:::

## snapshotFlow

Composeの状態をFlowに変換します。

```kotlin
@Composable
fun ScrollListener() {
    val listState = rememberLazyListState()

    LaunchedEffect(listState) {
        snapshotFlow { listState.firstVisibleItemIndex }
            .collect { index ->
                println("First visible item: $index")
            }
    }

    LazyColumn(state = listState) {
        // ...
    }
}
```

::: info snapshotFlowとは
Composeの状態の変更を監視して、Flowとして公開します。
:::

## 実践例

### API呼び出し

```kotlin
@Composable
fun UserProfileScreen(userId: Int, viewModel: UserViewModel = viewModel()) {
    val uiState by viewModel.uiState.collectAsState()

    LaunchedEffect(userId) {
        viewModel.loadUser(userId)
    }

    when (val state = uiState) {
        is UiState.Loading -> CircularProgressIndicator()
        is UiState.Success -> UserProfile(state.user)
        is UiState.Error -> ErrorMessage(state.message)
    }
}
```

### タイマー

```kotlin
@Composable
fun CountdownTimer(seconds: Int) {
    var timeLeft by remember { mutableStateOf(seconds) }

    LaunchedEffect(Unit) {
        while (timeLeft > 0) {
            delay(1000)
            timeLeft--
        }
    }

    Text("Time left: $timeLeft seconds")
}
```

### Debounce検索

```kotlin
@Composable
fun SearchScreen() {
    var searchQuery by remember { mutableStateOf("") }
    var searchResults by remember { mutableStateOf<List<Item>>(emptyList()) }

    LaunchedEffect(searchQuery) {
        delay(300)  // 300msのdebounce
        if (searchQuery.isNotBlank()) {
            searchResults = searchRepository.search(searchQuery)
        }
    }

    Column {
        TextField(
            value = searchQuery,
            onValueChange = { searchQuery = it },
            label = { Text("Search") }
        )

        LazyColumn {
            items(searchResults) { item ->
                Text(item.name)
            }
        }
    }
}
```

### Snackbar表示

```kotlin
@Composable
fun MessageScreen() {
    val snackbarHostState = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()

    Scaffold(
        snackbarHost = { SnackbarHost(snackbarHostState) }
    ) {
        Button(onClick = {
            scope.launch {
                snackbarHostState.showSnackbar("Hello from Snackbar!")
            }
        }) {
            Text("Show Snackbar")
        }
    }
}
```

### WebSocketリスナー

```kotlin
@Composable
fun ChatScreen(chatId: String) {
    var messages by remember { mutableStateOf<List<Message>>(emptyList()) }

    DisposableEffect(chatId) {
        val websocket = WebSocketClient()
        websocket.connect(chatId)

        websocket.onMessageReceived = { message ->
            messages = messages + message
        }

        onDispose {
            websocket.disconnect()
        }
    }

    LazyColumn {
        items(messages) { message ->
            MessageBubble(message)
        }
    }
}
```

## 副作用の選択ガイド

| 用途 | 使用する副作用 |
|------|----------------|
| API呼び出し、データ読み込み | `LaunchedEffect` |
| リソースのクリーンアップが必要 | `DisposableEffect` |
| 非Compose APIへの通知 | `SideEffect` |
| ボタンクリックなどでCoroutine起動 | `rememberCoroutineScope` |
| FlowをStateに変換 | `produceState` または `collectAsState` |
| 状態の監視 | `snapshotFlow` |
| 計算された状態 | `derivedStateOf` |

## よくある間違い

### ❌ Composable関数内で直接非同期処理

```kotlin
@Composable
fun BadExample() {
    // ❌ ダメ: 再構築のたびに実行される
    viewModelScope.launch {
        loadData()
    }
}
```

### ✅ LaunchedEffectを使う

```kotlin
@Composable
fun GoodExample() {
    LaunchedEffect(Unit) {
        loadData()
    }
}
```

### ❌ rememberでCoroutineを起動

```kotlin
@Composable
fun BadExample() {
    // ❌ ダメ: rememberの初期化は同期的であるべき
    remember {
        scope.launch { loadData() }
    }
}
```

### ✅ LaunchedEffectを使う

```kotlin
@Composable
fun GoodExample() {
    LaunchedEffect(Unit) {
        loadData()
    }
}
```

## React useEffectとの詳細比較

```jsx
// React
useEffect(() => {
  fetchUser(userId);
}, [userId]);

useEffect(() => {
  const timer = setInterval(() => console.log('tick'), 1000);
  return () => clearInterval(timer);
}, []);
```

```kotlin
// Compose
LaunchedEffect(userId) {
    fetchUser(userId)
}

DisposableEffect(Unit) {
    val timer = Timer()
    timer.schedule(/* ... */)
    onDispose {
        timer.cancel()
    }
}
```

## 重要な用語集

| 用語 | 説明 |
|------|------|
| **Side Effect** | Composable関数の外部に影響を与える処理 |
| **LaunchedEffect** | Composable表示時に一度だけ、またはキー変更時に実行 |
| **DisposableEffect** | クリーンアップが必要な副作用 |
| **SideEffect** | 再構築のたびに実行される副作用 |
| **rememberCoroutineScope** | Composableに紐づいたCoroutineScope |
| **produceState** | 非同期データをStateに変換 |
| **derivedStateOf** | 他の状態から計算される状態 |
| **snapshotFlow** | Composeの状態をFlowに変換 |

## 公式ドキュメント参考リンク

- [Side-effects in Compose](https://developer.android.com/jetpack/compose/side-effects?hl=ja)
- [Lifecycle of composables](https://developer.android.com/jetpack/compose/lifecycle?hl=ja)
- [Kotlin Coroutines](https://developer.android.com/kotlin/coroutines?hl=ja)

## 次のステップ

- [State管理](/guide/state-management) - 状態管理を復習
- [実践例: TODOアプリ](/examples/todo-app) - 副作用を使った実践
