import React, {useContext, useRef, useEffect, useState} from "react";
import PageSubHeader from "../components/pagesubheader";
import GlobalContext from "../context/globalContext";
import ProfileCard from "../components/profile";
import UserContext from "../context/userContext";
import {msgBox} from "../utils/appmsgbox";
import Loading from "../components/loading";
import Flex from "../components/flex";
import {ImageValidator} from "../utils/appimagevalidator";

export default function UserProfile() {
    let fileInput = useRef()
    const {user, updateUser} = useContext(GlobalContext)
    const [editedMode, setEditedMode] = useState(false)
    const {userstate, userdispatch, show, updateProfileImg} = useContext(UserContext)
    const [prof, setprof] = useState(null)
    useEffect(() => {
        show({id: user._id, fields: "fullname image email diaries"}).then((response) => {
            debugger
        }).catch((error) => {
            debugger
            msgBox("error", "Beklenmedik Bir Hata Gerçekleşti Lütfen Daha Sonra Tekrar Deneyin")
        })
    }, [])

    const uploadImage = () => {
        let formData = new FormData()
        formData.append('file', prof)
        formData.append("userid", user._id)
        updateProfileImg(formData).then((response) => {
            debugger
            let newuser = {image: response.data.image, fullname: user.fullname, email: user.email, _id: user._id}
            localStorage.setItem("user", JSON.stringify(newuser))
            updateUser(newuser)
        }).catch((error) => {
            msgBox("error", error.response.data)
        })

    }

    const changeImage = () => {
        debugger
        let result = true
        result = ImageValidator(fileInput.current.files)
        if (result === false) {
            msgBox("warning", "Yalnızca Resim Dosyayı Seçilmelidir")
        } else {
            const file = fileInput.current.files[0]
            setprof(file)

            console.log("dosyam", prof)
        }
    }
    const renderUserProfile = () => {
        let renderitem;
        if (userstate.loading == true || userstate.user == null) {
            renderitem = <Loading/>
        } else {
            console.log("bakstate", userstate)
            renderitem = <ProfileCard src={userstate.user.image}
                                      onEditClick={() => {
                                          setEditedMode(!editedMode)
                                      }
                                      }
                                      totaldiary={userstate.user.diaries.length} fullname={userstate.user.fullname}
                                      email={userstate.user.email}/>
        }
        return renderitem
    }

    return (
        <React.Fragment>
            <PageSubHeader pagename={"Profilim"}/>
            {renderUserProfile()}
            {editedMode === true ? (<Flex column={"col-lg-12"}>
                <div className="row">
                    <div className="col-12">
                        <input className={"form-control"} type={"file"} ref={fileInput} name="myImage"
                               onChange={() => {
                                   changeImage()
                               }}/>
                        <button onClick={() => {
                            uploadImage()
                        }}>tıkla
                        </button>
                    </div>
                </div>
            </Flex>) : null}

        </React.Fragment>

    )
}
