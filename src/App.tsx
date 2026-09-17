import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (

    <div className="p-4">
          <h1 className="text-3xl font-bold">Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        <button
          type="button"
          className="btn btn-primary btn-lg btn-soft w-full lg:w-auto"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>

<div className="card bg-base-100 w-full shadow-sm">
  <div className="card-body">
    <h2 className="card-title">Card title!</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>


        </div>
        
  )
}

export default App
