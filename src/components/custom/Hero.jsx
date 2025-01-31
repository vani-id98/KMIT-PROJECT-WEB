import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    
   
   

  
  
    <div className='flex flex-col items-center mx-45 gap-8'>
        <h1 className='font-extrabold text-[40px] text-center'>
            <span className='text-black-500'><br></br><br></br><br></br>  Discover your next Adventure with AI:</span><br></br>Personalized iternaries at your Fingertips</h1>
            <p className='text-xl text-black-800 text-centre'>Your personal trip planner and travel curator, creating custom itneraries tailored to your interests and budget</p>
            <Link to={'/create-trip'}>
            <Button>Get started</Button>
            </Link>
    </div>

    
  
  )
}

export default Hero


// import React from 'react'
// import { Button } from '../ui/button'
// import { Link } from 'react-router-dom'

// function Hero() {
//   return (
//     <div className="relative w-full h-screen overflow-hidden">
//       {/* 3D Travel-themed Background */}
//       <div className="absolute inset-0 z-0">
//         <div 
//           className="absolute inset-0 bg-cover bg-center opacity-90"
//           style={{
//             // width: '150%',
//             backgroundImage: 'url(/ai3.jpg)',
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//              height: '100vh',  // Ensure the background div takes full height
//             width: '200vw'
//           }}
//         />
//         <div className="absolute inset-0 bg-black/40" />
//       </div>

//       {/* Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 gap-8">
//         <h1 className='font-extrabold text-4xl md:text-6xl text-white max-w-4xl leading-tight'>
//           <span className='text-red-400'>Discover your next Adventure with AI:</span><br />
//           Personalized itineraries at your Fingertips
//         </h1>
//         <p className='text-xl text-gray-200 max-w-2xl'>
//           Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget
//         </p>
//         <Link to={'/create-trip'}>
//           <Button className='bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg transition-transform hover:scale-105'>
//             Start Your Journey
//           </Button>
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default Hero