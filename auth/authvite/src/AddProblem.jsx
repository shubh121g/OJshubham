import React from 'react'
import axios from 'axios';

export default function AddProblem(){
    const [probv , setProblem] = React.useState({
        title:"",
        description:"",
        difficulty:"",
        tags:""
    })
    
    function handleChange(event){
        const {name , value , type } = event.target;
        setProblem((prev)=>{
            return {...prev,
            [name]:value}
        })
        
    
    }
    
    function submitprob(e){
    e.preventDefault();
   
   
    axios.post(import.meta.env.VITE_BACKEND_URL+'/problems',probv).then((res)=>console.log(res)).catch((e)=>{
        console.log(e);
    })
    }
    
        return(
            <div>
                {/* <form>
                    <input 
                        type='email'
                        value={logv.email}
                        name="email"
                        
                        onChange={handleChange}
                    /> 
                    <input 
                        type='password'
                        value={logv.password}
                        name="password"
                        placeholder='password'
                        onChange={handleChange}
                    /> 
                    <button onClick={submitlog}>Submit</button>
                </form> */}
    
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Add a new problem</h2>
      </div>
    
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
    
        <div>
            <label for="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
            <div className="mt-2">
              <input id="title" name="title" type="text" 
                        value={probv.title}
                        onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>    
    
        <div>
            <label for="description" className="block text-sm font-medium leading-6 text-gray-900">Descripton</label>
            <div className="mt-2">
              <input id="description" name="description" type="text" 
                        value={probv.description}
                        onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>  
          <div>
            <label for="difficulty" className="block text-sm font-medium leading-6 text-gray-900">Marks (1 to 3)</label>
            <div className="mt-2">
              <input id="difficulty" name="difficulty" type="text" 
                        value={probv.difficulty}
                        onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>
    
          <div>
            <div >
              <label for="tags" className="block text-sm font-medium leading-6 text-gray-900">Tags</label>
              <div className="text-sm">
               
              </div>
            </div>
            <div className="mt-2">
              <input id="tags" name="tags" type="text" value={probv.tags} onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>
    
          <div>
            <button type="submit" onClick={submitprob} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add problem</button>
          </div>
        </form>
    
      </div>
    </div>
    
            </div>
        )
}