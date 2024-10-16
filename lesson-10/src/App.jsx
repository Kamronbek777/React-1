import { useState } from 'react'
import './App.css'
import BottomNav from './components/BottomNav'
import {Outlet} from 'react-router-dom'

function App() {

  return (
    <>
      <header>
        <BottomNav />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
