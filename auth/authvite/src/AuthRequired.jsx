import React from 'react';
import {Outlet , Navigate} from 'react-router-dom';

export default function AuthRequired(props){
    const dikhao = false ;

    if(!props.haslogged)
    {
      return <Navigate to="/login" />;
    }
    return <Outlet/>

}