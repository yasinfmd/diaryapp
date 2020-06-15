import React, {useContext, useRef, useEffect, useState, useMemo} from "react";
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
import EditUserForm from "../components/edituserform";
import appmsg from "../utils/appmsg";

export default function UserProfile() {
    let fileInput = useRef()
    const {user, updateUser} = useContext(GlobalContext)
    const [editedMode, setEditedMode] = useState(false)
    const [editedImageMode, setEditedImageMode] = useState(false)
    const [base64, setBase64] = useState(null)
    const {userstate, show, updateProfileImg} = useContext(UserContext)
    const [prof, setprof] = useState(null)
    useEffect(() => {
        show({id: user._id, fields: "fullname image name surname email diaries"}).then((response) => {
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
            msgBox("success", appmsg.userprofile.updateprofileimg)
        })

    }

    const changeImage = () => {
        let result = true
        result = ImageValidator(fileInput.current.files)
        if (result === false) {
            msgBox("warning", appmsg.userprofile.onlyimagefile)
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
    const renderUserProfile=useMemo(()=>{
        let renderitem;
        if (userstate.loading == true || userstate.user == null) {
            renderitem = <Loading/>
        } else {
            renderitem = <ProfileCard src={userstate.user.image}
                                      onImageEditClick={() => {
                                          setEditedMode(false)
                                          setEditedImageMode(!editedImageMode)
                                      }
                                      }
                                      onEditClick={() => {
                                          setEditedImageMode(false)
                                          setEditedMode(!editedMode)
                                      }
                                      }
                                      totaldiary={userstate.user.diaries.length} fullname={userstate.user.fullname}
                                      email={userstate.user.email}/>
        }
        return renderitem
    },[userstate.loading,userstate.user, editedImageMode,editedMode])

    return (
        <React.Fragment>
            <PageSubHeader pagename={"Profilim"}/>
            {renderUserProfile}
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
            {editedMode === true ? <Flex column={"col-12"}>
                <Card>
                    <EditUserForm name={userstate.user.name} setMode={setEditedMode} surname={userstate.user.surname}
                                  email={userstate.user.email}/>
                </Card>
            </Flex> : null
            }
        </React.Fragment>

    )
}
