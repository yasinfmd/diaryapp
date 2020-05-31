import React, {useContext, useRef, useEffect, useState} from "react";
import PageSubHeader from "../components/pagesubheader";
import GlobalContext from "../context/globalContext";
import ProfileCard from "../components/profile";
import UserContext from "../context/userContext";
import {msgBox} from "../utils/appmsgbox";
import Loading from "../components/loading";
import Flex from "../components/flex";
import {ImageValidator} from "../utils/appimagevalidator";
import {readFileBase64} from "../utils/appimageconverter";
import Card from "../components/card";
import UpdateImageCard from "../components/updateimagecard";

export default function UserProfile() {
    let fileInput = useRef()
    const {user, updateUser} = useContext(GlobalContext)
    const [editedMode, setEditedMode] = useState(false)
    const [editedImageMode, setEditedImageMode] = useState(false)
    const [base64, setBase64] = useState(null)
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
    const resetFileInput = () => {
        fileInput.current.value = null
        fileInput.current.files = null
        setBase64(null)
    }
    const uploadImage = () => {
        let formData = new FormData()
        formData.append('file', prof)
        formData.append("userid", user._id)
        updateProfileImg(formData).then((response) => {
            let newuser = {image: response.data.image, fullname: user.fullname, email: user.email, _id: user._id}
            localStorage.setItem("user", JSON.stringify(newuser))
            updateUser(newuser)
            resetFileInput()
            setEditedImageMode(false)
            setEditedMode(false)
            msgBox("success", "Profil Resmi Başarıyl Güncellendi")
        }).catch((error) => {
            msgBox("error", "Beklenmedik Bir Hata Gerçekleşti Lütfen Daha Sonra Tekrar Deneyin")
        })

    }

    const changeImage = () => {
        let result = true
        result = ImageValidator(fileInput.current.files)
        if (result === false) {
            msgBox("warning", "Yalnızca Resim Dosyayı Seçilmelidir")
        } else {
            const file = fileInput.current.files[0]
            setprof(file)
            readFileBase64(file).then((res) => {
                res.decode64 = res.base64
                res.base64 = 'data:image/png;base64,' + res.base64
                setBase64(res)
            }).catch((error) => {

            })

        }
    }
    const renderUserProfile = () => {
        let renderitem;
        if (userstate.loading == true || userstate.user == null) {
            renderitem = <Loading/>
        } else {
            console.log("bakstate", userstate)
            renderitem = <ProfileCard src={userstate.user.image}
                                      onImageEditClick={() => {
                                          setEditedImageMode(!editedImageMode)
                                      }
                                      }
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
            {editedImageMode === true ? (<Flex column={"col-lg-12"}>
                <Card>
                    <UpdateImageCard base64={base64} inputref={fileInput}
                                     onFileInputClick={() => {
                                         fileInput.current.click();
                                     }}
                                     saveClick={() => {
                                         uploadImage()
                                     }}
                                     save={base64 == null ? false : true}
                                     cancel={base64 == null ? false : true}
                                     cancelClick={() => {
                                         resetFileInput()
                                         setEditedMode(false)
                                         setEditedImageMode(false)
                                     }}
                                     onChange={() => {
                                         changeImage()
                                     }}/>
                </Card>
            </Flex>) : null}
        </React.Fragment>

    )
}
