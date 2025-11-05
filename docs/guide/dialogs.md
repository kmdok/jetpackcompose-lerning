# ダイアログとスナックバー

Jetpack Composeでのダイアログとスナックバーの使い方を学びます。

## AlertDialog

### 基本的な使い方

```kotlin
@Composable
fun AlertDialogExample() {
    var showDialog by remember { mutableStateOf(false) }

    Button(onClick = { showDialog = true }) {
        Text("Show Dialog")
    }

    if (showDialog) {
        AlertDialog(
            onDismissRequest = { showDialog = false },
            title = { Text("タイトル") },
            text = { Text("これはダイアログの本文です。") },
            confirmButton = {
                TextButton(onClick = { showDialog = false }) {
                    Text("OK")
                }
            },
            dismissButton = {
                TextButton(onClick = { showDialog = false }) {
                    Text("キャンセル")
                }
            }
        )
    }
}
```

### カスタムダイアログ

```kotlin
@Composable
fun CustomDialog(onDismiss: () -> Unit) {
    Dialog(onDismissRequest = onDismiss) {
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            shape = RoundedCornerShape(16.dp)
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Text("カスタムダイアログ", fontSize = 20.sp, fontWeight = FontWeight.Bold)
                Text("ここに任意のコンテンツを配置できます")
                Button(onClick = onDismiss, modifier = Modifier.fillMaxWidth()) {
                    Text("閉じる")
                }
            }
        }
    }
}
```

## BottomSheet

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BottomSheetExample() {
    var showBottomSheet by remember { mutableStateOf(false) }
    val sheetState = rememberModalBottomSheetState()

    Button(onClick = { showBottomSheet = true }) {
        Text("Show Bottom Sheet")
    }

    if (showBottomSheet) {
        ModalBottomSheet(
            onDismissRequest = { showBottomSheet = false },
            sheetState = sheetState
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Bottom Sheet Content", fontSize = 20.sp)
                Spacer(modifier = Modifier.height(16.dp))
                Button(onClick = { showBottomSheet = false }) {
                    Text("閉じる")
                }
            }
        }
    }
}
```

## Snackbar

```kotlin
@Composable
fun SnackbarExample() {
    val snackbarHostState = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()

    Scaffold(
        snackbarHost = { SnackbarHost(snackbarHostState) }
    ) { paddingValues ->
        Column(modifier = Modifier.padding(paddingValues)) {
            Button(onClick = {
                scope.launch {
                    snackbarHostState.showSnackbar("Hello from Snackbar!")
                }
            }) {
                Text("Show Snackbar")
            }

            Button(onClick = {
                scope.launch {
                    val result = snackbarHostState.showSnackbar(
                        message = "削除しますか？",
                        actionLabel = "元に戻す",
                        duration = SnackbarDuration.Long
                    )
                    when (result) {
                        SnackbarResult.ActionPerformed -> {
                            println("Undo clicked")
                        }
                        SnackbarResult.Dismissed -> {
                            println("Dismissed")
                        }
                    }
                }
            }) {
                Text("Show Snackbar with Action")
            }
        }
    }
}
```

## CircularProgressIndicator

```kotlin
@Composable
fun LoadingExample() {
    var isLoading by remember { mutableStateOf(false) }

    Box(modifier = Modifier.fillMaxSize()) {
        Button(
            onClick = {
                isLoading = true
                // 何か処理...
            }
        ) {
            Text("Load")
        }

        if (isLoading) {
            CircularProgressIndicator(
                modifier = Modifier.align(Alignment.Center)
            )
        }
    }
}
```

## 公式ドキュメント参考リンク

- [Dialogs](https://developer.android.com/jetpack/compose/components/dialog?hl=ja)
- [Snackbars](https://m3.material.io/components/snackbar/overview)

## 次のステップ

- [実践例: TODOアプリ](/examples/todo-app)
