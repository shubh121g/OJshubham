import React from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Compiler(props){

    const [output,setOutput] = React.useState("");
    const [input,setInput] = React.useState("");
    const [codebody , setCodebody] = React.useState({
        language:"cpp",
        code:"",
        input:" "
    });
    const uid=props.uid;
    const uname=props.uname;
    const pid=props.pid;
    const mark =props.mark;
    

    function handleChange(event){
        const {name , value  } = event.target;
       
        setCodebody((prev)=>{
            return {...prev,
            [name]:value}
        })
        
    
    }

    function runcode(e){
        e.preventDefault();
       // const {code} = e.target;
        

        axios.post(import.meta.env.VITE_BACKEND_URL+'/run',codebody).then((res)=>{ setOutput(res.data.output);
    console.log({...res});
    }).catch((e)=>{
            console.log(e);
        })}

    function submitcode(e){
        e.preventDefault();
       
        const subbody ={
            code : codebody.code,
            language : codebody.language,
           uid,
           uname,
           pid

        }
       
        axios.post(import.meta.env.VITE_BACKEND_URL+'/submit',{subbody

        }).then((data)=>{console.log(data);
            if(data.data.subData.verdict)
            {
                toast.success('You have successfully passed all the tescases!');
                axios.put(import.meta.env.VITE_BACKEND_URL+`/user/${uid}/${mark}`).then(res=>{console.log(res.data)}).catch(e=>{
                    console.log(e);
                    return e;
                })
            }
            else{
                toast.error(`failed on test case ${data.data.subData.comment}`)
            }
         
        }).catch(e=>{
            console.log(e);
            return e;
        })

    }
        

    return (
        <div>
            <form>
   <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
       <div className="px-4 py-16 bg-white rounded-t-lg dark:bg-gray-800">
           <label for="comment" className="sr-only">Your comment</label>
           <textarea id="code"  name="code" value={codebody.code} rows="4" onChange={handleChange} className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write your cpp code..." required />
       </div>
       <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
           <button type="submit" onClick={runcode} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
               Run
           </button>
           <button type="submit" onClick={submitcode} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800">
               Submit
           </button>
          
             
              
          
       </div>
   </div>
</form>


<div class="relative mb-3" data-twe-input-wrapper-init>
  <input
    type="text"
    name="input" value={codebody.input} onChange={handleChange}
    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
    id="exampleFormControlInputText"
    placeholder="Example label" />
  <label
    for="exampleFormControlInputText"
    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
    >Text input
  </label>
</div>

<h4>Output {output}</h4>
<ToastContainer />

        </div>
    )
}