import React from 'react'
import axios from 'axios'

export default function Testcase(props){
    const probid = props.pid;

    const [testv , setTestcase]=React.useState({
        inputs:" ",
        outputs:" ",
        pid:probid
    })

    function handleChange(event){
        const {name , value , type } = event.target;
        setTestcase((prev)=>{
            return {...prev,
            [name]:value}
        })
        console.log(testv);
    
    }
    
    function submittest(e){
    e.preventDefault();
    console.log(testv);
    axios.post(`http://localhost:8080/testcase/${probid}`,testv).then((res)=>console.log(res)).catch((e)=>{
        console.log(e);
    })
    }

    return (
        //  <form>
        //         <input 
        //             type='text'
        //             value={testv.input}
        //             name="input"
        //             placeholder='Input'
        //             onChange={handleChange}
        //         /> 
        //         <input 
        //             type='text'
        //             value={testv.output}
        //             name="output"
        //             placeholder='Output'
        //             onChange={handleChange}
        //         /> 
        //         <button onClick={submittest}>Submit</button>
        //     </form> 
        <div>
            <h4>Add testcase</h4>
        <form>
    <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
            <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Input</label>
            <input type="text" id="inputs" name="inputs"  value={testv.inputs}
             onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Input" required />
        </div>
        <div>
            <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Output</label>
            <input type="text" id="outputs" name="outputs" value={testv.outputs} 
             onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Output" required />
        </div>
       
        </div>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"  onClick={submittest}>Submit</button>
        </form>
        </div>
    )
}
