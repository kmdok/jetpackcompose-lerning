import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Comparison from './pages/Comparison'
import KotlinBasics from './pages/KotlinBasics'
import Composables from './pages/Composables'
import StateManagement from './pages/StateManagement'
import StateComparison from './pages/StateComparison'
import DependencyInjection from './pages/DependencyInjection'
import ReactFlutterMapping from './pages/ReactFlutterMapping'
import Layouts from './pages/Layouts'
import Lists from './pages/Lists'
import Navigation from './pages/Navigation'
import TodoApp from './pages/TodoApp'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comparison" element={<Comparison />} />
        <Route path="/kotlin-basics" element={<KotlinBasics />} />
        <Route path="/composables" element={<Composables />} />
        <Route path="/state-management" element={<StateManagement />} />
        <Route path="/state-comparison" element={<StateComparison />} />
        <Route path="/dependency-injection" element={<DependencyInjection />} />
        <Route path="/react-flutter-mapping" element={<ReactFlutterMapping />} />
        <Route path="/layouts" element={<Layouts />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/todo-app" element={<TodoApp />} />
      </Routes>
    </Layout>
  )
}

export default App
