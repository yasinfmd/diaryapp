import React, {useContext, useState} from 'react';
import GlobalContext from "../context/globalContext";
import LoginForm from "../components/loginForm";

export default function Login() {
    return (
        <React.Fragment>
            <LoginForm/>
        </React.Fragment>
    )
}
