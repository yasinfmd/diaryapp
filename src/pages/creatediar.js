import React, {useContext, useState} from "react";
import Card from "../components/card";
import MyEditor from "../components/editor";
import InputForm from "../components/formInput";
import DOMPurify from "dompurify"
import {diarContentValidator, diarTitleValidator} from "../utils/appvalidator";
import GlobalContext from "../context/globalContext";
import Flex from "../components/flex";
import Button from "../components/Button";
import {msgBox} from "../utils/appmsgbox";
import DiaryContext from "../context/diaryContext";
import Loading from "../components/loading";
import PageSubHeader from "../components/pagesubheader";

const CreateDiary = () => {
    const [diartext, setDiarText] = useState("")
    const [diartitle, setDiarTitle] = useState("")
    const {user} = useContext(GlobalContext)
    const {creatediary, state, dispatch} = useContext(DiaryContext)
    console.log(state)
    const onChangeEditor = (e) => {
        setDiarText(e)
    }

    const resetForm = () => {
        //dosyalara bakılacak
        setDiarTitle("")
        setDiarText("")
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
                msgBox("success", "Günlük Başarıyla Oluşturuldu")
                //detaya yönlendir
            } else if (response.status === 204) {
                //listeye yada detaya yönlendir
                msgBox("info", "Bugün İçin Bir Günlük Zaten Yazıldı, Düzenlemek İstiyorsanız Günlüklerime Gidin")
            }
            debugger
        }).catch((error) => {
            msgBox("error", "Beklenmedik Bir Hata Gerçekleşti Lütfen Daha Sonra Tekrar Deneyin")
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
                                Resim Yükleme
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
