import React from 'react'
import { useEffect , useState} from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import Testcard  from './Testcard';

export default function Testcasedetails(){

    const param = useParams();
    let id = param.pid;

    const [alltests, setTestcase] = React.useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:8080/testcase/${id}`).then(res=>{
            setTestcase(res.data);
            console.log(res.data)
            console.log(alltests)
        })

    },[])

    const testCards = alltests.map(test=>{
        return(
            <Testcard
            inp ={test.inputs}
            out = {test.outputs}
            idd ={test._id}
            />

        )
     })

   
    return (
        <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        {testCards}
        </ul>
    )
}