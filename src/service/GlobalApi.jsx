

import axios from "axios"

const BASE_URL ='https://places.googleapis.com/v1/places:searchText'

const config={
    headers:{
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask': [
            'places.photos',
            'places.displayName',
            'places.id'
        ]
    }
}

export const GetPlaceDetails=(data)=>axios.post(BASE_URL,data,config)

export const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY

// export const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;

// import axios from 'axios';

// const BASE_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

// export const GetPlaceDetails = (data) =>
//   axios.get(BASE_URL, {
//     params: {
//       query: data.textQuery,
//       key: import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
//       fields: 'photos,formatted_address,name,place_id',
//     },
//   });

