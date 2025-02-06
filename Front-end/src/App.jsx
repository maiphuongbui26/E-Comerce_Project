import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const handleClickCount = ()=>{
    setCount((prevCount) => prevCount + 1)
  }
  return (
    <>
      <h1>Count state</h1>
      <p>{count}</p>
      <button onClick={handleClickCount}>Tăng</button>
    </>
  )
}
export default App
