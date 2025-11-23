# Module 17: ユニットテスト (Coroutines & Flow)

**ゴール**: ロジック層 (ViewModel, Repository) のテストをマスターする。特に非同期処理 (Coroutines) とストリーム (Flow) のテスト手法を学ぶ。

🔗 **公式ドキュメント (日本語)**:
*   [Android でのアプリのテスト](https://developer.android.com/training/testing?hl=ja)
*   [Kotlin コルーチンのテスト](https://developer.android.com/kotlin/coroutines/test?hl=ja)

---

## 1. 基本ツールセット
*   **JUnit 5 (or 4)**: テストランナー。
*   **Mockk**: Kotlin向けのモックライブラリ (MockitoよりKotlinフレンドリー)。
*   **Truth**: アサーションライブラリ (`assertThat(actual).isEqualTo(expected)`).

```kotlin
class UserRepositoryTest {
    private val api = mockk<ApiService>()
    private val repo = UserRepository(api)

    @Test
    fun `getUser calls api`() = runTest {
        // Given
        coEvery { api.getUser("1") } returns UserResponse("1", "Alice")

        // When
        val result = repo.getUser("1")

        // Then
        assertThat(result).isEqualTo(User("1", "Alice"))
        coVerify { api.getUser("1") }
    }
}
```

---

## 2. コルーチンのテスト (`runTest`)
`suspend` 関数をテストするには `runTest` ブロックで囲みます。
これにより、遅延 (`delay`) が自動的にスキップされ、テストが即座に完了します。

### Main Dispatcher の差し替え
ViewModel内で `viewModelScope` (Main Dispatcher) を使っている場合、ユニットテスト環境には Main Looper がないためクラッシュします。
`StandardTestDispatcher` に差し替える必要があります。

```kotlin
@get:Rule
val mainDispatcherRule = MainDispatcherRule() // 自作のRule、またはExtension

class MyViewModelTest {
    @Test
    fun loadData() = runTest {
        val viewModel = MyViewModel()
        viewModel.load()
        advanceUntilIdle() // 全てのコルーチンが完了するまで進める
        assertThat(viewModel.uiState.value).isInstanceOf(Success::class.java)
    }
}
```

---

## 3. Flow のテスト (`Turbine`)
Flowは時間の経過とともに複数の値を流すため、テストが難しいです。
**Turbine** ライブラリを使うと、流れてくる値を順番に検証できます。

```kotlin
@Test
fun `flow emits loading then success`() = runTest {
    val viewModel = MyViewModel()
    
    viewModel.uiState.test {
        assertThat(awaitItem()).isEqualTo(UiState.Loading) // 初期値
        
        viewModel.refresh()
        
        assertThat(awaitItem()).isEqualTo(UiState.Success) // 更新後
        cancelAndIgnoreRemainingEvents()
    }
}
```

---

## 🛑 理解度チェック

### クイズ 1: 遅延のスキップ
`runTest` 内で `delay(1000)` を呼んだ場合、実際の実行時間はどうなる？
*   A) 1秒待つ
*   B) ほぼ0秒 (仮想時間で進む)

<details>
<summary>答え</summary>

**B) ほぼ0秒**。`runTest` は仮想時間 (Virtual Time) を使い、`delay` をスキップします。

</details>

### クイズ 2: Mainスレッド
ViewModelのテストで `Module with the Main dispatcher had failed to initialize` というエラーが出た。原因は？
*   A) `runTest` を使っていない
*   B) `Dispatchers.Main` をテスト用ディスパッチャに差し替えていない
*   C) エミュレータを使っていない

<details>
<summary>答え</summary>

**B)**。ユニットテストはJVM上で動くため、Androidのメインスレッドが存在しません。`Dispatchers.setMain` で差し替える必要があります。

</details>

### クイズ 3: Flowの検証
Flowのテストで `first()` を使うのと `Turbine` を使うのの違いは？
*   A) 違いはない
*   B) `first()` は最初の値だけだが、`Turbine` は複数の値の遷移 (`Loading` -> `Success`) を検証できる

<details>
<summary>答え</summary>

**B)**。状態遷移をテストしたい場合は Turbine が圧倒的に便利です。

</details>
