import React from 'react'
import { useEffect , useState} from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import Testcard  from './Testcard';

export default function Testcasedetails(){

    const param = useParams();
    let id = param.pid;

    const [alltests, setTestcase] = React.useState([]);
    const [ntest,setNtest] = React.useState(0);

    useEffect(()=>{
        axios.get(import.meta.env.VITE_BACKEND_URL+ `/testcase/${id}`).then(res=>{
            setTestcase(res.data);
            
            
        })

    },[ntest])

    const testCards = alltests.map(test=>{
        return(<div>
            <Testcard
            inp ={test.inputs}
            out = {test.outputs}
            idd ={test._id}
            />
            <button onClick={()=>{console.log("kuch chal le"+test._id);
              axios.delete(import.meta.env.VITE_BACKEND_URL+`/testcase/case/${test._id}`).then(res=>{
                setNtest((pr)=>pr+1)
              console.log(res);
              
             }).catch(e => {
                  console.log(e);
             })
        }}>Handle it </button>
            </div>

        )
     })

   
    return (
        <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        {testCards}
        </ul>
    )
}