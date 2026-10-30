import './App.css'
import {
  HashRouter,
  Routes,
  Route,
} from 'react-router'
import { useEffect, useState } from 'react'
import { APP_TITLE, Home } from './pages/Home'
import { Setup } from './pages/Setup'
import { Play } from './pages/Play'
import { PlayerDetail } from './pages/PlayerDetail'
import { Layout } from './components/Layout'
import { getGeneralFacts, getLeaderboard, getPreviousPlayers, type GameResult, type FleetStatus, type Grid, type ShipId, type ShotLogEntry, type Theme  } from './GameResults'
import { cycleCell, makeEmptyGrid, makeInitialFleetStatus, nextCellState } from './gridLogic'
import { useLocalStorageState } from './hooks/useLocalStorageState'
import { useLocalForageState } from './hooks/useLocalForageState'

// Sample games 
const dummyGameResults: GameResult[] = [
  {
    winner: "Bryson",
    players: ["Zack", "Bryson"],
    start: "2026-10-13T22:56:41.883Z",
    end: "2026-10-13T23:16:59.883Z",
  },
  {
    winner: "Bryson",
    players: ["Bryson", "Tom"],
    start: "2026-10-13T23:30:41.883Z",
    end: "2026-10-13T23:41:02.883Z",
  },
  {
    winner: "Zack",
    players: ["Zack", "Suzzie"],
    start: "2026-10-14T22:56:41.883Z",
    end: "2026-10-14T23:26:09.883Z",
  },
  {
    winner: "Mike",
    players: ["Mike", "Suzzie"],
    start: "2026-10-16T22:56:41.883Z",
    end: "2026-10-16T23:26:09.883Z",
  },
  {
    winner: "John",
    players: ["John", "Tom"],
    start: "2026-10-15T22:56:41.883Z",
    end: "2026-10-15T23:16:02.883Z",
  },
];

const KEYS = {
  theme: 'tca-battleship:theme',
  gameResults: 'tca-battleship:game-results',
  currentPlayers: 'tca-battleship:current-players',
  gameStart: 'tca-battleship:game-start',
  grid: 'tca-battleship:grid',
  fleetStatus: 'tca-battleship:fleet',
  shotLog: 'tca-battleship:shots',
};

const getBrowserTheme = (): Theme => (
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
);

const App = () => {

  // hooks
  
  const [title, setTitle] = useState(APP_TITLE);

  // 'light' or 'dark'. Starts as the browser's setting, then remembers
  // whatever the toggle button last chose.
  const [theme, setTheme, themeLoaded] = useLocalForageState<Theme>(KEYS.theme, getBrowserTheme);

  // finished games (this is what the leaderboard is built from)
  const [gameResults, setGameResults] = useLocalStorageState<GameResult[]>(KEYS.gameResults, dummyGameResults);

  // the game being played right now
  const [currentPlayers, setCurrentPlayers] = useLocalStorageState<string[]>(KEYS.currentPlayers, []);
  const [gameStart, setGameStart] = useLocalStorageState<string>(KEYS.gameStart, '');
  const [grid, setGrid] = useLocalStorageState<Grid>(KEYS.grid, makeEmptyGrid);
  const [fleetStatus, setFleetStatus] = useLocalStorageState<FleetStatus>(KEYS.fleetStatus, makeInitialFleetStatus);
  const [shotLog, setShotLog] = useLocalStorageState<ShotLogEntry[]>(KEYS.shotLog, []);

  // Tell daisyUI which theme to use. 
  useEffect(
    () => document.documentElement.setAttribute('data-theme', `battleship-${theme}`),
    [theme],
  );

 //helper funcs
  const toggleTheme = () => setTheme(
    current => current === 'light' ? 'dark' : 'light'
  );

  // Setup's "Play" button: remember who is playing and when it started,THIS SUCKED!!!
  const startGame = (players: string[]) => {
    setCurrentPlayers(players);
    setGameStart(new Date().toISOString());
    setGrid(makeEmptyGrid());
    setFleetStatus(makeInitialFleetStatus());
    setShotLog([]);
  };

  // A click on the board: change that one cell, and add a line to the shot
  // history. [...shotLog, entry] makes a new array . but is there a better way to do this? I don't want to mutate the old array, but I also don't want to copy the whole thing every time. Maybe a linked list? Or a ring buffer? Or just keep the last 100 shots or something?
  const clickCell = (row: number, col: number) => {
    const index = row * 10 + col;

    setGrid(
      grid => cycleCell(grid, index)
    );
    setShotLog(
      [
        ...shotLog,
        {
          row,
          col,
          result: nextCellState(grid[index]),
          timestamp: Date.now(),
        },
      ]
    );
  };

  // A ship's "Mark sunk" / "Mark afloat" button
  const toggleSunk = (id: ShipId) => setFleetStatus(
    status => ({
      ...status,
      [id]: status[id] === 'sunk' ? 'afloat' : 'sunk',
    })
  );

  //and then of the 2 players, pass back the winner
  const finishGame = (winner: string) => {
    setGameResults(
      [
        ...gameResults,
        {
          winner,
          players: currentPlayers,
          start: gameStart,
          end: new Date().toISOString(),
        },
      ]
    );
    setCurrentPlayers([]);
  };

  useEffect(
  () => {
    if (themeLoaded) {
      document.documentElement.setAttribute('data-theme', `battleship-${theme}`)
    }
  },
  [theme, themeLoaded],
);

// ...after all the hooks, just before the final return:
if (!themeLoaded) {
  return null
}

  return (
    <HashRouter>
      <Routes>
        <Route
          element={
            <Layout
              title={
                title
              }
              theme={
                theme
              }
              onToggleTheme={
                toggleTheme
              }
            />
          }
        >
          <Route
            path='/'
            element={
              <Home
                leaderboard={
                  getLeaderboard(gameResults)
                }
                generalFacts={
                  getGeneralFacts(gameResults)
                }
                gameResults={
                  gameResults
                }
                setTitle={
                  setTitle
                }
              />
            }
          />
          <Route
            path='/setup'
            element={
              <Setup
                previousPlayers={
                  getPreviousPlayers(gameResults)
                }
                onStartGame={
                  startGame
                }
                setTitle={
                  setTitle
                }
              />
            }
          />
          <Route
            path='/play'
            element={
              <Play
                currentPlayers={
                  currentPlayers
                }
                grid={
                  grid
                }
                fleetStatus={
                  fleetStatus
                }
                //annoying, delayed? but how?
                shotLog={
                  shotLog
                }
                onCellClick={
                  clickCell
                }
                onToggleSunk={
                  toggleSunk
                }
                onFinishGame={
                  finishGame
                }
                setTitle={
                  setTitle
                }
              />
            }
          />
          <Route
            path='/player/:name'
            element={
              <PlayerDetail
                leaderboard={
                  getLeaderboard(gameResults)
                }
                setTitle={
                  setTitle
                }
              />
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
