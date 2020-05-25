import React,{useContext,useState} from 'react';
import GlobalContext from "../context/globalContext";
import RegisterForm from "../components/registerForm";

export default function Register() {
    const {state,dispatch,login} =useContext(GlobalContext)
    console.log(state)
    /*  const data=useContext(GlobalContext)*/
    /*    console.log(data)*/
    return (
        <React.Fragment>
            <RegisterForm/>
        </React.Fragment>
    )
}
