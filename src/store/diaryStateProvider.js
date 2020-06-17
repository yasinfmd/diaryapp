import React, {useReducer} from "react";
import axios from "axios"
import diaryReducers from "../reducers/diaryReducers";
import DiaryContext from "../context/diaryContext";
import header from "../utils/axiosheader";
import {useHistory} from "react-router-dom";
import {msgBox} from "../utils/appmsgbox";
import handleError from "../utils/apphttperror";
import appmsg from "../utils/appmsg";


const DiaryStore = ({children}) => {
    let history = useHistory();
    const initialState = {
        diary: [],
        loading: false,
        groupeduserdiary: [],
        showdiar: {}
    }
    const [diaryState, diaryDispatch] = useReducer(diaryReducers, initialState)

    const updateDiary=(data)=>{
        let deferred = new Promise(((resolve, reject) => {
            
            axios.post("http://127.0.0.1:3000/api/dair/update", data, header()).then((res) => {
                resolve(res)
            }).catch((err) => {
                handleError(err)
                reject(err)
            })
        }))
        return deferred
    }
    const deleteDiarImage = (data) => {
        let deferred = new Promise(((resolve, reject) => {
            axios.post("http://127.0.0.1:3000/api/image/delete", data, header()).then((res) => {
                resolve(res)
            }).catch((err) => {
                
                diaryDispatch({type: "SHOW", loading: false, payload: diaryState.showdiar})
                handleError(err)
                reject(err)
            })
        }))
        return deferred
    }
    const deleteDiarVideo = (data) => {
        let deferred = new Promise(((resolve, reject) => {
            axios.post("http://127.0.0.1:3000/api/video/delete", data, header()).then((res) => {
                resolve(res)
            }).catch((err) => {
                diaryDispatch({type: "SHOW", loading: false, payload: diaryState.showdiar})
                handleError(err)
                reject(err)
            })
        }))
        return deferred
    }
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
                handleError(err)
                diaryDispatch({type: "SETGROUPEDDIARY", loading: false, error: err})
                reject(err)
            })
        }))
        return deferred
    }

    const fetch = (data) => {
        let deferred = new Promise(((resolve, reject) => {
            diaryDispatch({type: "SET", loading: true})
            axios.post("http://127.0.0.1:3000/api/user/" + data.userid + "/dair", data, header()).then((res) => {
                
                if (res.status === 200) {
                    diaryDispatch({type: "SET", loading: false, payload: res.data.diaries.reverse()})
                }
                resolve(res)
            }).catch((err) => {
                handleError(err)
                diaryDispatch({type: "SET", loading: false, error: err})
                reject(err)
            })
        }))
        return deferred
    }
    const deleteDiar = (data) => {
        
        let deferred = new Promise(((resolve, reject) => {
            diaryDispatch({type: "DELETE", loading: true, payload: []})
            axios.post("http://127.0.0.1:3000/api/dair/delete", data, header()).then((response) => {
                let groupedDiary = []
                if (data.groupedindex !== undefined || data.groupedindex !== undefined) {
                    if (diaryState.groupeduserdiary[data.groupedindex].count === 1) {
                        groupedDiary = diaryState.groupeduserdiary
                        groupedDiary.splice(data.groupedindex, 1)
                    } else {
                        groupedDiary = diaryState.groupeduserdiary
                    }
                }
                let deletedDiary;
                if (diaryState.diary.length > 1) {
                    deletedDiary = diaryState.diary.filter((diaryItem) => {
                        return diaryItem._id != data.id
                    })
                } else {
                    deletedDiary = []
                }
                diaryDispatch({type: "DELETE", loading: false, payload: deletedDiary, groupeduser: groupedDiary})
                resolve(response)
            }).catch((err) => {
                handleError(err)
                diaryDispatch({type: "DELETE", loading: false, payload: [], error: err})
                reject(err)
            })
        }))
        return deferred
    }
    const addVideo = (formData) => {
        let deferred = new Promise(((resolve, reject) => {
            axios.post("http://127.0.0.1:3000/api/video/create", formData, header('multipart/form-data')).then((response) => {
                resolve(response)
            }).catch((err) => {
                handleError(err)
                reject(err)
            })
        }))
        return deferred
    }

    const addImages = (formData) => {
        let deferred = new Promise(((resolve, reject) => {
            axios.post("http://127.0.0.1:3000/api/image/create", formData, header('multipart/form-data')).then((response) => {
                resolve(response)
            }).catch((err) => {
                handleError(err)
                reject(err)
            })
        }))
        return deferred
    }
    const show = (data) => {
        let deferred = new Promise(((resolve, reject) => {
            axios.post("http://127.0.0.1:3000/api/dair/" + data.dairid, data, header()).then((res) => {
                if (res.status === 200) {
                    diaryDispatch({type: "SHOW", loading: false, payload: res.data})
                }
                resolve(res)
            }).catch((err) => {
                if (err.response.status === 404) {
                    msgBox("info", appmsg.diarystate.diarynotfount)
                    history.replace("/")
                } else {
                    handleError(err)
                }
                diaryDispatch({type: "SHOW", loading: false, error: err})
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
                    diaryDispatch({type: "CREATE", loading: false, payload: [...diaryState.diary, res.data]})
                } else if (res.status === 204) {
                    diaryDispatch({type: "CREATE", loading: false, payload: diaryState.diary})
                }
                resolve(res)
            }).catch((err) => {
                debugger
                handleError(err)
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
            deleteDiarImage: deleteDiarImage,
            creatediary: create,
            addImages: addImages,
            addVideo: addVideo,
            fetchdiary: fetch,
            fetchUserGroupedDiary: fetchUserGroupedDiary,
            deleteDiar: deleteDiar,
            show: show,
            deleteDiarVideo: deleteDiarVideo,
            updateDiary:updateDiary
        }}>
            {children}
        </DiaryContext.Provider>
    )
}
export default DiaryStore;
