# フォーム入力

Jetpack Composeでのフォーム入力コンポーネントを学びます。

## TextField - テキスト入力

### 基本的な使い方

```kotlin
var text by remember { mutableStateOf("") }

TextField(
    value = text,
    onValueChange = { text = it },
    label = { Text("名前") }
)
```

### OutlinedTextField

```kotlin
OutlinedTextField(
    value = text,
    onValueChange = { text = it },
    label = { Text("Email") },
    placeholder = { Text("example@email.com") }
)
```

### バリデーション

```kotlin
var email by remember { mutableStateOf("") }
val isValid = email.contains("@")

OutlinedTextField(
    value = email,
    onValueChange = { email = it },
    label = { Text("Email") },
    isError = !isValid && email.isNotEmpty(),
    supportingText = {
        if (!isValid && email.isNotEmpty()) {
            Text("有効なメールアドレスを入力してください")
        }
    }
)
```

### パスワード入力

```kotlin
var password by remember { mutableStateOf("") }
var passwordVisible by remember { mutableStateOf(false) }

OutlinedTextField(
    value = password,
    onValueChange = { password = it },
    label = { Text("Password") },
    visualTransformation = if (passwordVisible) {
        VisualTransformation.None
    } else {
        PasswordVisualTransformation()
    },
    trailingIcon = {
        IconButton(onClick = { passwordVisible = !passwordVisible }) {
            Icon(
                imageVector = if (passwordVisible) {
                    Icons.Default.Visibility
                } else {
                    Icons.Default.VisibilityOff
                },
                contentDescription = if (passwordVisible) "Hide password" else "Show password"
            )
        }
    }
)
```

## Checkbox - チェックボックス

```kotlin
var checked by remember { mutableStateOf(false) }

Row(verticalAlignment = Alignment.CenterVertically) {
    Checkbox(
        checked = checked,
        onCheckedChange = { checked = it }
    )
    Text("同意する")
}
```

## RadioButton - ラジオボタン

```kotlin
var selectedOption by remember { mutableStateOf("Option 1") }
val options = listOf("Option 1", "Option 2", "Option 3")

Column {
    options.forEach { option ->
        Row(verticalAlignment = Alignment.CenterVertically) {
            RadioButton(
                selected = selectedOption == option,
                onClick = { selectedOption = option }
            )
            Text(option)
        }
    }
}
```

## Switch - スイッチ

```kotlin
var checked by remember { mutableStateOf(false) }

Switch(
    checked = checked,
    onCheckedChange = { checked = it }
)
```

## Slider - スライダー

```kotlin
var sliderValue by remember { mutableStateOf(0f) }

Column {
    Slider(
        value = sliderValue,
        onValueChange = { sliderValue = it },
        valueRange = 0f..100f
    )
    Text("Value: ${sliderValue.toInt()}")
}
```

## 公式ドキュメント参考リンク

- [Text fields](https://developer.android.com/jetpack/compose/text/user-input?hl=ja)
- [Selection controls](https://m3.material.io/components/selection-controls/overview)

## 次のステップ

- [State管理](/guide/state-management) - 状態管理を学ぶ
- [実践例: TODOアプリ](/examples/todo-app) - 実践的なフォーム例
