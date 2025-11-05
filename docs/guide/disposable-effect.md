# DisposableEffect

クリーンアップが必要な副作用の処理方法を学びます。

## DisposableEffectとは

::: info
**DisposableEffect**は、Composableが画面から削除されるときにクリーンアップ処理を実行できる副作用です。

React useEffectのクリーンアップ関数、Flutterのdisposeメソッドに相当します。
:::

## 基本的な使い方

```kotlin
@Composable
fun DisposableEffectExample() {
    DisposableEffect(Unit) {
        println("Setup")

        onDispose {
            println("Cleanup")
        }
    }
}
```

## 実践例

### タイマーのクリーンアップ

```kotlin
@Composable
fun TimerScreen() {
    var time by remember { mutableStateOf(0) }

    DisposableEffect(Unit) {
        val timer = Timer()
        timer.schedule(object : TimerTask() {
            override fun run() {
                time++
            }
        }, 0, 1000)

        onDispose {
            timer.cancel()
        }
    }

    Text("Time: $time seconds")
}
```

### ライフサイクルObserver

```kotlin
@Composable
fun LifecycleAwareComposable(
    lifecycleOwner: LifecycleOwner = LocalLifecycleOwner.current
) {
    DisposableEffect(lifecycleOwner) {
        val observer = LifecycleEventObserver { _, event ->
            when (event) {
                Lifecycle.Event.ON_RESUME -> println("Resumed")
                Lifecycle.Event.ON_PAUSE -> println("Paused")
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

## 公式ドキュメント参考リンク

- [Side-effects in Compose](https://developer.android.com/jetpack/compose/side-effects?hl=ja)

## 次のステップ

- [LaunchedEffect](/guide/launched-effect)
- [SideEffect](/guide/side-effect)
