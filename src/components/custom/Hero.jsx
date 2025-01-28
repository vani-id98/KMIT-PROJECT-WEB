import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (

    
  
  
    <div className='flex flex-col items-center mx-45 gap-8'>
        <h1 className='font-extrabold text-[40px] text-center'>
            <span className='text-red-500'>Discover your next Adventure with AI:</span><br></br>Personalized iternaries at your Fingertips</h1>
            <p className='text-xl text-gray-600 text-centre'>Your personal trip planner and travel curator, creating custom itneraries tailored to your interests and budget</p>
            <Link to={'/create-trip'}>
            <Button>Get started</Button>
            </Link>
    </div>
    
  
  )
}

export default Hero