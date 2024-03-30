import React from 'react'
import { useEffect , useState} from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';

export default function Testcard(props){

    const [isdeleted, Deletetest]=useState(false);

    function deletetest(){
      axios.delete(import.meta.env.VITE_BACKEND_URL+`/testcase/case/${props.idd}`).then(res=>{

       console.log(res);
       Deletetest(true);
      }).catch(e => {
           console.log(e);
      })
    }

    return (
        <div>
            { !isdeleted &&
            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
            <li className="pb-3 sm:pb-4">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
      <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              Input : {props.inp}
            </p>
         </div>
         
         <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
               Output : {props.out}
            </p>
         </div>
         <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
         <button type="button" onClick={()=>{deletetest()} }className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
         </div>
      </div>
   </li>
   </ul>
}
        </div>
    )
}

