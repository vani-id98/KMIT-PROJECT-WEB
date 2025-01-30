import React,{useState,useEffect}from 'react'
import { Link } from 'react-router-dom'
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
function HotelCardItem({Hotels}) {

    const [photoUrl,setPhotoUrl]=useState();
    
      useEffect(()=>{
         Hotels &&GetPlacePhoto();
    
      },[Hotels])
     
      const GetPlacePhoto=async()=>{
        const data={
          textQuery:Hotels?.hotelName
        }
        const result=await GetPlaceDetails(data).then(resp=>{
          console.log(resp.data.places[0].photos[3].name)
          
          const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
    
          setPhotoUrl(PhotoUrl);
        })
      }
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+Hotels?.hotelName+","+Hotels?.hotelAddress} target='_blank'>
            <div className='hover:scale-105 transition-all cursor-pointer' >
                <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='rounded-xl h-[200px] w-full object-cover'/>
                <div className='my-2 flex flex-col gap-2'>
                    <h2 className='font-medium'>{Hotels?.hotelName}</h2>
                    <h2 className='text-xs text-gray-600'>📍{Hotels?.hotelAddress}</h2>
                    <h2 className='text-sm'>💰{Hotels?.price}</h2>
                    <h2 className='text-sm'>⭐{Hotels?.rating}</h2>
                </div>
            </div>
        </Link>

  )
}

export default HotelCardItem