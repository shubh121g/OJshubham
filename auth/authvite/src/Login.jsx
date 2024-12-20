import React from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function  Login(props){

const [logv , setlogin] = React.useState({
    email:"",
    password:""
})

const [isLoggedIn, setIsLoggedIn] = React.useState(false);
const [token, setToken] = React.useState(null);

const getTokenFromCookie = () => {
  const cookieString = document.cookie;
  console.log(cookieString);
  const cookies = cookieString.split('; ');

  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === 'token') {
      return value;
    }
  }

  return null;
};


function handleChange(event){
    const {name , value , type } = event.target;
    setlogin((prev)=>{
        return {...prev,
        [name]:value}
    })
   

}

function submitlog(e){
e.preventDefault();
axios.post(import.meta.env.VITE_BACKEND_URL+'/login',logv).then((res)=>{
  
console.log(res.headers);
const logg =res.data.message;
if(logg === "Logged in"){
  console.log("HO GYA LOGIN")
  setIsLoggedIn(true);
  toast.success('You have successfully logged in!');
  props.userlogged(res.data);
  console.log(document.cookie+" --");
  const tokenFromCookie = getTokenFromCookie();
  setToken(tokenFromCookie);
  try{
    
  return (<Navigate to="/register"/>);
  }catch(e){console.log(e)}
}
else{
  toast.error('Incorrect combination of password and email id');
}
}).catch((e)=>{
    console.log(e);
})

}

if(isLoggedIn){return <Navigate to="/user"/>}

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
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" action="#" method="POST">
      <div>
        <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input id="email" name="email" type="email" 
                    value={logv.email}
                    onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div className="mt-2">
          <input id="password" name="password" type="password" value={logv.password} onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button type="submit" onClick={submitlog} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign up today</a>
    </p>
    <p>{props.user}</p>
  </div>
</div>
<ToastContainer />

        </div>
    )
}