import React from 'react';
import { Link } from 'react-router-dom';

//   {/* <h3>{props.title}</h3>
//             <p>Difficulty : {props.diff}</p>
//             <h4>Submissions : {props.subcount}</h4> */}

export default function Subcard(props){


    function formatDate(dateString) {
        const date = new Date(dateString);
        
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
      }

      const sdate = formatDate(props.dt)

    return (
        
          
        <li style={{backgroundColor:props.ver?"#d6f2d3":"#fcd9cc"}}>
        <div class="px-4 py-5 sm:px-6">
            <div class="flex items-center justify-between">
                <h3 class="text-lg leading-6 font-medium text-gray-900">{sdate}</h3>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">Language : {props.lan}</p>
            </div>
            <div class="mt-4 flex items-center justify-between">
                <p class="text-sm font-medium text-gray-500"> {props.com}</p>
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Edit</a>
            </div>
        </div>
    </li>

        
    )
}