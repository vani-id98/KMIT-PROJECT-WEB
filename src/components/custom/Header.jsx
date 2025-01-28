import React,{useState,useEffect} from 'react'
import { Button } from '../ui/button'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";

function Header() {
     
  const user=JSON.parse(localStorage.getItem('user'));

  const [openDailog,setOpenDailog]=useState(false);
  

  useEffect(()=>{
    console.log(user)
  },[])

  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  
    
   })

   const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,{
      headers: {
       Authorization: `Bearer ${tokenInfo?.access_token}`,
       Accept:'Application/json'
      }
    }).then((resp) => {console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDailog(false);
      window.location.reload()
    })
  }
  return (
    
    <div className='p-2 shadow-sm flex justify-between items-centre px-5'>
      <img src='/logo-text-og-twitter.svg' 
       style={{ height: "50px", width: "75px" }}
      />
      {/* <img src='/C:\Users\vanik\Downloads\Project-main\Logomaker-main\public\logo_with_name-46d069e2.png'/> */}

      <div>
        {user?
        <div className='flex items-centre gap-3'>
          <a href='my-trip'>
          <Button variant="outline" className="rounded-full ">My Trips</Button>
          </a>
          
          <Popover>
          <PopoverTrigger><img src={user?.picture} className='h-[35px] w-[35px] rounded-full'/></PopoverTrigger>
          <PopoverContent><h2 className='cursor-pointer'onClick={()=>{
            googleLogout();
            localStorage.clear();
            window.location.reload();
            
          }}>LogOut</h2></PopoverContent>
          </Popover>

        </div>
        :
         <Button onClick={()=>setOpenDailog(true)}>Sign In</Button>
        }
      </div>

      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="./logo.svg"/>
              <h2 className='font bold text-lg ,mt-7'>Sign in with Google</h2>
              <p>Sign in to the app with google authenciation securely</p>
              <Button
              
              onClick={login} className="w-full mt-5 flex gap-4 items-centre">
               
              <FcGoogle className='h-7 w-7'/>
              Sign in with google
              
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  
  )
}

export default Header