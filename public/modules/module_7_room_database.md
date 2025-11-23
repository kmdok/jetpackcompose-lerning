# Module 7: Room データベース完全攻略

**ゴール**: SQLiteを抽象化したRoomライブラリを使いこなし、オフラインファーストなアプリを構築する。リレーションやマイグレーションも扱う。

🔗 **公式ドキュメント (日本語)**:
*   [Room を使用してデータをローカル データベースに保存する](https://developer.android.com/training/data-storage/room?hl=ja)
*   [Room データベースの移行 (Migration)](https://developer.android.com/training/data-storage/room/migrating-db-overview?hl=ja)

---

## 1. 基本コンポーネント
Roomは3つの主要コンポーネントで構成されます。

1.  **Entity**: データベースのテーブル。
2.  **DAO (Data Access Object)**: クエリメソッドを定義するインターフェース。
3.  **Database**: データベースの保持者。

### Entity
`@Entity` アノテーションを付けます。

```kotlin
@Entity(tableName = "users")
data class UserEntity(
    @PrimaryKey val id: String,
    val name: String,
    @ColumnInfo(name = "created_at") val createdAt: Long
)
```

### DAOとFlowの統合
戻り値を `Flow<T>` にすると、**DBの中身が変わるたびに自動で新しい値が流れてきます**。
これは `LiveData` や `Stream` と同じリアクティブな挙動です。

```kotlin
@Dao
interface UserDao {
    // 変更を監視 (SELECT)
    @Query("SELECT * FROM users")
    fun getAllUsers(): Flow<List<UserEntity>>

    // 書き込み (Suspend関数にする)
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertUser(user: UserEntity)
}
```

---

## 2. TypeConverter
Roomは基本型 (Int, Stringなど) しか保存できません。
`Date` や `List<String>` などを保存するには **TypeConverter** が必要です。

```kotlin
class Converters {
    @TypeConverter
    fun fromTimestamp(value: Long?): Date? {
        return value?.let { Date(it) }
    }

    @TypeConverter
    fun dateToTimestamp(date: Date?): Long? {
        return date?.time
    }
}

// Databaseクラスに登録
@TypeConverters(Converters::class)
@Database(...)
abstract class AppDatabase : RoomDatabase() { ... }
```

---

## 3. リレーション (1対多など)
SQLのJOINを書く代わりに、データクラスで関係性を定義できます。

**例: User (1) 対 Post (多)**

```kotlin
data class UserWithPosts(
    @Embedded val user: UserEntity,
    @Relation(
        parentColumn = "id",
        entityColumn = "user_id"
    )
    val posts: List<PostEntity>
)

// DAO
@Transaction
@Query("SELECT * FROM users")
fun getUsersWithPosts(): Flow<List<UserWithPosts>>
```

> [!NOTE]
> `@Transaction` が重要です。2回のクエリ (User取得 + Post取得) がアトミックに行われることを保証します。

---

## 4. マイグレーション (Migration)
アプリのアップデートでスキーマが変わる場合、マイグレーションが必要です。
これを怠るとアプリがクラッシュします。

### 自動マイグレーション (Auto Migration)
単純なカラム追加などは自動でできます。

```kotlin
@Database(
    version = 2,
    entities = [UserEntity::class],
    autoMigrations = [
        AutoMigration (from = 1, to = 2)
    ]
)
abstract class AppDatabase : RoomDatabase() { ... }
```

### 手動マイグレーション
複雑なデータ変換が必要な場合。

```kotlin
val MIGRATION_1_2 = object : Migration(1, 2) {
    override fun migrate(database: SupportSQLiteDatabase) {
        database.execSQL("ALTER TABLE users ADD COLUMN age INTEGER NOT NULL DEFAULT 0")
    }
}

// ビルダーで指定
Room.databaseBuilder(...)
    .addMigrations(MIGRATION_1_2)
    .build()
```

---

## 🛑 理解度チェック

### クイズ 1: DAOの戻り値
DAOの `SELECT` クエリの戻り値を `Flow<List<User>>` にしました。
`insertUser` を呼んでデータを追加すると、この Flow はどうなる？
*   A) 何も起きない (手動で再取得が必要)
*   B) 自動的に新しいリストが流れてくる
*   C) エラーになる

<details>
<summary>答え</summary>

**B) 自動的に新しいリストが流れてくる**。Roomの強力な機能です。

</details>

### クイズ 2: スレッド
DAOの `suspend` 関数 (Insertなど) は、メインスレッドで呼んでも安全？
*   A) はい (Roomが自動でバックグラウンドに移す)
*   B) いいえ (クラッシュする)

<details>
<summary>答え</summary>

**A) はい**。Roomのサスペンド関数はメインセーフです（内部で適切なディスパッチャを使います）。

</details>

### クイズ 3: マイグレーション
スキーマを変更したが、マイグレーション定義を忘れた。アプリを起動するとどうなる？
*   A) 古いデータが消えて、新しいスキーマで作り直される
*   B) 何も起きない
*   C) `IllegalStateException` でクラッシュする

<details>
<summary>答え</summary>

**C) クラッシュする**。`fallbackToDestructiveMigration()` を設定していない限り、クラッシュします。

</details>
