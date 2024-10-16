import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(99)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>(count)</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)} class="main__btn">
          <img src="./assets/Hamster_Combat.svg" alt="" />
        </button>
        <p>
          Если хотите его убить звоните по номеру (99) 991-22-13
        </p>
      </div>
    </>
  )
}

export default App
