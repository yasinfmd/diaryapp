import React, {useReducer, useEffect, useContext} from "react";
import axios from "axios"
import UserContext from "../context/userContext";
import userReducers from "../reducers/userReducers";

const UserStore = ({children}) => {
    const initialState = {
        user: null, loading: false
    }
    const [userState, userDispatch] = useReducer(userReducers, initialState)
    const show = async (data) => {
        return new Promise(((resolve, reject) => {
            userDispatch({type: "SHOW", loading: true})
            axios.post("http://127.0.0.1:3000/api/user/" + data.id, data).then((res) => {
                userDispatch({type: "SHOW", loading: false, user: res.data})
                resolve(res)
            }).catch((err) => {
                userDispatch({type: "SHOW", loading: false})
                reject(err)
            })
        }))
    }

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
    return (
        <UserContext.Provider value={{
            userstate: userState,
            userdispatch: userDispatch,
            show: show,
            fetchuser: fetch,

        }}>
            {children}
        </UserContext.Provider>

    )
}
export default UserStore;
