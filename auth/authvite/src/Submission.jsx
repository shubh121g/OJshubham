import React from 'react';
import axios from 'axios';
import { useEffect , useState} from 'react';
import { useParams,Link } from 'react-router-dom';
import Subcard from './Subcard';

export default function Submission(){
 
    const param = useParams();
    let id = param.id;
    let pu = param.pu;

    console.log(param);
    console.log("&&*&*&*&");

    const [allsub, setSubs] = React.useState([]);

    useEffect(()=>{
        axios.get(import.meta.env.VITE_BACKEND_URL+ `/submission/${pu}/${id}`).then(res=>{
            setSubs(res.data);
            console.log(res.data);
            console.log("Submission data")
            
        })

    },[])

    const sublist = allsub.map((s)=>{
        return <Subcard  dt={s.datetime}
          com={s.comment}
          lan ={s.language}
          ver = {s.verdict}
          />

    })



    return (
        <div>
            <h2>Submission</h2>
            <ul class="bg-white shadow overflow-hidden sm:rounded-md  mt-30">

                {sublist}
            </ul>
        </div>
    )
}