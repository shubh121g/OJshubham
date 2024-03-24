import React from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function  Register(){

const [regv , setRegister] = React.useState({
    firstname:"",
    lastname:"",
    email:"",
    password:""
})

const [isRegistered, setIsRegistered] = React.useState(false);

function handleChange(event){
    const {name , value , type } = event.target;
    setRegister((prev)=>{
        return {...prev,
        [name]:value}
    })
    console.log(regv);

}

function submitreg(e){
e.preventDefault();
console.log(regv);
axios.post('http://localhost:8080/register',regv).then((res)=>{
  const msg = res.data.message;

  if(msg=='Succesfully registered'){
    toast.success('Registration was successful');
    setIsRegistered(true);
    if (isRegistered) {
      // Redirect to the login page after successful registration
      return <Navigate to="/login" />
    }

  }

}).catch((e)=>{
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
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create a new account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" action="#" method="POST">

    <div>
        <label for="firstname" className="block text-sm font-medium leading-6 text-gray-900">First name</label>
        <div className="mt-2">
          <input id="firstname" name="firstname" type="text" 
                    value={regv.firstname}
                    onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>    

    <div>
        <label for="lastname" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
        <div className="mt-2">
          <input id="lastname" name="lastname" type="text" 
                    value={regv.lastname}
                    onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>  
      <div>
        <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input id="email" name="email" type="email" 
                    value={regv.email}
                    onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div >
          <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
           
          </div>
        </div>
        <div className="mt-2">
          <input id="password" name="password" type="password" value={regv.password} onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button type="submit" onClick={submitreg} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create account</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      already a member?
      <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign in </a>
    </p>
  </div>
</div>
<ToastContainer />

        </div>
    )
}