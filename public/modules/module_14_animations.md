# Module 14: 高度なアニメーションとジェスチャー

**ゴール**: `Animatable` や `Transition` を使いこなし、複雑なアニメーションとジェスチャー操作を実装する。

🔗 **公式ドキュメント (日本語)**:
*   [Compose のアニメーション](https://developer.android.com/jetpack/compose/animation?hl=ja)
*   [ジェスチャーの処理](https://developer.android.com/jetpack/compose/touch-input?hl=ja)

---

## 1. 低レベルアニメーション API
`animate*AsState` は簡単ですが、細かい制御ができません。
複雑なアニメーションには `Animatable` を使います。

### `Animatable` (手動制御)
`launch` ブロック内で `animateTo` を呼ぶことで、アニメーションを制御します。
途中でキャンセルしたり、バネの強さを変えたりできます。

```kotlin
val offsetX = remember { Animatable(0f) }

LaunchedEffect(Unit) {
    // 0 -> 300 へアニメーション
    offsetX.animateTo(
        targetValue = 300f,
        animationSpec = spring(stiffness = Spring.StiffnessLow)
    )
}

Box(Modifier.offset { IntOffset(offsetX.value.roundToInt(), 0) })
```

### `updateTransition` (複数プロパティの同期)
状態の変化に合わせて、色、サイズ、透明度などを**同時に**アニメーションさせます。

```kotlin
var state by remember { mutableStateOf(BoxState.Collapsed) }
val transition = updateTransition(targetState = state, label = "boxTransition")

val size by transition.animateDp(label = "size") { state ->
    if (state == BoxState.Collapsed) 50.dp else 200.dp
}
val color by transition.animateColor(label = "color") { state ->
    if (state == BoxState.Collapsed) Color.Red else Color.Blue
}
```

---

## 2. レイアウトアニメーション
### `AnimatedContent`
コンテンツが切り替わる時にアニメーションします (フェードイン/アウト、スライドなど)。

```kotlin
AnimatedContent(
    targetState = count,
    transitionSpec = {
        // 新しい数字は下から、古い数字は上へ
        slideInVertically { height -> height } togetherWith
        slideOutVertically { height -> -height }
    }
) { targetCount ->
    Text("$targetCount")
}
```

### `SharedTransitionLayout` (共有要素遷移)
画面遷移時に、画像が拡大しながら移動するようなエフェクトです。
Android 15 (Compose 1.7+) から簡単に使えるようになりました。

---

## 3. ジェスチャー処理
`clickable` だけでなく、ドラッグやスワイプを扱います。

### `pointerInput` (低レベル)
タッチイベントを直接扱います。

```kotlin
Box(
    Modifier.pointerInput(Unit) {
        detectTapGestures(
            onDoubleTap = { /* ダブルタップ */ },
            onLongPress = { /* 長押し */ },
            onTap = { /* タップ */ }
        )
    }
)
```

### `draggable` / `anchoredDraggable`
スワイプして削除したり、ドロワーを開閉したりする動きを作ります。

```kotlin
var offsetX by remember { mutableFloatStateOf(0f) }
Box(
    Modifier
        .offset { IntOffset(offsetX.roundToInt(), 0) }
        .draggable(
            orientation = Orientation.Horizontal,
            state = rememberDraggableState { delta ->
                offsetX += delta
            }
        )
)
```

---

## 🛑 理解度チェック

### クイズ 1: APIの選択
「ボタンを押したら、API通信の結果を待ってから、成功アニメーションを再生したい」。
`animateFloatAsState` と `Animatable` どちらが適している？
*   A) `animateFloatAsState`
*   B) `Animatable`

<details>
<summary>答え</summary>

**B) `Animatable`**。`suspend` 関数 (`animateTo`) なので、コルーチン内でAPIコールの後に順次実行できます。`animate*AsState` は状態駆動なので、シーケンシャルな処理には向きません。

</details>

### クイズ 2: ジェスチャー
`clickable` と `pointerInput` (detectTapGestures) を同じModifierチェーンに書いた場合、どうなる？
*   A) 両方呼ばれる
*   B) どちらか片方しか呼ばれない (競合する)

<details>
<summary>答え</summary>

**B) 競合する可能性があります**。基本的には `clickable` を優先し、より複雑な操作が必要な場合のみ `pointerInput` を使いましょう。

</details>

### クイズ 3: パフォーマンス
ドラッグ中のオフセット更新で、再コンポジションを避けるには？
*   A) `mutableStateOf` を使う
*   B) `Modifier.offset { ... }` (ラムダ版) を使う

<details>
<summary>答え</summary>

**B)**。ラムダ版の `offset` は **Layoutフェーズ** で読み取られるため、Compositionフェーズをスキップできます。

</details>
