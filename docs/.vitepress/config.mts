import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Jetpack Compose & Kotlin Learning",
  description: "FlutterとReact経験者向けのJetpack Compose/Kotlin学習サイト",
  base: '/jetpackcompose-lerning/',
  lang: 'ja',

  themeConfig: {
    nav: [
      { text: 'ホーム', link: '/' },
      { text: 'ガイド', link: '/guide/introduction' },
      { text: 'Flutter/React比較', link: '/guide/comparison' }
    ],

    sidebar: [
      {
        text: 'はじめに',
        items: [
          { text: 'イントロダクション', link: '/guide/introduction' },
          { text: 'Flutter/React との比較', link: '/guide/comparison' },
          { text: '環境セットアップ', link: '/guide/setup' }
        ]
      },
      {
        text: 'Kotlin基礎',
        items: [
          { text: '基本文法', link: '/guide/kotlin-basics' },
          { text: '関数とラムダ', link: '/guide/kotlin-functions' },
          { text: 'クラスとデータクラス', link: '/guide/kotlin-classes' },
          { text: 'null安全性', link: '/guide/kotlin-null-safety' }
        ]
      },
      {
        text: 'Jetpack Compose基礎',
        items: [
          { text: 'Composableとは', link: '/guide/composables' },
          { text: 'State管理', link: '/guide/state-management' },
          { text: 'レイアウト基礎', link: '/guide/layouts' },
          { text: 'Modifierの使い方', link: '/guide/modifiers' }
        ]
      },
      {
        text: 'UIコンポーネント',
        items: [
          { text: 'テキストとボタン', link: '/guide/text-and-buttons' },
          { text: 'リスト表示', link: '/guide/lists' },
          { text: 'フォーム入力', link: '/guide/forms' },
          { text: 'ダイアログとスナックバー', link: '/guide/dialogs' }
        ]
      },
      {
        text: 'ナビゲーション',
        items: [
          { text: 'Navigation Compose', link: '/guide/navigation' },
          { text: 'パラメータの渡し方', link: '/guide/navigation-params' }
        ]
      },
      {
        text: '副作用とライフサイクル',
        items: [
          { text: 'LaunchedEffect', link: '/guide/launched-effect' },
          { text: 'DisposableEffect', link: '/guide/disposable-effect' },
          { text: 'SideEffect', link: '/guide/side-effect' }
        ]
      },
      {
        text: '実践例',
        items: [
          { text: 'TODOアプリ', link: '/examples/todo-app' },
          { text: 'APIデータ取得', link: '/examples/api-fetching' },
          { text: 'フォームバリデーション', link: '/examples/form-validation' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kmdok/jetpackcompose-lerning' }
    ],

    footer: {
      message: 'Jetpack Compose & Kotlin学習サイト',
      copyright: 'MIT Licensed'
    }
  }
})
