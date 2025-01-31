import React,{useState,useEffect} from 'react'
import { IoIosSend } from "react-icons/io";
import { Button } from '@/components/ui/button';
import { GetPlaceDetails} from '@/service/GlobalApi';
// import { PHOTO_REF_URL } from '@/service/GlobalApi';

const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY
function InfoSection({trip}) {

  // const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY

  const [photoUrl,setPhotoUrl]=useState();

  useEffect(()=>{
     trip &&GetPlacePhoto();

  },[trip])
 
  const GetPlacePhoto=async()=>{
    const data={
      textQuery:trip?.userSelection?.location?.label
    }
    const result=await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[3].name)
      
      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)

      setPhotoUrl(PhotoUrl);
    })
  }

  // function InfoSection({ trip }) {
  //   useEffect(() => {
  //     if (trip) GetPlacePhoto();
  //   }, [trip]);
  
  //   const GetPlacePhoto = async () => {
  //     const data = {
  //       textQuery: trip?.userSelection?.location?.label,
  //     };
  //     try {
  //       const result = await GetPlaceDetails(data);
  //       console.log(result.data); // Expect name, photo reference, and ID here
  //     } catch (error) {
  //       console.error('Error fetching place details:', error.response?.data || error.message);
  //     }
  //   };
  return (
    <div >
        <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='h-[340px] w-full object-cover rounded-xl'/>
        <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
             <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
        </div>
        <div className='flex gap-5'>
        <h2 className= 'p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🗓️{trip?.userSelection?.noOfDays} Day</h2>
        {/* { <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🛞Transport:{trip?.userSelection?.transport}</h2> } */}
        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>👩‍👧‍👦 Number of Traveler : {trip?.userSelection?.traveler} </h2>
        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💵 {trip?.userSelection?.budget} Budget </h2>
        </div>
        <div>
            <Button><IoIosSend /></Button>
        </div>
    </div>
    </div>
    
  );
}

export default InfoSection;


// import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
// import React, { useEffect, useState } from 'react'

// import { Button } from '@/components/ui/button';

// function InfoSection({trip}) {
//   const [photoUrl,setPhotoUrl] = useState();
//   useEffect(()=>{
//     trip&&GetPlaceImg();
//   },[trip])

//   const GetPlaceImg=async()=>{
//     const data={
//       textQuery:trip?.userSelection?.location
//     }
//     const result= await GetPlaceDetails(data).then(resp=>{
//       // console.log(resp.data.places[0].photos[3].name)
//       const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
//       setPhotoUrl(PhotoUrl);
     
//     })
//   }
//   return (
//     <div>
//       <img src={photoUrl ? photoUrl : '/public/road-trip-vacation.jpg'}  className='h-[330px] w-full object-cover rounded-xl'/>
//        <div className='flex justify-between items-center'>
//             <div className='my-6 flex flex-col gap-2'>
//                 <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>
//                 <div className='flex gap-6 mt-4'>
//                     <h2 className='bg-gray-200 font-medium text-gray-600 rounded-full p-1 px-4 md:text-md'>🗓️ {trip?.userSelection?.totalDays} Day</h2>
//                     <h2 className='bg-gray-200 font-medium text-gray-600 rounded-full p-1 px-4 md:text-md'>👩‍👧‍👦 Number of Traveler : {trip?.userSelection?.traveler} People</h2>
//                     <h2 className='bg-gray-200 font-medium text-gray-600 rounded-full p-1 px-4 md:text-md'>💵 {trip?.userSelection?.budget} Budget </h2>
//                 </div>
//             </div>
//        </div>
//     </div>
//   )
// }

// export default InfoSection