import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
  return (
    <div>
        <h2 className='font-bold text-lg'>Places to Visit</h2>
        <div>
            {trip?.tripData?.dailyPlan?.map((item,index)=>(
                <div className='mt-5'>
                    
                    <h2 className='font-medium text-lg'>{item.day}</h2>
                    <div className='grid md:grid-cols-2 gap-5'>
                    {item.activities.map((place,index)=>(
                        <div className='my-3'>
                            <h2 className='font-medium text-sm text-orange-400'>{place.bestTimeToVisit}</h2>
                            <PlaceCardItem place={place}/>
             
                    </div>
                    ))}
                    </div>
                    </div>
                
                // <h1>hi</h1>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit