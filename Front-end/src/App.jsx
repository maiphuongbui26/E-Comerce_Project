import { Routes, Route} from 'react-router-dom'
import Home from './page/users/home/Home'
import Header from './component/header/Header'

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}
export default App
