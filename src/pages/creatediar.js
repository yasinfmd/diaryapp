import React, {useContext, useRef, useState} from "react";
import Card from "../components/card";
import MyEditor from "../components/editor";
import InputForm from "../components/formInput";
import DOMPurify from "dompurify"
import appmsg from "../utils/appmsg"
import {diarContentValidator, diarTitleValidator} from "../utils/appvalidator";
import GlobalContext from "../context/globalContext";
import Flex from "../components/flex";
import Button from "../components/Button";
import {msgBox} from "../utils/appmsgbox";
import DiaryContext from "../context/diaryContext";
import Loading from "../components/loading";
import PageSubHeader from "../components/pagesubheader";
import {ImageValidator} from "../utils/appimagevalidator";
import {readFileBase64} from "../utils/appimageconverter";
import {useHistory} from "react-router-dom";
const CreateDiary = () => {
    let history = useHistory();
    let creatediarfileInput = useRef()
    const [diartext, setDiarText] = useState("")
    const [diartitle, setDiarTitle] = useState("")
    const {user} = useContext(GlobalContext)
    const {creatediary, state, dispatch, addImages} = useContext(DiaryContext)
    const [diarimages, setdiarimages] = useState([])
    const [uploadedImages, setUploadedImages] = useState([])
    const onChangeEditor = (e) => {
        setDiarText(e)
    }
    const changeImage = () => {
        let base64Images = []
        let uploadImg = [];
        creatediarfileInput.current.files.forEach((file) => {
            if (ImageValidator(file) === false) {
            } else {
                uploadImg.push(file)
                if (uploadImg.length == creatediarfileInput.current.files.length) {
                    setUploadedImages(uploadImg)
                }
                readFileBase64(file)
                    .then((res) => {
                        res.decode64 = res.base64
                        res.base64 = 'data:image/png;base64,' + res.base64
                        base64Images.push(res)
                        if (base64Images.length == creatediarfileInput.current.files.length) {
                            setdiarimages(base64Images)
                        }
                    }).catch((error) => {
                })
            }
        })
    }
    const removePreviewImage = (index) => {
        const images = JSON.parse(JSON.stringify(diarimages));
        images.splice(index, 1)
        setdiarimages([])
        setdiarimages(images)
    }
    const renderPreview = () => {
        if (diarimages.length > 1) {
            return diarimages.map((image, index) => {
                return (
                    <React.Fragment key={index + "fragment"}>
                        <img
                            key={index + "img"}
                            src={image.base64}
                            alt="image"
                            className="img-fluid avatar-xl pl-2 pt-2"/>
                        <Button buttonclases={"btn-danger btn-xs btn-sm"}
                                onClick={() => {
                                    removePreviewImage(index)
                                }}
                                key={index + "btn"}
                                type={"button"} icon={"fa fa-times"}/>

                    </React.Fragment>

                )
            })
        }
    }
    const resetForm = () => {
        //dosyalara bakılacak
        setDiarTitle("")
        setDiarText("")
    }
    const uploadMultipleImages = (dairId) => {
        let formData = new FormData();
        for (let i = 0; i < uploadedImages.length; i++) {
            var file = uploadedImages[i]
            formData.append('files', file);
        }
        formData.append("diarId", dairId)
        addImages(formData).then((response) => {
            msgBox("success", "Günlük Başarıyla Oluşturuldu")
            history.push("/")
        }).catch((error) => {
            msgBox("error", appmsg.errormsg)
        })
    }
    const creatediar = () => {
        let diar = {
            userid: user._id,
            title: diartitle,
            content: diartext
        }
        dispatch({TYPE: "CREATE", loading: true})
        creatediary(diar).then((response) => {
            resetForm()
            if (response.status === 200) {
                if (uploadedImages.length > 0)
                    return uploadMultipleImages(response.data._id)
                msgBox("success", "Günlük Başarıyla Oluşturuldu")
                history.push("/")
                debugger
                //detaya yönlendir
            } else if (response.status === 204) {
                //listeye yada detaya yönlendir
                msgBox("info", "Bugün İçin Bir Günlük Zaten Yazıldı, Düzenlemek İstiyorsanız Günlüklerime Gidin")
            }
            debugger
        }).catch((error) => {
            msgBox("error", appmsg.errormsg)
        })
    }

    const formValidate = () => {
        if (diarTitleValidator(diartitle) === false) {
            msgBox("error", "Lütfen Günlük Başlığı Giriniz")
        } else if (diarContentValidator(diartext) === false) {
            msgBox("error", "Lütfen Günlük İçeriği Giriniz")
        }
        /*dosya kontrolleri*/
        else {
            creatediar()
        }
    }
    return (
        <React.Fragment>
            <PageSubHeader pagename={"Günlük Yaz"}/>
            <Card>


                <Flex column={"col-xl-12 col-lg-12"}>


                    <InputForm placeholder={"...."}
                               value={diartitle}
                               onChange={(e) => {
                                   setDiarTitle(e.target.value)
                               }}
                               type={"text"}
                               autoFocus={true}
                               sublabel={true}
                               sublabelclass=""
                               sublabeltext=""
                               forminputclass=""
                               toplabel={true}
                               toplabeltext={"Günlük Başlığı"}
                    />
                    <MyEditor autoFocus={true}
                              value={diartext}
                              label={"Günlük İçeriği"}
                              onChange={(e) => {
                                  onChangeEditor(e)
                              }}

                    />
                    <div className="row">
                        <div className="col-lg-6">
                            <Card>
                                <p className="text text-center"> Resim Yükleme
                                </p>
                                <div className="form-group mb-3 mt-3">
                                    <a
                                        onClick={() => {
                                            creatediarfileInput.current.click();
                                        }}
                                        aria-pressed="true"
                                        className="btn btn-block btn-rounded btn-success text-white"
                                        role="button"
                                    >Resim Seç</a>
                                    <input className={"form-control"} multiple hidden type={"file"}
                                           ref={creatediarfileInput}
                                           name="myImage"
                                           onChange={() => {
                                               changeImage()
                                           }}
                                           accept="image/*"
                                           style={{display: "none"}}
                                    />

                                </div>
                                <div className="form-group">
                                    <p className="text text-center font-20 font-weight-bold mt-3 pb-2">
                                        {diarimages.length > 1 ? 'Önizleme' : ''}

                                    </p>

                                    {renderPreview()}
                                    <p className="text text-center mt-3 pb-2">{
                                        diarimages.length > 1 ? 'Toplam Resim ' + diarimages.length : ''
                                    }</p>
                                </div>
                            </Card>

                        </div>

                        <div className="col-lg-6">
                            <Card>
                                <div className="form-group mb-3">
                                    <label>Date Picker</label>
                                    <input type="file" className="form-control"/>
                                </div>
                                Video Yükleme
                            </Card>
                        </div>
                    </div>
                    <Button type={"button"} buttontxt={"Günlüğü Kaydet"}
                            onClick={() => {
                                formValidate()
                            }}
                            buttonclases={"btn btn-block btn-outline-info"}
                            icon={"pr-2 fa fa-save"}/>
                    {state.loading === true ?
                        <p className={"text text-center"}><Loading/>
                        </p> : null
                    }

                </Flex>
            </Card>
        </React.Fragment>
    )
}
export default CreateDiary
