import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import Sucesso from './pages/Sucesso'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sucesso" element={<Sucesso />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App