import React from 'react';
import axios from 'axios';
import { useEffect , useState} from 'react';
import { useParams,Link ,useSearchParams ,} from 'react-router-dom';
import Subcard from './Subcard';


export default function UserSub({uid}){
 
    const [SearchParams, setSearchParams] = useSearchParams();

    const [allsub, setSubs] = React.useState([]);

    const typeF = SearchParams.get("type");



    let disp = [];

    useEffect(()=>{
        axios.get(import.meta.env.VITE_BACKEND_URL+ `/submission/user/${uid}`).then(res=>{
            setSubs(res.data);
            console.log(res.data);
            console.log("Submission data")
            
        })

    },[])

    disp = allsub;

    if(typeF=="All"){
        disp = allsub;
    }
    else if(typeF=="Passed"){
        disp = allsub.filter( a => a.verdict);

    }else if(typeF=="Failed"){
        disp = allsub.filter( a => a.verdict == false);
    }

    const sublist = disp.map((s)=>{
        return <Subcard  dt={s.datetime}
          com={s.comment}
          lan ={s.language}
          ver = {s.verdict}
          />

    })



    return (
        <div>
            <h2>Submission</h2>
            <nav>
                <button onClick={()=> setSearchParams({type:"All"})} className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>All</button>
                <button onClick={()=> setSearchParams({type:"Passed"})} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Passed</button>
                <button onClick={()=> setSearchParams({type:"Failed"})} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mr-8">Failed</button>
            </nav>
            <ul class="bg-white shadow overflow-hidden sm:rounded-md  mt-30">

                {sublist}
            </ul>
        </div>
    )
}