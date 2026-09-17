import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (

    <div>
          <h1 className="text-3xl font-bold">Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        <button
          type="button"
          className="btn btn-primary btn-lg btn-soft"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
        </div>
  )
}

export default App
