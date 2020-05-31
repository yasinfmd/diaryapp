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

    const updateProfileImg = (data) => {
        return new Promise(((resolve, reject) => {
            userDispatch({type: "UPDATEIMAGE", loading: true})
            axios.post("http://127.0.0.1:3000/api/user/updateImage", data, header('multipart/form-data')).then((res) => {
                debugger

                userDispatch({type: "UPDATEIMAGE", loading: false, payload: res.data.image})
                resolve(res)
                //response.data.image
            }).catch((error) => {
                userDispatch({type: "UPDATEIMAGE", loading: false})
                reject(error)
                debugger
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
            updateProfileImg: updateProfileImg

        }}>
            {children}
        </UserContext.Provider>

    )
}
export default UserStore;
