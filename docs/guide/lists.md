# リスト表示

Jetpack Composeでのリスト表示方法を学びます。

## LazyColumn vs Column

::: info LazyColumnとは
**LazyColumn**は、画面に表示される要素のみをレンダリングする効率的なリストコンポーネントです。

FlutterのListView.builder、ReactのVirtualized Listに相当します。
:::

### Column - 小規模なリスト

```kotlin
Column {
    items.forEach { item ->
        Text(item)
    }
}
```

::: warning
Columnは全要素を一度にレンダリングするため、大量のデータには不向きです。
:::

### LazyColumn - 大規模なリスト（推奨）

```kotlin
LazyColumn {
    items(itemsList) { item ->
        Text(item)
    }
}
```

::: tip
**LazyColumn**は必要な要素のみをレンダリングするため、パフォーマンスが良いです。
:::

## 基本的なLazyColumn

### シンプルなリスト

```kotlin
@Composable
fun SimpleList() {
    val items = remember { (1..100).map { "Item $it" } }

    LazyColumn {
        items(items) { item ->
            Text(
                text = item,
                modifier = Modifier.padding(16.dp)
            )
        }
    }
}
```

### インデックス付き

```kotlin
LazyColumn {
    itemsIndexed(items) { index, item ->
        Text("$index: $item")
    }
}
```

## リストアイテムのカスタマイズ

### クリック可能なアイテム

```kotlin
data class User(val id: Int, val name: String)

@Composable
fun UserList(users: List<User>, onUserClick: (User) -> Unit) {
    LazyColumn {
        items(users) { user ->
            UserItem(
                user = user,
                onClick = { onUserClick(user) }
            )
        }
    }
}

@Composable
fun UserItem(user: User, onClick: () -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(
            imageVector = Icons.Default.Person,
            contentDescription = null,
            modifier = Modifier.size(40.dp)
        )
        Spacer(modifier = Modifier.width(16.dp))
        Text(user.name, fontSize = 18.sp)
    }
}
```

### セパレーター（区切り線）

```kotlin
LazyColumn {
    items(users.size) { index ->
        UserItem(users[index])

        if (index < users.size - 1) {
            Divider()  // 区切り線
        }
    }
}
```

## LazyColumnのカスタマイズ

### パディング

```kotlin
LazyColumn(
    contentPadding = PaddingValues(16.dp)
) {
    items(items) { item ->
        Text(item)
    }
}
```

### アイテム間のスペース

```kotlin
LazyColumn(
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
    items(items) { item ->
        Text(item)
    }
}
```

### スクロール位置の制御

```kotlin
@Composable
fun ScrollableList() {
    val listState = rememberLazyListState()

    Column {
        Button(onClick = {
            // 最初にスクロール
            listState.animateScrollToItem(0)
        }) {
            Text("トップへ")
        }

        LazyColumn(state = listState) {
            items(100) { index ->
                Text("Item $index")
            }
        }
    }
}
```

::: info rememberLazyListStateとは
LazyColumnのスクロール状態を管理するオブジェクト。スクロール位置の取得や制御が可能です。
:::

## LazyRow - 横スクロールリスト

```kotlin
@Composable
fun HorizontalList() {
    LazyRow(
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        contentPadding = PaddingValues(horizontal = 16.dp)
    ) {
        items(items) { item ->
            Card(
                modifier = Modifier.size(120.dp)
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Text(item)
                }
            }
        }
    }
}
```

## グリッドレイアウト

### LazyVerticalGrid

```kotlin
@Composable
fun PhotoGrid(photos: List<String>) {
    LazyVerticalGrid(
        columns = GridCells.Fixed(3),  // 3列固定
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp),
        contentPadding = PaddingValues(8.dp)
    ) {
        items(photos) { photoUrl ->
            AsyncImage(
                model = photoUrl,
                contentDescription = null,
                modifier = Modifier
                    .aspectRatio(1f)
                    .clip(RoundedCornerShape(8.dp))
            )
        }
    }
}
```

::: info GridCellsの種類
- `GridCells.Fixed(count)`: 固定列数
- `GridCells.Adaptive(minSize)`: 最小サイズに基づいて自動調整
:::

### 可変サイズのグリッド

```kotlin
LazyVerticalGrid(
    columns = GridCells.Adaptive(minSize = 100.dp)
) {
    items(photos) { photo ->
        // アイテム
    }
}
```

## Sticky Header

```kotlin
@Composable
fun ContactList(contacts: Map<Char, List<Contact>>) {
    LazyColumn {
        contacts.forEach { (initial, contactsForInitial) ->
            stickyHeader {
                Text(
                    text = initial.toString(),
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(Color.Gray)
                        .padding(16.dp),
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold
                )
            }

            items(contactsForInitial) { contact ->
                ContactItem(contact)
            }
        }
    }
}
```

::: info Sticky Headerとは
スクロール時に上部に固定されるヘッダー。連絡先アプリの「あ、か、さ...」のような見出しに使います。
:::

## Pull to Refresh

```kotlin
@OptIn(ExperimentalMaterialApi::class)
@Composable
fun PullToRefreshList() {
    var isRefreshing by remember { mutableStateOf(false) }
    val items = remember { mutableStateListOf<String>() }

    LaunchedEffect(isRefreshing) {
        if (isRefreshing) {
            delay(2000)  // データ取得をシミュレート
            items.add("New Item")
            isRefreshing = false
        }
    }

    SwipeRefresh(
        state = rememberSwipeRefreshState(isRefreshing),
        onRefresh = { isRefreshing = true }
    ) {
        LazyColumn {
            items(items) { item ->
                Text(item, modifier = Modifier.padding(16.dp))
            }
        }
    }
}
```

::: warning
Pull to RefreshはMaterial 3では異なる実装になります。`pullRefresh` Modifierを使用します。
:::

## 無限スクロール

```kotlin
@Composable
fun InfiniteList() {
    var items by remember { mutableStateOf((1..20).toList()) }
    val listState = rememberLazyListState()

    LaunchedEffect(listState) {
        snapshotFlow { listState.layoutInfo.visibleItemsInfo.lastOrNull()?.index }
            .collect { lastVisibleIndex ->
                if (lastVisibleIndex != null && lastVisibleIndex >= items.size - 5) {
                    // 最後から5番目に到達したら追加読み込み
                    items = items + ((items.size + 1)..(items.size + 20))
                }
            }
    }

    LazyColumn(state = listState) {
        items(items) { item ->
            Text("Item $item", modifier = Modifier.padding(16.dp))
        }
    }
}
```

::: info snapshotFlowとは
Composeの状態を観察してFlowとして公開する関数。スクロール位置の監視などに使います。
:::

## アニメーション

### アイテムの追加/削除アニメーション

```kotlin
@Composable
fun AnimatedList() {
    var items by remember { mutableStateOf(listOf<Int>()) }

    Column {
        Button(onClick = {
            items = items + (items.size + 1)
        }) {
            Text("Add Item")
        }

        LazyColumn {
            items(
                items = items,
                key = { it }  // keyを指定すると適切にアニメーション
            ) { item ->
                AnimatedVisibility(
                    visible = true,
                    enter = fadeIn() + expandVertically()
                ) {
                    Text(
                        "Item $item",
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(Color.LightGray)
                            .padding(16.dp)
                    )
                }
            }
        }
    }
}
```

## パフォーマンスの最適化

### keyの使用

```kotlin
LazyColumn {
    items(
        items = users,
        key = { user -> user.id }  // ユニークなkeyを指定
    ) { user ->
        UserItem(user)
    }
}
```

::: tip なぜkeyが重要か
keyを指定することで、Composeはアイテムを正しく識別し、効率的に再構築できます。
:::

### contentTypeの指定

```kotlin
LazyColumn {
    items(
        items = messages,
        key = { it.id },
        contentType = { it.type }  // アイテムタイプを指定
    ) { message ->
        when (message.type) {
            MessageType.TEXT -> TextMessage(message)
            MessageType.IMAGE -> ImageMessage(message)
        }
    }
}
```

## 実践例

### ニュースフィード

```kotlin
data class Article(
    val id: Int,
    val title: String,
    val summary: String,
    val imageUrl: String
)

@Composable
fun NewsFeed(articles: List<Article>, onArticleClick: (Article) -> Unit) {
    LazyColumn(
        verticalArrangement = Arrangement.spacedBy(16.dp),
        contentPadding = PaddingValues(16.dp)
    ) {
        items(articles, key = { it.id }) { article ->
            ArticleCard(
                article = article,
                onClick = { onArticleClick(article) }
            )
        }
    }
}

@Composable
fun ArticleCard(article: Article, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        elevation = CardDefaults.cardElevation(4.dp)
    ) {
        Column {
            AsyncImage(
                model = article.imageUrl,
                contentDescription = null,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(200.dp),
                contentScale = ContentScale.Crop
            )
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = article.title,
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = article.summary,
                    fontSize = 14.sp,
                    color = Color.Gray
                )
            }
        }
    }
}
```

## 重要な用語集

| 用語 | 説明 |
|------|------|
| **LazyColumn** | 画面に表示される要素のみをレンダリングする縦スクロールリスト |
| **LazyRow** | 横スクロール版のLazyColumn |
| **LazyVerticalGrid** | グリッドレイアウトのリスト |
| **LazyListState** | リストのスクロール状態を管理 |
| **Sticky Header** | スクロール時に上部に固定されるヘッダー |
| **contentType** | アイテムの種類を指定してパフォーマンスを最適化 |
| **key** | アイテムを一意に識別する値 |

## 公式ドキュメント参考リンク

- [Lists and grids](https://developer.android.com/jetpack/compose/lists?hl=ja)
- [LazyColumn](https://developer.android.com/reference/kotlin/androidx/compose/foundation/lazy/package-summary?hl=ja#LazyColumn(androidx.compose.ui.Modifier,androidx.compose.foundation.lazy.LazyListState,androidx.compose.foundation.layout.PaddingValues,kotlin.Boolean,androidx.compose.foundation.layout.Arrangement.Vertical,androidx.compose.ui.Alignment.Horizontal,androidx.compose.foundation.gestures.FlingBehavior,kotlin.Boolean,kotlin.Function1))
- [Performance best practices](https://developer.android.com/jetpack/compose/performance?hl=ja)

## 次のステップ

- [ナビゲーション](/guide/navigation) - 画面遷移を学ぶ
- [実践例: TODOアプリ](/examples/todo-app) - リストを使った実践例
