import React,{useState,useEffect} from 'react'
import { useNavigation } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrip() {

    const navigation=useNavigation();
    const [userTrips,setUserTrips] = useState([]);
    useEffect(() =>{
        GetUserTrips();
    },[])

    const GetUserTrips=async()=>{
        const user=JSON.parse(localStorage.getItem('user'));
        // const navigation=useNavigation();
        if(!user){
            navigation('/');
            return ;
        }
        setUserTrips([]);
        const q=query(collection(db,'AiTrips'),where('userEmail','==',user?.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setUserTrips(prevVal=>[...prevVal,doc.data()])
        });
    }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
    <h2 className='font-bold text-3xl mt-10'>MyTrip</h2>
    <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5 '>
        {userTrips.map((trip,index)=>(
            <UserTripCardItem trip={trip} /> 

        ))}
    </div>
    </div>
  )
}

export default MyTrip