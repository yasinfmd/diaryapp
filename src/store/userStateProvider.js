import React, {useReducer, useEffect, useContext} from "react";
import axios from "axios"
import UserContext from "../context/userContext";
import userReducers from "../reducers/userReducers";
import header from "../utils/axiosheader";
import GlobalContext from "../context/globalContext";

const UserStore = ({children}) => {
    const {user, updateUser} = useContext(GlobalContext)
    const initialState = {
        user: null, loading: false
    }
    const [userState, userDispatch] = useReducer(userReducers, initialState)
    const show = async (data) => {
        return new Promise(((resolve, reject) => {
            userDispatch({type: "SHOW", loading: true})
            axios.post("http://127.0.0.1:3000/api/user/" + data.id, data, header()).then((res) => {
                debugger

                userDispatch({type: "SHOW", loading: false, user: res.data})

                resolve(res)
            }).catch((err) => {
                userDispatch({type: "SHOW", loading: false})
                reject(err)
            })
        }))
    }
    const update = (data) => {
        debugger
        return new Promise(((resolve, reject) => {
        /*    userDispatch({type: "UPDATEUSER", loading: true})*/
            debugger
            axios.post("http://127.0.0.1:3000/api/user/update", data, header()).then((response) => {
                debugger
            /*    userDispatch({type: "UPDATEUSER", loading: false, payload: data})*/
                resolve(response)
            }).catch((error) => {
                debugger
        /*        userDispatch({type: "UPDATEUSER", loading: false})*/
                reject(error)

            })
        }))
    }
    const updateProfileImg = (data) => {
        return new Promise(((resolve, reject) => {
            userDispatch({type: "UPDATEIMAGE", loading: true})
            axios.post("http://127.0.0.1:3000/api/user/updateImage", data, header('multipart/form-data')).then((res) => {
                userDispatch({type: "UPDATEIMAGE", loading: false, payload: res.data.image})
                resolve(res)
            }).catch((error) => {
                userDispatch({type: "UPDATEIMAGE", loading: false})
                reject(error)
            })
        }))
    }

    const fetch = async (data) => {
        return new Promise(((resolve, reject) => {
            debugger
            axios.post("http://127.0.0.1:3000/api/user", data, header()).then((res) => {
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
            update: update,
            updateUser: updateUser

        }}>
            {children}
        </UserContext.Provider>

    )
}
export default UserStore;
