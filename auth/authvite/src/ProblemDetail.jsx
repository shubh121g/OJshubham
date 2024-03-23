import React from 'react';
import { useEffect , useState} from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import Compiler from './Compiler';
import Testcase from './Testcase'


export default function ProblemDetail(){

    const param = useParams();
    let id = param.id;
    const [Pdetail , setPdetail]=useState(null);

    useEffect(()=>{
        axios.get(`http://localhost:8080/problems/${id}`).then(res=>{setPdetail(res.data);console.log(res.data);})
    },[id])




   

    return (
        <div className='p-detail-container'>
            {Pdetail?(
                <div >
                   <div className="overflow-hidden bg-white py-24 sm:py-32">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
      <div className="lg:pr-8 lg:pt-4">
        <div className="lg:max-w-lg">
        
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{Pdetail.title}</p>
          <p className="mt-6 text-lg leading-8 text-gray-600">{Pdetail.description}</p>
          <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
            <div className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <svg className="absolute left-1 top-1 h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z" clip-rule="evenodd" />
                </svg>
                Submissions :
              </dt>
              <dd className="inline">{Pdetail.subcount}</dd>
            </div>
            <div className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <svg className="absolute left-1 top-1 h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                </svg>
               Difficulty :
              </dt>
              <dd className="inline">{Pdetail.difficulty}</dd>
            </div>
           
          </dl>
        </div>
      </div>
      <Compiler  className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"width="2432" height="1442"/>
    </div>
  </div>
</div>
                    
  
  
</div>

               
            ):<h2>Loading...</h2>}

            <Testcase pid={id}/>
            <Link to={`/testcases/${id}`}> View all </Link>
       
        </div>
    );
}