import DefaultTheme from 'vitepress/theme'
import './custom.css'
import CodeComparison from './components/CodeComparison.vue'
import ComparisonCard from './components/ComparisonCard.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CodeComparison', CodeComparison)
    app.component('ComparisonCard', ComparisonCard)
  }
}
