import './App.css'
import { 
  Routes,
  Route,
  HashRouter 
} from "react-router";
import { Home } from './pages/Home.tsx'
import { About } from './pages/About.tsx'
import { Play } from './pages/Play.tsx'

const App = () => {
  return (
    <div className="p-4">
      <HashRouter>
        <Routes>
          <Route 
            path="/" 
            element={
            <Home />
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
        </Routes>
      </HashRouter>
    </div>        
  )
}

export default App
