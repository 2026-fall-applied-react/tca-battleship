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
import { PlayerDetail } from './pages/PlayerDetails.tsx'
import { LeaderboardProp } from './pages/Leaderboard.tsx'
import { APP_TITLE, type GameResult, type Player } from "./types";
import { loadPlayers, savePlayers } from './storage.ts'
import { Layout } from './components/Layout.tsx'
import { getLeaderboard } from './pages/GameResults.ts'

  const THEME_STORAGE_KEY = 'tca-battleship:theme'

  const dummyGameResults: GameResult[] = [
        {
            winner: "Bryson",
            players: [
                "Zack",
                "Bryson",
                "Tom",
            ],
        },
        {
            winner: "Bryson",
            players: [
                "Bryson",
                "Tom",
                "Suzzie",
            ],
        },
        {
            winner: "Zack",
            players: [
                "Zack",
                "Suzzie",
            ]
        },
        {
            winner: "John",
            players: [
                "John",
                "Tom",
            ],
        },
    ];


const App = () => {

  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [players, setPlayers] = useState<Player[]>([])
  const [title, setTitle] = useState(APP_TITLE);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved)
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    setPlayers(loadPlayers())
  }, [])


  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }

  const addPlayer = (name: string) => {
    const newPlayer: Player = {
      id: crypto.randomUUID(),
      //id: Math.random().toString(),
      name,
    }

    setPlayers((current) => {
      //console.log('Current players:', current)
      const updated = [...current, newPlayer]
      //console.log('Adding new player:', newPlayer)
      savePlayers(updated)
      console.log('Updated players:', updated)
      return updated
    })
  }

      //console.log(addPlayer);


      const [gameResults] = useState<GameResult[]>(dummyGameResults);

  return (
    <div className="p-4" data-theme={theme}>
      
      <HashRouter>
        <Routes>          
          <Route element={<Layout title={title} theme={theme} onToggleTheme={toggleTheme} players={players} onAddPlayer={addPlayer} />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/leaderboard" element={<LeaderboardProp leaderboard={getLeaderboard(gameResults)} setTitle={setTitle} />} />
            <Route path="/play" element={<Play />} />            
            <Route path="/setup" element={<Setup />} />
            <Route path="/player/:id" element={<PlayerDetail />} />
          
          </Route>
        </Routes>
      </HashRouter>
    </div>        
  )
}

export default App
