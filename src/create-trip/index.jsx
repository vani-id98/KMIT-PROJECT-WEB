import { Input } from '@/components/ui/input';
import { SelectBudgetOptions } from '@/constants/options';
import { SelectTravelList} from '@/constants/options';
// import { SelectTravelOptions } from '@/constants/options';
import React,{useState,useEffect} from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AI_PROMPT } from '@/constants/options';
import { chatSession } from '@/service/AIModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import{useGoogleLogin} from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "@/service/firebaseconfig";
import { useNavigate } from "react-router-dom"

// import { AiOutlineLoading3Quarters } from 'react-icons/ai';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { error } from 'console';
// import { useEffect } from 'react';
// import { useEffect } from 'react';



function CreateTrip() {
  const [place,setPlace]=useState();
  const[formData,setFormData]=useState([]);
  const[openDialog,setOpenDialog]=useState(false);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();

  const handleInputChange=(name,value)=>{
    // if(name=='noOfDays' && value>15)
    // {
    //   console.log("Please enter trip less than 15")
    //   return;
    // }
    setFormData({
      ...formData ,
      [name]:value

    })

  }
  useEffect(()=>{
    console.log(formData);

  },[formData])

 const login=useGoogleLogin({
  onSuccess:(codeResp)=>GetUserProfile(codeResp),
  onError:(error)=>console.log(error)

  
 })

  const OnGenerateTrip=async()=>{
    const user=localStorage.getItem('user');
    if(!user)
    {
      setOpenDialog(true)
      return;
    }
    if(formData?.noOfDays>15&&formData?.location||!formData?.budget||!formData?.traveler)
    {
      toast("please fill all the details")
      return;
    }
    toast("Form generated");
    // console.log(formData);
    setLoading(true);
    const FINAL_PROMPT=AI_PROMPT
    .replace('{location',formData?.location?.label)
    // .replace('{transport}',formData?.transport)
    .replace('{totalDays}',formData?.noOfDays)
    .replace('{traveler}',formData?.traveler)
    .replace('{budget}',formData?.budget)
    // .replace('{mode of travel}',formData?.modeoftravel)

    console.log(FINAL_PROMPT);

    const result=await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  }

  const SaveAiTrip=async(TripData) => {
    setLoading(true);
    const user=JSON.parse(localStorage.getItem("user"));
    const docId=Date.now().toString();
    await setDoc(doc(db, "AiTrips", docId), {
      userSelection:formData,
      tripData:JSON.parse(TripData),
      userEmail:user?.email,
      id:docId
    });
    setLoading(false);
    // navigate('/view-trip/'+docId);
    navigate('/viewtrip/'+docId);
  }
  const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,{
      headers: {
       Authorization: `Bearer ${tokenInfo?.access_token}`,
       Accept:'Application/json'
      }
    }).then((resp) => {console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDialog(false);
      OnGenerateTrip();
    })
  }
  return (

    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
    <h2 className='font-bold text-4xl text-center'>Tell us your travel preferences</h2>
    <p className='mt-3 text-black text-xl text-center'> Just provide some basic information,and our trip planner will generate a customized iterinary based on preferences</p>
    <div className='mt-10 flex flex-col gap-9'>
      <div>
      <h2 className='text-xl my-3 font-medium'>🏕️Whats your destination choice</h2>
      <GooglePlacesAutocomplete
      apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
      selectProps={{
        place,
        onChange:(v)=>{setPlace(v);handleInputChange('location',v)}
      }}
      />
      </div>

      {/* <div>
        <h2 className='text-xl my-3 font-medium'>What is your prefered mode of transportation</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
      {SelectTravelOptions.map((item ,index)=>( 
        <div key={index}
        onClick={()=>handleInputChange('transport',item.title)}
         className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg'
          ${formData?.transport==item.title&&'shadow-lg border-black'}
         `}>
          <h2 className='text-4xl'>{item.icon}</h2>
          <h2 className='font-bold text-lg'>{item.title}</h2>
          <h2 className="text-sm text-gray-500">{item.desc}</h2>
        </div>
      ))} 
      </div>


      </div>  */}
      <div>
        <h2 className='text-xl my-3 font-medium'>🔂How many days are you planning your trip</h2>
        <Input placeholder={'Ex.3'} type='number'
          onChange={(e)=>handleInputChange('noOfDays',e.target.value)}/>
      </div>
    </div>
    <div>
    <h2 className='text-xl my-3 font-medium'>💰What is your budget?</h2>
    <div className='grid grid-cols-3 gap-5 mt-5'>
      {SelectBudgetOptions.map((item ,index)=>( 
        <div key={index}
        onClick={()=>handleInputChange('budget',item.title)}
         className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg'
          ${formData?.budget==item.title&&'shadow-lg border-black'}
         `}>
          <h2 className='text-4xl'>{item.icon}</h2>
          <h2 className='font-bold text-lg'>{item.title}</h2>
          <h2 className="text-sm text-black">{item.desc}</h2>
        </div>
      ))}
      <div>
        <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
        <div className='grid grid-cols-2 gap-5 mt-5'>
        {SelectTravelList.map((item ,index)=>( 
        <div key={index}
        onClick={()=>handleInputChange('traveler',item.people)}
         className={`p-3 border cursor-pointer rounded-lg hover:shadow-lg
           ${formData?.traveler==item.people&&'shadow-lg border-black'}`}>
          <h2 className='text-4xl'>{item.icon}</h2>
          <h2 className='font-bold text-lg'>{item.title}</h2>
          <h2 className="text-sm text-black">{item.desc}</h2>
        </div>
        ))}
        </div>
      </div>
    </div>
    <br></br>
       <div className='my-10 justify-start flex'><Button disabled={loading} onClick={OnGenerateTrip}>
        {loading?
        <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin '/> : 'Generate Trip'}
        </Button>
    </div>
    {/* <div className="absolute left-0 bottom-0 w-24 h-24 animation-float">
        <img src="/man-with-parachute.svg" alt="Man with parachute" className="w-full h-full" />
       

      </div> */}

       
  <Dialog open={openDialog}>
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
</div>
    
    
  )
}

export default CreateTrip