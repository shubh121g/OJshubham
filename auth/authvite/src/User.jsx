import React from 'react';
import {NavLink, Outlet} from 'react-router-dom'

export default function User(){

    const activstyle={
        fontWeight: 'bold',
        textDecoration: 'underline',
    }

    return (
        <>
        <nav className="flex">
            <NavLink style={({isActive})=>isActive ? activstyle:null} className="mr-12" to="/user" end >Dashboard</NavLink>
            <NavLink style={({isActive})=>isActive ? activstyle:null} className="mr-12" to="submissions">Submission</NavLink>
            <NavLink style={({isActive})=>isActive ? activstyle:null} className="mr-12" to="chats">Chats</NavLink>
        </nav>
        <Outlet/>
        </>
    )
}