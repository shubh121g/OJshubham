import React from 'react';
import { Link } from 'react-router-dom';

//   {/* <h3>{props.title}</h3>
//             <p>Difficulty : {props.diff}</p>
//             <h4>Submissions : {props.subcount}</h4> */}

export default function Probcard(props){

    return (
        
          
            <li className="flex justify-between gap-x-6 py-5">
    <div className="flex min-w-0 gap-x-4">
   
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900">{props.title}</p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500"><Link to={`${props.idd}`}>View</Link></p>
  
      </div>
    </div>
    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
      <p className="text-sm leading-6 text-gray-900">Difficulty : {props.diff}</p>
      <p className="mt-1 text-xs leading-5 text-gray-500">Submissions : {props.subcount}</p>
    </div>
  </li>

        
    )
}