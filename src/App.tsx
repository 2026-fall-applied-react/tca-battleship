import { useEffect, useState } from 'react'
import './App.css'
import {
  Routes,
  Route,
  HashRouter
} from "react-router";
import { Home } from './pages/Home.tsx'
import { About } from './pages/About.tsx'
import { Play } from './pages/Play.tsx'
import { Setup } from './pages/Setup.tsx'

const THEME_STORAGE_KEY = 'tca-battleship:theme'

const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved)
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="p-4" data-theme={theme}>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
            <Home theme={theme} onToggleTheme={toggleTheme} />
            }
          />
          <Route
            path="/about"
            element={
              <About />
            }
          />
          <Route 
            path="/play" 
            element={
              <Play />
            } 
          />
          <Route
            path="/setup"
            element={
              <Setup />
            }
          />
        </Routes>
      </HashRouter>
    </div>        
  )
}

export default App
