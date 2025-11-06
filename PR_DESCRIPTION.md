# Kotlin Flow 完全ガイドを追加

## 概要

Kotlin Flowの包括的なドキュメントを追加しました。

## 変更内容

### 新規追加ファイル
- `docs/guide/kotlin-flow.md` - Kotlin Flow完全ガイド

### 変更ファイル
- `docs/.vitepress/config.mts` - サイドバーナビゲーションに新しいガイドを追加

## ドキュメントの内容

### カバーしている主要トピック

1. **Flowの基礎**
   - Flow、StateFlow、SharedFlowの違い
   - Cold StreamとHot Streamの説明
   - React/Flutterとの対比

2. **Flow Builders**
   - flow { }、flowOf()、asFlow()、channelFlow
   - 各ビルダーの使用例

3. **Flow Operators（演算子）**
   - 変換系: map, filter, transform
   - 結合系: combine, zip
   - フロー制御系: debounce, distinctUntilChanged, take
   - 切り替え系: flatMapLatest, flatMapConcat, flatMapMerge

4. **Jetpack Composeでの使用**
   - collectAsState()の使い方
   - collectAsStateWithLifecycle()の推奨事項
   - LaunchedEffect内でのcollect

5. **stateIn - FlowをStateFlowに変換**
   - SharingStartedの各種設定
   - WhileSubscribedの推奨設定

6. **エラーハンドリング**
   - catch operator
   - retry/retryWhen
   - 実用的なエラー処理パターン

7. **実践例**
   - リアルタイム検索機能
   - Room Databaseとの連携
   - 複数のデータソースの結合
   - ページネーション実装

8. **テスト**
   - StateFlowのテスト方法
   - Turbineを使ったFlowのテスト
   - 手動テストの実装例

9. **パフォーマンス最適化**
   - conflate、buffer、flowOnの使い方

10. **よくある間違いと対策**
    - アンチパターンの紹介
    - ベストプラクティス

## 技術的な特徴

- ✅ 日本語で詳細に解説
- ✅ React/Flutterとの対比を含む
- ✅ 実用的なコード例が豊富
- ✅ Jetpack Composeとの統合方法を説明
- ✅ エラーハンドリングとテストをカバー
- ✅ VitePress形式のヒント/警告ボックスを活用

## 関連リンク

- Android公式ドキュメントへのリファレンスを含む
- 既存の「LiveData vs Flow 比較」ページとの連携

## テストプラン

- [x] ドキュメントのマークダウン構文が正しい
- [x] VitePressのサイドバーに正しく表示される
- [x] コード例の構文が正しい
- [x] 内部リンクが正しく機能する
