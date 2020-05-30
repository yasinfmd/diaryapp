import React, {useReducer} from "react";
import axios from "axios"
import diaryReducers from "../reducers/diaryReducers";
import DiaryContext from "../context/diaryContext";
import header from "../utils/axiosheader";
import {useHistory} from "react-router-dom";
import {msgBox} from "../utils/appmsgbox";


const DiaryStore = ({children}) => {
    let history = useHistory();
    const initialState = {
        diary: [],
        loading: false,
        groupeduserdiary: []
    }
    const [diaryState, diaryDispatch] = useReducer(diaryReducers, initialState)

    const fetchUserGroupedDiary = (data) => {
        let deferred = new Promise(((resolve, reject) => {
            diaryDispatch({type: "SETGROUPEDDIARY", loading: true})
            axios.post("http://127.0.0.1:3000/api/user/dairgroup", data, header()).then((res) => {
                if (res.status === 200) {
                    res.data.forEach((item) => {
                        item.accordionClass = "collapse"
                    })
                    diaryDispatch({type: "SETGROUPEDDIARY", loading: false, payload: res.data})
                }
                resolve(res)
            }).catch((err) => {
                if (err.response.status === 401) {
                    history.replace("/login")
                    localStorage.clear()
                    msgBox("info", "Oturumunuzun Süresi Dolduğu İçin Giriş Sayfasına Yönlendiriliyorsunuz")
                    return
                }
                diaryDispatch({type: "SETGROUPEDDIARY", loading: false})
                reject(err)
            })
        }))
        return deferred
    }

    const fetch = (data) => {
        let deferred = new Promise(((resolve, reject) => {
            debugger
            diaryDispatch({type: "SET", loading: true})
            debugger
            axios.post("http://127.0.0.1:3000/api/user/" + data.userid + "/dair", data, header()).then((res) => {
                debugger
                console.log("gelen", res)
                if (res.status === 200) {
                    diaryDispatch({type: "SET", loading: false, payload: res.data.diaries.reverse()})
                }
                resolve(res)
            }).catch((err) => {
                if (err.response.status === 401) {
                    history.replace("/login")
                    localStorage.clear()
                    msgBox("info", "Oturumunuzun Süresi Dolduğu İçin Giriş Sayfasına Yönlendiriliyorsunuz")
                    return
                }
                diaryDispatch({type: "SET", loading: false})
                reject(err)
            })
        }))
        return deferred
    }

    const create = (data) => {
        let deferred = new Promise(((resolve, reject) => {
            debugger
            axios.post("http://127.0.0.1:3000/api/dair/create", data, header()).then((res) => {
                debugger
                if (res.status === 200) {
                    diaryDispatch({type: "CREATE", loading: false, payload: res.data})
                } else if (res.status === 204) {
                    diaryDispatch({type: "CREATE", loading: false})
                }
                resolve(res)
            }).catch((err) => {
                if (err.response.status === 401) {
                    history.replace("/login")
                    localStorage.clear()
                    msgBox("info", "Oturumunuzun Süresi Dolduğu İçin Giriş Sayfasına Yönlendiriliyorsunuz")
                    return
                }
                diaryDispatch({type: "CREATE", loading: false})
                reject(err)
            })
        }))
        return deferred
    }

    return (
        <DiaryContext.Provider value={{
            state: diaryState,
            dispatch: diaryDispatch,
            creatediary: create,
            fetchdiary: fetch,
            fetchUserGroupedDiary: fetchUserGroupedDiary
        }}>
            {children}
        </DiaryContext.Provider>
    )
}
export default DiaryStore;
