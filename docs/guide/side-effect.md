# SideEffect

Composeの状態を非Compose APIに伝える方法を学びます。

## SideEffectとは

::: info
**SideEffect**は、Composableの再構築が成功したときに毎回実行される副作用です。

Composeの状態を非Compose APIに同期する際に使用します。
:::

## 基本的な使い方

```kotlin
@Composable
fun SideEffectExample(value: Int) {
    SideEffect {
        // 再構築のたびに実行される
        println("Current value: $value")
    }
}
```

## 実践例

### アナリティクス

```kotlin
@Composable
fun AnalyticsScreen(screenName: String) {
    SideEffect {
        Analytics.logScreenView(screenName)
    }
}
```

### 非Compose UIとの同期

```kotlin
@Composable
fun LegacyViewBridge(selectedTab: Int, legacyView: LegacyTabView) {
    SideEffect {
        legacyView.setSelectedTab(selectedTab)
    }
}
```

## LaunchedEffectとの違い

| | LaunchedEffect | SideEffect |
|---|---|---|
| 実行タイミング | keyが変わったとき | 再構築のたびに毎回 |
| Coroutine | ✅ 使える | ❌ 使えない |
| 用途 | 非同期処理 | 同期的な副作用 |

## 公式ドキュメント参考リンク

- [Side-effects in Compose](https://developer.android.com/jetpack/compose/side-effects?hl=ja)

## 次のステップ

- [LaunchedEffect](/guide/launched-effect)
- [DisposableEffect](/guide/disposable-effect)
