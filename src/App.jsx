import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import SecureBookmarks from './components/SecureBookmarks'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/saved' element={<SecureBookmarks />} />

        </Routes>

        <Footer/>
      </BrowserRouter>

    </>
  )
}

export default App
