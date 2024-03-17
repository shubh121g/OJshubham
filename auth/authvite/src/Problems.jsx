import React from 'react';
import axios from 'axios';
import Probcard from './Probcard';

export default function Problems(){

     const [probs , setProbs] = React.useState([]);
     const [ln , setProblen] = React.useState(0);

     React.useEffect(()=>{
        axios.get('http://localhost:8080/problems').then(
            res => res.data
        ).then(dt => setProbs(dt))
        
     },[])

     const problems = probs.map(prob=>{
        return(
            <Probcard
            title ={prob.title}
            diff = {prob.difficulty}
            subcount ={prob.subcount}
            idd ={prob._id}
            />

        )
     })

     return (
        <div>
            <ul role="list" className="divide-y divide-gray-100">
           {problems}
           </ul>
        </div>
     )
}