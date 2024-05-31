import { useState } from 'react'
import './App.css'
import AllRoutes from "./components/AllRoutes"
import Navbar from './components/Navbar'

export default function App() {
  return(
    <>
    <Navbar />
    <AllRoutes />
    </>
  )
}
