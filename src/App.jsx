import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar />

        {/* <Routes>
          <Route path='/' element={<Discover />} />
          <Route path='/search' element={<Search />} />
          <Route path='/favourites' element={<Favourites />} />

        </Routes> */}
      </BrowserRouter>

    </>
  )
}

export default App
