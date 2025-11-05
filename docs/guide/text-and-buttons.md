# テキストとボタン

Jetpack Composeの基本的なUIコンポーネントを学びます。

## Text - テキスト表示

### 基本的な使い方

```kotlin
Text("Hello, Compose!")
```

### スタイリング

```kotlin
Text(
    text = "Styled Text",
    fontSize = 24.sp,
    fontWeight = FontWeight.Bold,
    color = Color.Blue,
    fontStyle = FontStyle.Italic,
    textDecoration = TextDecoration.Underline
)
```

::: info spとは
**sp (Scale-independent Pixels)**: ユーザーのフォントサイズ設定を考慮する単位。テキストには`sp`、他の要素には`dp`を使います。
:::

### 複数行テキスト

```kotlin
Text(
    text = "This is a very long text that will wrap to multiple lines automatically when it exceeds the container width",
    maxLines = 2,
    overflow = TextOverflow.Ellipsis  // "..."で省略
)
```

### テキストの整列

```kotlin
Text(
    text = "Centered Text",
    textAlign = TextAlign.Center,
    modifier = Modifier.fillMaxWidth()
)
```

### カスタムフォント

```kotlin
Text(
    text = "Custom Font",
    fontFamily = FontFamily(Font(R.font.my_font))
)
```

## Button - ボタン

### 基本的なボタン

```kotlin
Button(onClick = { println("Clicked!") }) {
    Text("Click me")
}
```

### カスタマイズ

```kotlin
Button(
    onClick = { },
    colors = ButtonDefaults.buttonColors(
        containerColor = Color.Blue,
        contentColor = Color.White
    ),
    shape = RoundedCornerShape(8.dp),
    modifier = Modifier
        .fillMaxWidth()
        .height(56.dp)
) {
    Icon(Icons.Default.Add, contentDescription = null)
    Spacer(modifier = Modifier.width(8.dp))
    Text("Add Item")
}
```

### 無効化

```kotlin
var isEnabled by remember { mutableStateOf(true) }

Button(
    onClick = { },
    enabled = isEnabled
) {
    Text("Button")
}
```

### ローディング状態

```kotlin
var isLoading by remember { mutableStateOf(false) }

Button(
    onClick = {
        isLoading = true
        // 処理
    },
    enabled = !isLoading
) {
    if (isLoading) {
        CircularProgressIndicator(
            modifier = Modifier.size(20.dp),
            color = Color.White
        )
    } else {
        Text("Submit")
    }
}
```

## その他のボタン

### OutlinedButton - アウトラインボタン

```kotlin
OutlinedButton(onClick = { }) {
    Text("Outlined")
}
```

### TextButton - テキストボタン

```kotlin
TextButton(onClick = { }) {
    Text("Text Button")
}
```

### IconButton - アイコンボタン

```kotlin
IconButton(onClick = { }) {
    Icon(Icons.Default.Favorite, contentDescription = "Like")
}
```

### FloatingActionButton - FAB

```kotlin
FloatingActionButton(onClick = { }) {
    Icon(Icons.Default.Add, contentDescription = "Add")
}
```

## Icon - アイコン

### Material Icons

```kotlin
Icon(
    imageVector = Icons.Default.Home,
    contentDescription = "Home",
    tint = Color.Blue
)
```

### カスタムアイコン

```kotlin
Icon(
    painter = painterResource(id = R.drawable.ic_custom),
    contentDescription = "Custom Icon"
)
```

## Image - 画像表示

### リソースからの画像

```kotlin
Image(
    painter = painterResource(id = R.drawable.my_image),
    contentDescription = "Description",
    modifier = Modifier.size(100.dp)
)
```

### URL画像（Coil使用）

```kotlin
// build.gradle.kts
implementation("io.coil-kt:coil-compose:2.5.0")

AsyncImage(
    model = "https://example.com/image.jpg",
    contentDescription = null,
    modifier = Modifier
        .fillMaxWidth()
        .height(200.dp),
    contentScale = ContentScale.Crop
)
```

::: info Coilとは
Androidで画像を非同期に読み込むためのライブラリ。URL画像のキャッシュや表示を簡単に行えます。
:::

## 公式ドキュメント参考リンク

- [Text](https://developer.android.com/jetpack/compose/text?hl=ja)
- [Button](https://developer.android.com/reference/kotlin/androidx/compose/material3/package-summary?hl=ja#Button(kotlin.Function0,androidx.compose.ui.Modifier,kotlin.Boolean,androidx.compose.ui.graphics.Shape,androidx.compose.material3.ButtonColors,androidx.compose.material3.ButtonElevation,androidx.compose.foundation.BorderStroke,androidx.compose.foundation.layout.PaddingValues,androidx.compose.foundation.interaction.MutableInteractionSource,kotlin.Function1))
- [Images](https://developer.android.com/jetpack/compose/graphics/images?hl=ja)

## 次のステップ

- [フォーム入力](/guide/forms) - TextField、Checkbox、RadioButtonを学ぶ
