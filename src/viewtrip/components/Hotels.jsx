import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'
function Hotels({trip}) {
  return (
    <div><h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
    <div className='grid grid-cols-2 md:grid-cols-3 xls:grid-cols-4 gap-5'>
        {trip?.tripData?.hotels?.map((Hotels,index)=>(
        //     <Link to={'https://www.google.com/maps/search/?api=1&query='+Hotels?.hotelName+","+Hotels?.hotelAddress} target='_blank'>
        //     <div className='hover:scale-105 transition-all cursor-pointer' >
        //         <img src='/placeholder.jpg' className='rounded-xl'/>
        //         <div className='my-2 flex flex-col gap-2'>
        //             <h2 className='font-medium'>{Hotels?.hotelName}</h2>
        //             <h2 className='text-xs text-gray-600'>📍{Hotels?.hotelAddress}</h2>
        //             <h2 className='text-sm'>💰{Hotels?.price}</h2>
        //             <h2 className='text-sm'>⭐{Hotels?.rating}</h2>
        //         </div>
        //     </div>
        // </Link>
        <HotelCardItem Hotels={Hotels}/>

        ))}
    </div>
    </div>
  )
}

export default Hotels