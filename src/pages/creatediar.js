import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
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
import {ImageValidator, VideoValidator} from "../utils/appimagevalidator";
import {readFileBase64} from "../utils/appimageconverter";
import {useHistory} from "react-router-dom";
import moment from "moment";
import {urlParse} from "../utils/appparser";

const CreateDiary = () => {
    let history = useHistory();
    let creatediarfileInput = useRef()
    let creatediarvideoInput = useRef()
    const [diartext, setDiarText] = useState("")
    const [diartitle, setDiarTitle] = useState("")
    const {user} = useContext(GlobalContext)
    const {creatediary, fetchdiary, state, dispatch, addImages, addVideo} = useContext(DiaryContext)
    const [diarimages, setdiarimages] = useState([])
    const [diarvideo, setdiarvideo] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([])
    const onChangeEditor = (e) => {
        setDiarText(e)
    }
    const changeVideo = () => {
        creatediarvideoInput.current.files.forEach((file) => {
            if (VideoValidator(file) === false) {
                msgBox("error", appmsg.creatediary.onlyvideo)
            } else {
                setdiarvideo(file)
            }

        })
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


    const renderPreview=useMemo(()=>{
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
    },[diarimages.length])


    const resetForm = () => {
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
            if (diarvideo) return uploadVideo(dairId)
            msgBox("success", appmsg.creatediary.creatediar)
            history.push("/")
        })
    }
    const uploadVideo = (dairId) => {
        let formData = new FormData();
        formData.append("file", diarvideo)
        formData.append("dairid", dairId)
        addVideo(formData).then((res) => {
            msgBox("success", appmsg.creatediary.creatediar)
            history.push("/")
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
                if (uploadedImages.length > 0) {
                    return uploadMultipleImages(response.data._id)
                } else {
                    if (diarvideo) return uploadVideo(response.data._id)
                    msgBox("success", appmsg.creatediary.creatediar)
                    history.push("/diar-detail/" + response.data._id)
                }

            } else if (response.status === 204) {
                fetchTodayDiar()
                //show de detaya gönder ?
                //listeye yada detaya yönlendir
                msgBox("info", appmsg.creatediary.havediar)
            }
        })
    }
    const fetchTodayDiar = () => {
        const today = moment().format('YYYY-MM-DD');
        const tomorrow = moment().add(1, "days").format("YYYY-MM-DD")
        const where = urlParse.parse("dairdate>" + today + "&dairdate<" + tomorrow)
        fetchdiary({
            urlparse: where,
            userid: user._id,
            fields: "fullname",
            dairfields: "title content dairdate dairdateString -videos -images "
        }).then((response) => {
            history.push("/diar-detail/" + response.data.diaries[0]._id)
        }).catch((error) => {
            msgBox("error", appmsg.errormsg)
        })
    }
    const getsay=()=>{
        console.log("sayıyor")
        return diarimages.length
    }
    const formValidate = () => {
        if (diarTitleValidator(diartitle) === false) {
            msgBox("error", appmsg.creatediary.enterdiartitle)
        } else if (diarContentValidator(diartext) === false) {
            msgBox("error", appmsg.creatediary.enterdiarcontent)
        } else {
            creatediar()
        }
    }
    return (
        <React.Fragment>
            <PageSubHeader pagename={appmsg.creatediary.creatediartitle}/>
            <Card>
                <Flex column={"col-xl-12 col-lg-12"}>
                    <InputForm placeholder={appmsg.creatediary.diartitleplaceholder}
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
                               toplabeltext={appmsg.creatediary.diartitlelabel}
                    />
                    <MyEditor autoFocus={true}
                              value={diartext}
                              label={appmsg.creatediary.diartcontentlabel}
                              onChange={(e) => {
                                  onChangeEditor(e)
                              }}

                    />
                    <div className="row">
                        <div className="col-lg-6">
                            <Card>
                                <p className="text text-center"> {appmsg.creatediary.uploadimg}
                                </p>
                                <div className="form-group mb-3 mt-3">
                                    <a
                                        onClick={() => {
                                            creatediarfileInput.current.click();
                                        }}
                                        aria-pressed="true"
                                        className="btn btn-block btn-rounded btn-success text-white"
                                        role="button"
                                    >{appmsg.creatediary.pickimage}</a>
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
                                        {diarimages.length > 1 ? appmsg.creatediary.preview : ''}

                                    </p>

                                    {renderPreview}
                                    <p className="text text-center mt-3 pb-2">{
                                        diarimages.length > 1 ? appmsg.creatediary.totalimg + " " + diarimages.length : ''
                                    }</p>
                                </div>
                            </Card>

                        </div>

                        <div className="col-lg-6">
                            <Card>
                                <p className="text text-center">{appmsg.creatediary.videoupload}</p>
                                <div className="form-group mb-3">
                                    <a
                                        onClick={() => {
                                            creatediarvideoInput.current.click();
                                        }}
                                        aria-pressed="true"
                                        className="btn btn-block btn-rounded btn-success text-white"
                                        role="button"
                                    > {appmsg.creatediary.pickvideo}</a>
                                    {diarvideo ?
                                        <p className={"text text-center pt-3"}> Seçilen Video : {diarvideo.name}

                                            <Button type={"button"} buttontxt={"Videoyu Sil"} onClick={() => {
                                                setdiarvideo(null)
                                            }}
                                                    buttonclases={"btn-sm btn-xs btn-outline-danger"}
                                                    icon={'pr-2 fa fa-trash'}/>
                                        </p> : null
                                    }
                                    <input className={"form-control"} hidden type={"file"}
                                           ref={creatediarvideoInput}
                                           name="myImage"
                                           onChange={() => {
                                               changeVideo()
                                           }}
                                           accept="video/*"
                                           style={{display: "none"}}
                                    />
                                </div>

                            </Card>
                        </div>
                    </div>

                    <Button type={"button"} buttontxt={appmsg.creatediary.savediar}
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
