# Modifierの使い方

ModifierはJetpack ComposeでUIをカスタマイズする強力な仕組みです。

## Modifierとは

::: info
**Modifier**は、Composableの見た目、レイアウト、動作をカスタマイズするための仕組みです。

FlutterのWidgetラッピングやReactのstyle propと似ていますが：
- **チェーン可能**: 複数のmodifierを連結できる
- **順序が重要**: 適用順序で結果が変わる
- **型安全**: コンパイル時にエラー検出
:::

## 基本的な使い方

```kotlin
Text(
    "Hello",
    modifier = Modifier
        .padding(16.dp)
        .background(Color.Blue)
        .fillMaxWidth()
)
```

## Modifierの順序

::: warning 重要
Modifierは**上から下**に順番に適用されます。順序が変わると結果も変わります。
:::

### 例: paddingとbackgroundの順序

```kotlin
// パターン1: padding → background
Text(
    "Hello",
    modifier = Modifier
        .padding(16.dp)      // 先にpadding
        .background(Color.Blue)  // 後にbackground
)
// 結果: テキストの周りに透明な余白、その外側に青い背景

// パターン2: background → padding
Text(
    "Hello",
    modifier = Modifier
        .background(Color.Blue)  // 先にbackground
        .padding(16.dp)      // 後にpadding
)
// 結果: 青い背景がpaddingを含む範囲全体に
```

## サイズ Modifier

### 固定サイズ

```kotlin
// 正方形
Modifier.size(100.dp)

// 個別指定
Modifier
    .width(200.dp)
    .height(50.dp)

// 最小/最大サイズ
Modifier
    .widthIn(min = 100.dp, max = 300.dp)
    .heightIn(min = 50.dp, max = 200.dp)
```

### 親要素いっぱいに

```kotlin
// 縦横両方
Modifier.fillMaxSize()

// 横のみ
Modifier.fillMaxWidth()

// 縦のみ
Modifier.fillMaxHeight()

// 比率指定
Modifier.fillMaxWidth(0.5f)  // 50%
```

### アスペクト比

```kotlin
Image(
    painter = painterResource(R.drawable.photo),
    contentDescription = null,
    modifier = Modifier
        .fillMaxWidth()
        .aspectRatio(16f / 9f)  // 16:9の比率
)
```

::: info アスペクト比とは
幅と高さの比率。`16f / 9f`なら横16:縦9の比率で表示されます。
:::

## Padding と Margin

Composeには`margin`がなく、すべて`padding`で表現します。

```kotlin
// 全方向に同じpadding
Modifier.padding(16.dp)

// 縦横で異なる
Modifier.padding(
    horizontal = 16.dp,
    vertical = 8.dp
)

// 個別指定
Modifier.padding(
    start = 16.dp,
    top = 8.dp,
    end = 16.dp,
    bottom = 8.dp
)
```

::: tip marginの代わり
外側の余白は、親のColumnやRowに`Arrangement.spacedBy()`を使うか、`Spacer`を使います。
:::

## 背景とボーダー

```kotlin
// シンプルな背景
Modifier.background(Color.Blue)

// 角丸の背景
Modifier.background(
    color = Color.Blue,
    shape = RoundedCornerShape(8.dp)
)

// グラデーション
Modifier.background(
    brush = Brush.horizontalGradient(
        colors = listOf(Color.Blue, Color.Green)
    )
)

// ボーダー
Modifier.border(
    width = 2.dp,
    color = Color.Red,
    shape = RoundedCornerShape(8.dp)
)
```

## クリップ（切り抜き）

```kotlin
// 円形
Modifier.clip(CircleShape)

// 角丸
Modifier.clip(RoundedCornerShape(8.dp))

// カスタムシェイプ
Modifier.clip(CutCornerShape(8.dp))

// 上部のみ角丸
Modifier.clip(RoundedCornerShape(topStart = 16.dp, topEnd = 16.dp))
```

## クリック処理

```kotlin
// 基本的なクリック
Modifier.clickable {
    println("Clicked!")
}

// リップル効果なし
Modifier.clickable(
    indication = null,
    interactionSource = remember { MutableInteractionSource() }
) {
    println("Clicked without ripple")
}

// 組み合わせインジケーションと共に
Modifier.combinedClickable(
    onClick = { println("Click") },
    onLongClick = { println("Long click") },
    onDoubleClick = { println("Double click") }
)
```

## スクロール

```kotlin
// 縦スクロール
Column(
    modifier = Modifier
        .fillMaxSize()
        .verticalScroll(rememberScrollState())
) {
    // コンテンツ
}

// 横スクロール
Row(
    modifier = Modifier
        .fillMaxWidth()
        .horizontalScroll(rememberScrollState())
) {
    // コンテンツ
}
```

::: info rememberScrollStateとは
スクロール位置を記憶するための状態オブジェクト。再構築時もスクロール位置を保持します。
:::

## オフセット

要素の位置を移動します。

```kotlin
// 絶対オフセット
Modifier.offset(x = 10.dp, y = 20.dp)

// 相対オフセット（RTL対応）
Modifier.offset { IntOffset(x = 10, y = 20) }
```

## 透明度

```kotlin
// 半透明
Modifier.alpha(0.5f)

// 完全に透明（ただし領域は残る）
Modifier.alpha(0f)
```

## 回転・拡大縮小

```kotlin
// 回転
Modifier.rotate(45f)

// 拡大縮小
Modifier.scale(1.5f)
Modifier.scale(scaleX = 2f, scaleY = 1f)
```

## Shadow（影）

```kotlin
Modifier.shadow(
    elevation = 8.dp,
    shape = RoundedCornerShape(8.dp)
)
```

::: info elevationとは
**Elevation（エレベーション）**: マテリアルデザインの概念で、要素の「高さ」を表します。値が大きいほど影が濃くなります。
:::

## Alignment（Box内）

Box内で要素を配置します。

```kotlin
Box(modifier = Modifier.fillMaxSize()) {
    Text(
        "Top Start",
        modifier = Modifier.align(Alignment.TopStart)
    )
    Text(
        "Center",
        modifier = Modifier.align(Alignment.Center)
    )
    Text(
        "Bottom End",
        modifier = Modifier.align(Alignment.BottomEnd)
    )
}
```

## Weight（Row/Column内）

```kotlin
Row(modifier = Modifier.fillMaxWidth()) {
    Box(
        modifier = Modifier
            .weight(1f)  // 1:2の比率
            .height(50.dp)
            .background(Color.Red)
    )
    Box(
        modifier = Modifier
            .weight(2f)
            .height(50.dp)
            .background(Color.Blue)
    )
}
```

## カスタムModifier

独自のModifierを作成できます。

```kotlin
fun Modifier.customStyle() = this
    .padding(16.dp)
    .background(Color.Blue, shape = RoundedCornerShape(8.dp))
    .padding(8.dp)

// 使用例
Text(
    "Styled text",
    modifier = Modifier.customStyle()
)
```

## 条件付きModifier

```kotlin
@Composable
fun ConditionalModifierExample(isHighlighted: Boolean) {
    Text(
        "Text",
        modifier = Modifier
            .padding(16.dp)
            .then(
                if (isHighlighted) {
                    Modifier.background(Color.Yellow)
                } else {
                    Modifier
                }
            )
    )
}
```

## 実践例

### カスタムボタン

```kotlin
@Composable
fun CustomButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(8.dp))
            .background(
                brush = Brush.horizontalGradient(
                    colors = listOf(Color(0xFF6200EE), Color(0xFF3700B3))
                )
            )
            .clickable(onClick = onClick)
            .padding(horizontal = 24.dp, vertical = 12.dp)
    ) {
        Text(
            text = text,
            color = Color.White,
            fontWeight = FontWeight.Bold
        )
    }
}
```

### カード風レイアウト

```kotlin
@Composable
fun CustomCard(content: @Composable () -> Unit) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
            .shadow(4.dp, shape = RoundedCornerShape(12.dp))
            .clip(RoundedCornerShape(12.dp))
            .background(Color.White)
            .padding(16.dp)
    ) {
        content()
    }
}
```

### ドラッグ可能な要素

```kotlin
@Composable
fun DraggableBox() {
    var offsetX by remember { mutableStateOf(0f) }
    var offsetY by remember { mutableStateOf(0f) }

    Box(
        modifier = Modifier
            .offset { IntOffset(offsetX.roundToInt(), offsetY.roundToInt()) }
            .size(100.dp)
            .background(Color.Blue)
            .pointerInput(Unit) {
                detectDragGestures { change, dragAmount ->
                    change.consume()
                    offsetX += dragAmount.x
                    offsetY += dragAmount.y
                }
            }
    )
}
```

## パフォーマンスの考慮

### Modifierの再利用

```kotlin
// ❌ 悪い例: 毎回新しいModifierが作成される
@Composable
fun BadExample() {
    Text("Hello", modifier = Modifier.padding(16.dp))
}

// ✅ 良い例: Modifierを再利用
@Composable
fun GoodExample(modifier: Modifier = Modifier) {
    Text(
        "Hello",
        modifier = modifier.padding(16.dp)
    )
}
```

## 重要な用語集

| 用語 | 説明 |
|------|------|
| **Modifier** | Composableの見た目や動作をカスタマイズする仕組み |
| **Chain** | 複数のModifierを連結すること |
| **Elevation** | マテリアルデザインの「高さ」の概念。影の濃さを決定 |
| **dp** | Density-independent Pixels。画面密度に依存しない単位 |
| **Shape** | 図形の形状（CircleShape, RoundedCornerShapeなど） |
| **Brush** | グラデーションやパターンを表現 |
| **InteractionSource** | タッチやクリックなどのインタラクションを追跡 |

## 公式ドキュメント参考リンク

- [Compose Modifier](https://developer.android.com/jetpack/compose/modifiers?hl=ja)
- [Modifier リスト](https://developer.android.com/jetpack/compose/modifiers-list?hl=ja)
- [カスタムModifier](https://developer.android.com/jetpack/compose/custom-modifiers?hl=ja)
- [Material Design - Elevation](https://m3.material.io/styles/elevation/overview)

## 次のステップ

- [テキストとボタン](/guide/text-and-buttons) - 基本的なUIコンポーネント
- [レイアウト基礎](/guide/layouts) - Column, Row, Box
- [リスト表示](/guide/lists) - LazyColumnとLazyRow
