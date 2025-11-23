# Module 15: Canvasとカスタム描画

**ゴール**: 標準のコンポーネントでは作れない、独自のグラフや図形、エフェクトを描画する。

🔗 **公式ドキュメント (日本語)**:
*   [Compose でのグラフィックス](https://developer.android.com/jetpack/compose/graphics?hl=ja)

---

## 1. Canvas Composable
`Canvas` コンポーザブルを使うと、`DrawScope` にアクセスでき、線や円を描画できます。
Flutterの `CustomPaint` に近いです。

```kotlin
Canvas(modifier = Modifier.size(100.dp)) {
    // DrawScope (this)
    drawCircle(
        color = Color.Red,
        radius = size.minDimension / 2
    )
    drawLine(
        color = Color.Blue,
        start = Offset(0f, 0f),
        end = Offset(size.width, size.height),
        strokeWidth = 5f
    )
}
```

---

## 2. Path (パス) とベジェ曲線
複雑な図形は `Path` オブジェクトで作ります。

```kotlin
val path = Path().apply {
    moveTo(0f, 0f)
    quadraticBezierTo(100f, 0f, 100f, 100f) // ベジェ曲線
    lineTo(0f, 100f)
    close()
}

Canvas(...) {
    drawPath(path, color = Color.Green)
}
```

---

## 3. Modifier.drawBehind / drawWithContent
既存のコンポーネントに装飾を追加したい場合に使います。
`Canvas` を置くためにレイアウト階層を深くする必要がありません。

*   `drawBehind`: コンテンツの**後ろ**に描画 (背景)。
*   `drawWithContent`: コンテンツの前後や、コンテンツ自体を操作する場合。

```kotlin
Text(
    "Hello",
    modifier = Modifier.drawBehind {
        drawCircle(Color.Yellow, radius = size.minDimension)
    }
)
```

---

## 4. RenderEffect (Android 12+)
ブラー(ぼかし)などのエフェクトを適用します。

```kotlin
Modifier.graphicsLayer {
    renderEffect = BlurEffect(10f, 10f)
}
```

---

## 🛑 理解度チェック

### クイズ 1: 座標系
ComposeのCanvasの原点 (0, 0) はどこ？
*   A) 左上
*   B) 左下
*   C) 中央

<details>
<summary>答え</summary>

**A) 左上**。Xは右へ、Yは下へ増えます。

</details>

### クイズ 2: 描画順序
`drawWithContent` で `drawContent()` を呼ばなかった場合どうなる？
*   A) 元のコンテンツ (Textなど) が描画されない
*   B) 自動的に最後に描画される

<details>
<summary>答え</summary>

**A) 描画されない**。`drawContent()` を明示的に呼ぶことで、元のコンテンツを描画するタイミングを制御できます (例えば、コンテンツの上にフィルターを掛けるなど)。

</details>

### クイズ 3: パフォーマンス
Canvas内で `Path` オブジェクトを毎回作成 (`val path = Path()`) しても良い？
*   A) はい
*   B) いいえ

<details>
<summary>答え</summary>

**B) いいえ**。描画処理は毎フレーム呼ばれる可能性があるため、オブジェクト生成は避けるべきです。`remember` でキャッシュしましょう。

</details>
