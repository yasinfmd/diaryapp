import React, {useReducer, useEffect, useContext} from "react";
import axios from "axios"
import authReducers from "../reducers/authReducers";
import AuthContext from "../context/authContext";
import GlobalContext from "../context/globalContext";


const AuthStore = ({children}) => {
    const {updateAuth} = useContext(GlobalContext)
    const initialState = {
        msg: "", loading: false, status: null
    }
    const [authState, authDispatch] = useReducer(authReducers, initialState)

    const forgotpassword = async (data) => {
        return new Promise(((resolve, reject) => {
            debugger
            axios.post("http://127.0.0.1:3000/api/auth/forgotpassword", data).then((res) => {
                debugger
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        }))
    }

    const login = async (data) => {
        return new Promise(((resolve, reject) => {
            axios.post("http://127.0.0.1:3000/api/auth/signin", data).then((res) => {
                if (res.status === 200) {
                    updateAuth(true)
                } else if (res.status === 204) {
                    updateAuth(false)
                }
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        }))
    }
    const passwordtokencheck = (token) => {
        return new Promise(((resolve, reject) => {
            axios.get("http://127.0.0.1:3000/api/auth/checktoken/" + token).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        }))

    }

    const updatepass = (data) => {
        return new Promise(((resolve, reject) => {
            axios.post("http://127.0.0.1:3000/api/auth/updatepassword", data).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        }))
    }
    const register = (data) => {
        return new Promise(((resolve, reject) => {
            axios.post("http://127.0.0.1:3000/api/auth/signup", data).then((res) => {
                if (res.status === 200) {
                    authDispatch({type: "REGISTER", msg: res.data.msg, loading: false, error: "", status: res.status})
                } else if (res.status === 204) {
                    authDispatch({type: "REGISTER", msg: "Email Exist", loading: false, error: "", status: res.status})
                }
                resolve(res)
            }).catch((err) => {
                authDispatch({type: "REGISTER", msg: err.msg, loading: false, error: err})
                reject(err)
            })
        }))
    }
    return (
        <AuthContext.Provider value={{
            state: authState,
            dispatch: authDispatch,
            register: register,
            login: login,
            forgotpassword: forgotpassword,
            passwordtokencheck: passwordtokencheck,
            updatepass:updatepass
        }}>
            {children}
        </AuthContext.Provider>

    )
}
export default AuthStore;
