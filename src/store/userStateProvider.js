import React, {useReducer, useEffect, useContext} from "react";
import axios from "axios"
import UserContext from "../context/userContext";
/*import userReducers from "../reducers/authReducers";*/
const UserStore = ({children}) => {
/*    const initialState = {
        msg: "", loading: false, status: null
    }
    const [userState, userDispatch] = useReducer(authReducers, initialState)*/

    const fetch = async (data) => {
        return new Promise(((resolve, reject) => {
            debugger
            axios.post("http://127.0.0.1:3000/api/user", data).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        }))
    }
    /*    const forgotpassword = async (data) => {
            return new Promise(((resolve, reject) => {
                debugger
                axios.post("http://127.0.0.1:3000/api/auth/forgotpassword", data).then((res) => {
                    debugger
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
            }))
        }*/
    /*    state: authState,
            dispatch: authDispatch,*/

    return (
        <UserContext.Provider value={{
            fetchuser: fetch,
 /*           userstate:userState,
            userdispatch:userDispatch*/
        }}>
            {children}
        </UserContext.Provider>

    )
}
export default UserStore;
