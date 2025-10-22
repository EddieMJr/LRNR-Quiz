import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Quiz from './pages/Quiz.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/quiz' element={<Quiz />}/>
        <Route path='/*' element={<h1>404! Page Currently Unavailable!</h1>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
