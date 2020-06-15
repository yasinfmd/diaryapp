import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import PageSubHeader from "../components/pagesubheader";
import {useHistory, useParams} from "react-router-dom";
import {urlParse} from "../utils/appparser";

import GlobalContext from "../context/globalContext";
import DiaryContext from "../context/diaryContext";
import Flex from "../components/flex";
import Card from "../components/card";
import appmsg from "../utils/appmsg";
import InputForm from "../components/formInput";
import MyEditor from "../components/editor";
import Button from "../components/Button";
import Loading from "../components/loading";
import {ImageValidator, VideoValidator} from "../utils/appimagevalidator";
import {readFileBase64} from "../utils/appimageconverter";
import {msgBox} from "../utils/appmsgbox";
import ReactPlayer from "react-player";
import {diarContentValidator, diarTitleValidator} from "../utils/appvalidator";

export default function EditDiar() {
    let creatediarfileInput = useRef()
    let creatediarvideoInput = useRef()
    const [diarvideo, setdiarvideo] = useState(null);
    const [diarimages, setdiarimages] = useState([])
    const [playingVideo, setPlayingVideo] = useState(null)
    const [playing, setPlaying] = useState(false)
    const [uploadedImages, setUploadedImages] = useState([])
    let history = useHistory();
    let {diarId} = useParams();
    const {user} = useContext(GlobalContext)
    const {show, state, dispatch, deleteDiarImage, deleteDiarVideo, updateDiary, addImages, addVideo} = useContext(DiaryContext)
    const [diarItem, setDiarItem] = useState(state.showdiar)
    useEffect(() => {
        if (diarId)
            return showDiar(diarId)
    }, [])
    const removeDiarVideo = () => {
        setPlaying(false)
        setPlayingVideo(null)
        const where = urlParse.parse("_id=" + state.showdiar.videos[0]._id);
        let filename = state.showdiar.videos[0].videoUri.split("/")
        filename = filename[filename.length - 1]
        let data = {
            filename: filename,
            dairid: state.showdiar._id,
            videoid: state.showdiar.videos[0]._id,
            urlparse: where
        }
        dispatch({type: "SHOW", loading: true, payload: diarItem})
        deleteDiarVideo(data).then((response) => {
            dispatch({type: "SHOW", loading: false, payload: Object.assign(diarItem, {videos: []})})
            msgBox("success", "Video Başarıyla Silindi")
        })
    }
    const removePreviewImage = (index) => {
        const images = JSON.parse(JSON.stringify(diarimages));
        images.splice(index, 1)
        setdiarimages([])
        setdiarimages(images)
    }
    const rendernewimagePreview = useMemo(() => {
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
    }, [diarimages.length])
    const removeImage = (image, index) => {
        const where = urlParse.parse("_id=" + image._id);
        let data = {
            filename: image.fileName,
            dairid: image.dairId,
            imageid: image._id,
            urlparse: where
        }
        let images = diarItem.images
        let newimages = images.filter((img) => {
            return img._id != image._id
        })
        dispatch({type: "SHOW", loading: true, payload: diarItem})
        deleteDiarImage(data).then((response) => {
            dispatch({type: "SHOW", loading: false, payload: Object.assign(diarItem, {images: newimages})})
            msgBox("success", "Resim Başarıyla Silindi")
        })

    }
    const renderPreview = useMemo(() => {
        if (diarItem && diarItem.images && diarItem.images.length > 0) {
            return diarItem.images.map((image, index) => {
                return (
                    <React.Fragment key={index + "fragment"}>
                        <img
                            key={index + "img"}
                            src={image.imageUri}
                            alt="image"
                            className="img-fluid avatar-xl pl-2 pt-2"/>
                        <Button buttonclases={"btn-danger btn-xs btn-sm"}
                                onClick={() => {
                                    removeImage(image, index)
                                }}
                                key={index + "btn"}
                                type={"button"} icon={"fa fa-times"}/>

                    </React.Fragment>

                )
            })
        } else {
            return <p className={"text text-center"}>Resim Bulunamadı..</p>
        }

    }, [diarItem.images])
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
    const changeVideo = () => {
        creatediarvideoInput.current.files.forEach((file) => {
            if (VideoValidator(file) === false) {
                msgBox("error", appmsg.creatediary.onlyvideo)
            } else {
                setdiarvideo(file)
            }

        })
    }
    const uploadVideo = (dairId) => {
        let formData = new FormData();
        formData.append("file", diarvideo)
        formData.append("dairid", dairId)
        addVideo(formData).then((res) => {
            msgBox("success", appmsg.creatediary.creatediar)
            history.push("/diar-detail/" + diarItem._id)

        })
    }
    const updateDiar = () => {
        let diar = {
            userid: user._id,
            title: diarItem.title,
            content: diarItem.content,
            urlparse: urlParse.parse("_id=" + state.showdiar._id)
        }
        updateDiary(diar).then((response) => {
            if (uploadedImages.length > 0) {
                return uploadMultipleImages(diarItem._id)
            } else {
                if (diarvideo) return uploadVideo(diarItem._id)
                msgBox("success", appmsg.creatediary.creatediar)
                history.push("/diar-detail/" + diarItem._id)
            }
        })
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
            history.push("/diar-detail/" + diarItem._id)
        })
    }
    const formValidate = () => {
        if (diarTitleValidator(diarItem.title) === false) {
            msgBox("error", appmsg.creatediary.enterdiartitle)
        } else if (diarContentValidator(diarItem.content) === false) {
            msgBox("error", appmsg.creatediary.enterdiarcontent)
        } else {
            updateDiar();
        }
    }
    const showDiar = (id) => {
        show({populate: "images videos", userid: user._id, dairid: id}).then((response) => {
            setDiarItem(response.data)
        }).catch((error) => {
            history.replace("/")
        })
    }
    return (
        <React.Fragment>
            <PageSubHeader pagename={"Günlük Düzenle.."}/>
            <Card>
                {state.loading === true ? <Loading/> : null}

                <Flex column={"col-12"}>
                    <InputForm placeholder={appmsg.creatediary.diartitleplaceholder}
                               value={diarItem.title}
                               type={"text"}
                               autoFocus={true}
                               sublabel={true}
                               sublabelclass=""
                               sublabeltext=""
                               forminputclass=""
                               toplabel={true}
                               onChange={(e) => {
                                   let diarTitle = JSON.parse(JSON.stringify(diarItem))
                                   diarTitle.title = e.target.value
                                   setDiarItem(diarTitle)
                               }}
                               toplabeltext={appmsg.creatediary.diartitlelabel}
                    />
                    <MyEditor autoFocus={true}
                              value={diarItem.content}
                              label={appmsg.creatediary.diartcontentlabel}
                              onChange={(e) => {
                                  let diarContent = JSON.parse(JSON.stringify(diarItem))
                                  diarContent.content = e
                                  setDiarItem(diarContent)
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
                                        {(diarimages.length > 1) ? appmsg.creatediary.preview : ''}

                                    </p>

                                    {rendernewimagePreview}
                                    <p className="text text-center mt-3 pb-2">{
                                        (diarimages.length > 1) ? appmsg.creatediary.totalimg + " " + diarimages.length : ''
                                    }</p>
                                </div>
                            </Card>

                        </div>

                        {diarItem && diarItem.videos && diarItem.videos.length < 1 ?
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
                            </div> : null}
                    </div>
                </Flex>
                <Flex column={"col-12"}>
                    <div className="row">
                        {(diarItem && diarItem.images && diarItem.images.length > 0) ? <div className="col-lg-6">
                            <Card>
                                <p className="text text-center"> Resimler..
                                </p>
                                <div className="form-group">

                                    {renderPreview}
                                    <p className="text text-center mt-3 pb-2">{
                                        (diarItem && diarItem.images && diarItem.images.length > 1) ? appmsg.creatediary.totalimg + " " + diarItem.images.length : ''
                                    }</p>
                                </div>
                            </Card>

                        </div> : null}


                        <div className="col-lg-6">
                            {(diarItem && diarItem.videos && diarItem.videos.length > 0) ?
                                <Card>
                                    <p className="text text-center">Videolar...</p>
                                    <div className="form-group mb-3">
                                        <ul className="list-group">
                                            <li className={`list-group-item d-flex justify-content-between align-items-center ${playingVideo ? 'active' : ''}`}
                                            >
                                                <i className="fa fa-play mr-1 text-success"
                                                   onClick={() => {
                                                       setPlaying(!playing)
                                                       setPlayingVideo((oldval) => {
                                                           if (oldval != null) return null
                                                           return state.showdiar.videos[0].videoUri
                                                       })
                                                   }}
                                                />
                                                {state.showdiar.videos[0].fileName}
                                                <span className="badge badge-outline-danger badge-pill"
                                                      onClick={() => {
                                                          removeDiarVideo()
                                                      }}
                                                      role={"button"}>X</span>
                                            </li>
                                        </ul>

                                    </div>
                                </Card> : null
                            }

                        </div>
                    </div>
                </Flex>
                {playingVideo ?
                    <Card>
                        <Flex column={"col-12"}>
                            <ReactPlayer width={"800"} height={500} volume={0.5}
                                         url={playingVideo} playing={playing}
                                         controls={true}/>
                        </Flex>
                    </Card>
                    : null}
                <Button type={"button"} buttontxt={appmsg.creatediary.savediar}
                        onClick={() => {
                            formValidate()
                        }}
                        buttonclases={"btn btn-block btn-outline-success btn-rounded"}
                        icon={"pr-2 fa fa-save"}/>
            </Card>
        </React.Fragment>
    )
}
