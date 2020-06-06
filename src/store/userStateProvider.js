import React, {useReducer, useContext} from "react";
import axios from "axios"
import UserContext from "../context/userContext";
import userReducers from "../reducers/userReducers";
import header from "../utils/axiosheader";
import GlobalContext from "../context/globalContext";
import handleError from "../utils/apphttperror";
import {msgBox} from "../utils/appmsgbox";
import {useHistory} from "react-router-dom";
import appmsg from "../utils/appmsg";

const UserStore = ({children}) => {
    let history = useHistory();
    const {updateUser} = useContext(GlobalContext)
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
                handleError(err)
                if (err.response.status === 404) {
                    msgBox("info", appmsg.userprofile.usernotfount)
                    history.replace("/")
                }
                userDispatch({type: "SHOW", loading: false})
                reject(err)
            })
        }))
    }
    const update = (data) => {
        return new Promise(((resolve, reject) => {
            userDispatch({type: "UPDATEUSER", loading: true})
            axios.post("http://127.0.0.1:3000/api/user/update", data, header()).then((response) => {
                userDispatch({type: "UPDATEUSER", loading: false, payload: data})
                resolve(response)
            }).catch((error) => {
                handleError(error)
                userDispatch({type: "UPDATEUSER", loading: false})
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
                handleError(error)
                userDispatch({type: "UPDATEIMAGE", loading: false})
                reject(error)
            })
        }))
    }

    const fetch = async (data) => {
        return new Promise(((resolve, reject) => {
            axios.post("http://127.0.0.1:3000/api/user", data, header()).then((res) => {
                resolve(res)
            }).catch((err) => {
                handleError(err)
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
