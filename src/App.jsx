import React from 'react'
import NavBar from './components/NavBar'
import Home from "./pages/Home"
import About from "./pages/About"
import './App.css'
import { Route, Routes } from "react-router-dom"
import Game from './pages/Game'

function App() {

  return (
    <div className="App"> 
      <NavBar/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/lobby" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/game" element={<Game />}/>
        </Routes>
      </div>
    </div>
   
  )
}

export default App
