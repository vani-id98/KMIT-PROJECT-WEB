import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
 import  Hero from './components/custom/Hero.jsx'
import Header from './components/custom/Header'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div>
            
            <Hero/>
        </div>
        
        
    </>
  )
}

export default App