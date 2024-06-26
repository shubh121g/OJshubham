import React from 'react'
import Login from './Login'
import Register from './Register'
import Compiler from './Compiler'
import Problems from './Problems'
import ProblemDetail from './ProblemDetail'
import AddProblem from './AddProblem'
import Testcasedetails from './Testcasedetails'
import UserDetail from './UserDetail'
import AuthRequired from './AuthRequired'
import Submission from './Submission'
import User from './User'
import Chats from './Chats'
import UserSub from './UserSub'
import Dashboard from './Dashboard'
import Sec from './Sec'


import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'

export default function Home(){

  const [islogged , setLogged]=React.useState(false);
  const [username , setUsername]=React.useState('');
  const [userid, setUserid] = React.useState(0);
  const [userd, setUserd] = React.useState({});

  function userlogged(data){
      setLogged(true);
      setUsername(data.isUserExist.firstname);
      setUserid(data.isUserExist._id);
      setUserd(data.isUserExist);
    
    }

    return (
        <BrowserRouter>
            





<header className="bg-white">
  <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
    <div className="flex lg:flex-1">
      <a href="#" className="-m-1.5 p-1.5">
        <span className="sr-only">Your Company</span>
        <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt=""/>
      </a>
      <h2>Online Judge</h2>
    </div>
   
    <div className="hidden lg:flex lg:gap-x-12">
    
      <Link  to="/problems" className="text-sm font-semibold leading-6 text-gray-900">Problems</Link>
   
    </div>
    
    
    <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-12">
      {islogged ?<Link to="/user"><p> Hi {username}</p> </Link> : <div>
      <Link to="/login"  className="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></Link>
      
      <Link to="/register"  className="text-sm font-semibold leading-6 text-gray-900">Sign up <span aria-hidden="true">&rarr;</span></Link>

      </div>}
      <Link to="/compiler"  className="text-sm font-semibold leading-6 text-gray-900">Compiler <span aria-hidden="true">&rarr;</span></Link>
      <Link to="/addProblem"  className="text-sm font-semibold leading-6 text-gray-900">Add Problem <span aria-hidden="true">&rarr;</span></Link>

     
    </div>
    
  </nav>
 
 
</header>
<Routes>
<Route path="/login" 
        element={<Login  userlogged={userlogged} />}/>
        <Route path="/register" element={<Register/>}/>
      <Route element={<AuthRequired haslogged={islogged}/>} >
       
        <Route path="/user"  element={<User uid={userid} />}>
          <Route index element={<Dashboard/>}/>
          <Route path="/user/submissions" element={<UserSub  uid={userid} />}/>
          <Route path="/user/chats" element={<Chats/>}/>
          <Route index element={<Dashboard/>}/>
        </Route>  
        <Route path="/compiler" element={<Compiler/>}/>
        <Route path="/problems" element={<Problems />}/>
        <Route path="/addProblem" element={<AddProblem/>}/>
        <Route path="/problems/:id" element={<ProblemDetail uname={username} uid={userid} />} />
        <Route path="/submission/:pu/:id" element={<Submission/>}/>
        <Route path="/testcases/:pid" element={<Testcasedetails/>}/>
        {/* <Route path="/user" element={<AuthRequired/>}  uid={userid}>
          <Route  element={<Sec/>}></Route>
        </Route> */}
        </Route>

    </Routes>

</BrowserRouter>
    )
}