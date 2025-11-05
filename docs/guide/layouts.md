# レイアウト基礎

Jetpack Composeでのレイアウト構築方法を学びます。

## 重要な概念

::: info レイアウトとは
UIコンポーネントを画面上にどのように配置するかを決定する仕組みです。HTML/CSSのFlexbox、FlutterのColumn/Rowと同様の概念です。
:::

::: info 宣言的レイアウト
Composeは宣言的UIフレームワークなので、「どう見えるべきか」を記述します。従来のAndroidのXMLレイアウトと異なり、コードでレイアウトを直接表現します。
:::

## 基本的なレイアウト

### Column - 縦方向配置

```kotlin
Column {
    Text("Item 1")
    Text("Item 2")
    Text("Item 3")
}
```

::: tip Flutter/Reactとの比較
```dart
// Flutter
Column(
  children: [
    Text('Item 1'),
    Text('Item 2'),
  ],
)

// React (Flexbox)
<div style={{ display: 'flex', flexDirection: 'column' }}>
  <span>Item 1</span>
  <span>Item 2</span>
</div>

// Compose
Column {
    Text("Item 1")
    Text("Item 2")
}
```
:::

### Row - 横方向配置

```kotlin
Row {
    Text("Left")
    Text("Center")
    Text("Right")
}
```

### Box - 重ね合わせ

BoxはFlutterのStackに相当し、子要素を重ねて配置します。

```kotlin
Box {
    Image(/* 背景画像 */)
    Text("Text on top", modifier = Modifier.align(Alignment.Center))
}
```

::: info Boxとは
複数の要素を重ねて表示するレイアウトコンポーネント。Z軸方向に要素を配置します。
:::

## 配置のカスタマイズ

### Columnの配置

```kotlin
Column(
    modifier = Modifier.fillMaxSize(),
    verticalArrangement = Arrangement.Center,        // 縦方向の配置
    horizontalAlignment = Alignment.CenterHorizontally  // 横方向の整列
) {
    Text("Centered")
    Text("Content")
}
```

#### verticalArrangement オプション

```kotlin
// 上詰め
Arrangement.Top

// 中央
Arrangement.Center

// 下詰め
Arrangement.Bottom

// 均等配置
Arrangement.SpaceEvenly

// 両端配置
Arrangement.SpaceBetween

// 周囲に余白を持って配置
Arrangement.SpaceAround

// カスタム間隔
Arrangement.spacedBy(16.dp)
```

#### horizontalAlignment オプション

```kotlin
Alignment.Start        // 左揃え
Alignment.CenterHorizontally  // 中央揃え
Alignment.End          // 右揃え
```

### Rowの配置

```kotlin
Row(
    modifier = Modifier.fillMaxWidth(),
    horizontalArrangement = Arrangement.SpaceBetween,  // 横方向の配置
    verticalAlignment = Alignment.CenterVertically      // 縦方向の整列
) {
    Text("Left")
    Text("Right")
}
```

## Modifier の基礎

::: info Modifierとは
Composableの見た目や動作をカスタマイズするための仕組みです。FlutterのWidgetラッピングやReactのstyle propに相当しますが、より柔軟でチェーン可能です。
:::

### 基本的なModifier

```kotlin
Text(
    "Styled text",
    modifier = Modifier
        .padding(16.dp)           // 内側の余白
        .background(Color.Blue)    // 背景色
        .fillMaxWidth()           // 横幅いっぱい
        .height(100.dp)           // 高さ指定
)
```

::: warning Modifierの順序は重要
Modifierは上から順に適用されます。順序が異なると結果も変わります。
:::

### サイズ指定

```kotlin
// 固定サイズ
Modifier.size(100.dp)
Modifier.width(200.dp)
Modifier.height(50.dp)

// 親要素いっぱいに
Modifier.fillMaxSize()      // 縦横両方
Modifier.fillMaxWidth()     // 横のみ
Modifier.fillMaxHeight()    // 縦のみ

// 比率指定
Modifier.fillMaxWidth(0.5f)  // 50%の幅
```

### padding と margin

Composeには`margin`という概念はなく、すべて`padding`で表現します。

```kotlin
// 全方向に同じpadding
Modifier.padding(16.dp)

// 縦横で異なる
Modifier.padding(horizontal = 16.dp, vertical = 8.dp)

// 個別指定
Modifier.padding(
    start = 16.dp,
    top = 8.dp,
    end = 16.dp,
    bottom = 8.dp
)
```

::: tip dpとは
**dp (Density-independent Pixels)**: デバイスの画面密度に依存しない単位。異なる画面密度でも同じ物理サイズで表示されます。
:::

### 背景とボーダー

```kotlin
Modifier
    .background(Color.Blue)
    .background(Color.Blue, shape = RoundedCornerShape(8.dp))
    .border(2.dp, Color.Red)
    .border(2.dp, Color.Red, shape = CircleShape)
```

### クリップ（角丸など）

```kotlin
Image(
    painter = painterResource(R.drawable.avatar),
    contentDescription = null,
    modifier = Modifier
        .size(80.dp)
        .clip(CircleShape)  // 円形にクリップ
)
```

## Weight - 比率指定

FlutterのExpandedやReactのflex-growに相当します。

```kotlin
Row(modifier = Modifier.fillMaxWidth()) {
    Box(
        modifier = Modifier
            .weight(1f)  // 1/3の幅
            .background(Color.Red)
            .height(50.dp)
    )
    Box(
        modifier = Modifier
            .weight(2f)  // 2/3の幅
            .background(Color.Blue)
            .height(50.dp)
    )
}
```

::: info weightとは
親要素の残りスペースを比率で分配する仕組み。`weight(1f)`と`weight(2f)`なら1:2の比率になります。
:::

## Spacer - スペース挿入

要素間に余白を入れるための専用Composable。

```kotlin
Column {
    Text("First")
    Spacer(modifier = Modifier.height(16.dp))
    Text("Second")
}

Row {
    Text("Left")
    Spacer(modifier = Modifier.width(8.dp))
    Text("Right")
}
```

## 実践例

### プロフィールカード

```kotlin
@Composable
fun ProfileCard(
    name: String,
    bio: String,
    avatarUrl: String
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        elevation = CardDefaults.cardElevation(4.dp)
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // アバター画像
            AsyncImage(
                model = avatarUrl,
                contentDescription = null,
                modifier = Modifier
                    .size(60.dp)
                    .clip(CircleShape)
            )

            Spacer(modifier = Modifier.width(16.dp))

            // テキスト情報
            Column(
                modifier = Modifier.weight(1f)
            ) {
                Text(
                    text = name,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = bio,
                    fontSize = 14.sp,
                    color = Color.Gray
                )
            }
        }
    }
}
```

### グリッドレイアウト

```kotlin
@Composable
fun PhotoGrid(photos: List<String>) {
    Column {
        photos.chunked(3).forEach { rowPhotos ->
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                rowPhotos.forEach { photoUrl ->
                    AsyncImage(
                        model = photoUrl,
                        contentDescription = null,
                        modifier = Modifier
                            .weight(1f)
                            .aspectRatio(1f)
                            .clip(RoundedCornerShape(8.dp))
                    )
                }
            }
            Spacer(modifier = Modifier.height(8.dp))
        }
    }
}
```

## ConstraintLayout（高度）

複雑なレイアウトには`ConstraintLayout`も使えます。

```kotlin
implementation("androidx.constraintlayout:constraintlayout-compose:1.0.1")
```

```kotlin
@Composable
fun ConstraintLayoutExample() {
    ConstraintLayout(modifier = Modifier.fillMaxSize()) {
        val (button, text) = createRefs()

        Button(
            onClick = { },
            modifier = Modifier.constrainAs(button) {
                top.linkTo(parent.top, margin = 16.dp)
                start.linkTo(parent.start)
                end.linkTo(parent.end)
            }
        ) {
            Text("Button")
        }

        Text(
            "Text below button",
            modifier = Modifier.constrainAs(text) {
                top.linkTo(button.bottom, margin = 16.dp)
                centerHorizontallyTo(parent)
            }
        )
    }
}
```

::: tip
ConstraintLayoutは複雑なレイアウトに便利ですが、Column/Row/Boxで十分な場合はそちらを優先しましょう。
:::

## 重要な用語集

| 用語 | 説明 |
|------|------|
| **dp (Density-independent Pixels)** | デバイスの画面密度に依存しない単位 |
| **sp (Scale-independent Pixels)** | ユーザーのフォントサイズ設定を考慮する単位（テキストに使用） |
| **Modifier** | Composableの見た目や動作をカスタマイズする仕組み |
| **Arrangement** | Column/Row内の要素の配置方法 |
| **Alignment** | 要素の整列方法 |
| **Weight** | 親要素のスペースを比率で分配 |
| **Composable** | `@Composable`アノテーションが付いたUI関数 |

## 公式ドキュメント参考リンク

- [Jetpack Compose レイアウトの基本](https://developer.android.com/jetpack/compose/layouts/basics?hl=ja)
- [Modifier](https://developer.android.com/jetpack/compose/modifiers?hl=ja)
- [Column, Row, Box](https://developer.android.com/jetpack/compose/layouts/basics?hl=ja#column)
- [ConstraintLayout](https://developer.android.com/jetpack/compose/layouts/constraintlayout?hl=ja)

## 次のステップ

- [Modifierの使い方](/guide/modifiers) - Modifierを深く学ぶ
- [テキストとボタン](/guide/text-and-buttons) - 基本的なUIコンポーネント
- [リスト表示](/guide/lists) - LazyColumnでリストを表示
