import React from 'react'
import axios from 'axios';

export default function Compiler(){

    const [output,setOutput] = React.useState("");
    const [codebody , setCodebody] = React.useState({
        language:"cpp",
        code:""
    });

    function handleChange(event){
        const {name , value  } = event.target;
        console.log(value)
        setCodebody((prev)=>{
            return {...prev,
            [name]:value}
        })
        
    
    }

    function submitcode(e){
        e.preventDefault();
       // const {code} = e.target;
        console.log({...codebody});

        axios.post('http://localhost:8080/run',codebody).then((res)=>{ setOutput(res.data.output);
    console.log({...res});
    }).catch((e)=>{
            console.log(e);
        })}
        

    return (
        <div>
            <form>
   <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
       <div className="px-4 py-16 bg-white rounded-t-lg dark:bg-gray-800">
           <label for="comment" className="sr-only">Your comment</label>
           <textarea id="code"  name="code" value={codebody.code} rows="4" onChange={handleChange} className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write your cpp code..." required />
       </div>
       <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
           <button type="submit" onClick={submitcode} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
               Run
           </button>
          
             
              
          
       </div>
   </div>
</form>

<h2>{output}</h2>

        </div>
    )
}