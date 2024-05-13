import {React, useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function UserDetail(props){

    const uid = props.uid;
    console.log(props);

    const [userD,setUserD] = useState({});
 
useEffect(()=>{
    axios.get(import.meta.env.VITE_BACKEND_URL+`/user/${uid}`).then(
        res=>res.data
    ).then(dt=>{
        console.log(dt);
        setUserD(dt)})
    

},[])


    return (
        <div className="h-screen bg-gray-200  dark:bg-gray-800   flex flex-wrap items-center  justify-center  ">
            <div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3    bg-white  shadow-lg    transform   duration-200 easy-in-out">
                <div className=" h-32 overflow-hidden" >
                    <img className="w-full" src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />
                </div>
                <div className="flex justify-center px-5  -mt-12">
                    <img className="h-32 w-32 bg-white p-2 rounded-full   " src="https://www.shutterstock.com/image-vector/profile-icon-isolated-white-on-blue-211470211" alt="" />

                </div>
                <div className=" ">
                    <div className="text-center px-14">
                        <h2 className="text-gray-800 text-3xl font-bold">{userD.firstname} {userD.lastname} </h2>
                        <a className="text-gray-400 mt-2 hover:text-blue-500" href="https://www.instagram.com/immohitdhiman/" target="BLANK()">{userD.email}</a>
                      
                    </div>
                    <hr className="mt-6" />
                    <div className="flex  bg-gray-50 ">
                        <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                            <p><span className="font-semibold">3 </span> <Link to = {`/submission/user/${uid}`}>Submissions</Link></p>
                        </div>
                        <div className="border"></div>
                        <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                            <p> <span className="font-semibold">{userD.marks}</span> Score</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}