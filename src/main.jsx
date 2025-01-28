import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header.jsx'
 import { Toaster} from './components/ui/sonner.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './viewtrip/[tripId]/index.jsx'
import MyTrip from './my-trip/index.jsx'

// import  Hero from './components/custom/Hero.jsx'


const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/create-trip',
    element:<CreateTrip/>
  },
  {
    path:'/viewtrip/:tripId',
    element:<ViewTrip/>
  },
  {
    path:'/my-trip',
    element:<MyTrip/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_WEB_CLIENTID}>
    <Header/>
    <Toaster/>
    {/* <Hero/> */}
    <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
)

