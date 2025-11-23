import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ModuleList from './pages/ModuleList'
import ModuleViewer from './pages/ModuleViewer'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ModuleList />} />
        <Route path="/module/:moduleId" element={<ModuleViewer />} />
      </Routes>
    </Layout>
  )
}

export default App
