import React, {useContext, useEffect, useState} from "react";
import PageSubHeader from "../components/pagesubheader";
import Card from "../components/card";
import GlobalContext from "../context/globalContext";
import DiaryContext from "../context/diaryContext";
import {useHistory, useParams} from "react-router-dom";
import Loading from "../components/loading";
import Slider from "../components/slider";
import SliderItem from "../components/slideritem";
import moment from "moment";
import Flex from "../components/flex";
import ReactPlayer from 'react-player'

export default function DiarDetail() {
    let history = useHistory();
    const [playing, setPlaying] = useState(false)
    const [playingVideo, setPlayingVideo] = useState(null)
    const {user} = useContext(GlobalContext)
    const {show, state} = useContext(DiaryContext)
    let {diarId} = useParams();
    useEffect(() => {
        if (diarId)
            return showDiar(diarId)

    }, [])
    const showDiar = (id) => {
        debugger
        show({populate: "images videos", userid: user._id, dairid: id}).then((response) => {
        }).catch((error) => {
            history.replace("/")
        })
    }
    const renderDiar = () => {
        if (!state.error && state.loading === false && state.showdiar._id !== undefined) {
            return (
                <Card title={moment(state.showdiar.dairdate).format("LLLL")}>
                    <h3 className="mt-3 mb-3 loginTitle font-weight-normal mt-0"
                        title="Number of Customers">{state.showdiar.title.toUpperCase()}</h3>
                    <p className={"text text-center"}>
                        {state.showdiar.content}
                    </p>
                </Card>
            )
        }
    }
    const renderSliderItem = () => {
        if (!state.error && state.loading === false && state.showdiar._id != undefined) {
            console.log("zzz", state.showdiar)
            if (state.showdiar.images && state.showdiar.images.length > 0) {
                return state.showdiar.images.map((image, index) => {
                    return (
                        <SliderItem image={image.imageUri} active={index === 0 ? true : false} uppertext={
                            moment(state.showdiar.dairdate).format("LLLL")
                        }
                                    footertext={user.fullname}
                        />
                    )
                })
            }
        }
    }
    return (

        <React.Fragment>
            <PageSubHeader pagename={"Günlük Detayı.."}/>
            <Card title={"Resim & Videolar"}>
                {state.loading === true ? <Loading/> : null}
                <div className="row">
                    <div className="col-md-6 col-lg-6">
                        <p className={"text text-center"}>Resimler</p>
                        {(!state.error && state.showdiar && state.showdiar._id != undefined && state.showdiar.images.length > 0) ?
                            <Slider sliderid={"diarslider"}>
                                {renderSliderItem()}
                            </Slider> : "Resim Bulunamadı"
                        }
                    </div>
                    <div className="col-6">
                        <p className={"text text-center"}>Video</p>
                        {(!state.error && state.showdiar && state.showdiar._id != undefined && state.showdiar.videos.length > 0) ?
                            <ul className="list-group">

                                <li className={`list-group-item ${playingVideo ? 'active' : ''}`} onClick={() => {
                                    setPlaying(!playing)
                                    setPlayingVideo((oldval) => {
                                        if (oldval != null) return null
                                        return state.showdiar.videos[0].videoUri
                                    })
                                }}>
                                    <i className="fa fa-play mr-1 text-success"></i>
                                    <label className={"text pl-1"}> {state.showdiar.videos[0].fileName}</label>
                                </li>
                            </ul> : "Video Bulunamadı"
                        }

                    </div>
                </div>
            </Card>
            {playingVideo ? (<Card>
                <Flex column={"col-12"}>
                    <ReactPlayer width={"800"} height={500} volume={0.5}
                                 url={playingVideo} playing={playing}
                                 controls={true}/>
                </Flex>
            </Card>) : null}
            {renderDiar()}
        </React.Fragment>

    )
}
