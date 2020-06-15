import React, {useContext, useState} from "react";
import DatePicker from "./datepicker";
import Button from "./Button";
import DiaryContext from "../context/diaryContext";
import GlobalContext from "../context/globalContext";
import {urlParse} from "../utils/appparser";
import {msgBox} from "../utils/appmsgbox";
import appmsg from "../utils/appmsg";

const PageTitleBox = (props) => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const [startDate, setStartDate] = useState(firstDay);
    const [endData, setEndData] = useState(lastDay)
    const {user} = useContext(GlobalContext)
    const {fetchdiary} = useContext(DiaryContext)
    const dateValidation = () => {
        if (startDate != null && endData != null) {
            fetchFilterDiary()
        } else {
            msgBox("error", "Lütfen Başlangıç ve Bitiş Tarih Aralığı Belirtiniz")
        }
    }

    const fetchFilterDiary = () => {
        const firstDay = startDate
        const lastDay = endData
        const where = urlParse.parse("dairdate>" + firstDay + "&dairdate<" + lastDay)
        fetchdiary({
            urlparse: where,
            userid: user._id,
            fields: "fullname",
            dairfields: "title content dairdate dairdateString -videos -images "
        }).then((response) => {
        }).catch((error) => {
            msgBox("error", appmsg.errormsg)
        })
    }
    return (
        <div className="page-title-right">
            <div className="form-inline">
                <div className="form-group">
                    <div className="input-group">
                        <DatePicker value={startDate} onChange={(e) => {
                            setStartDate(e)
                        }} labelclass={"pr-1"} labeltext={"Başlangıç Tarihi"}/>
                        <DatePicker value={endData} onChange={(e) => setEndData(e)} labelclass={"pr-1 pl-3"}
                                    labeltext={"Bitiş Tarihi"}/>
                    </div>
                </div>
                <Button icon={"fa fa-search"} onClick={() => {
                    dateValidation()
                }} buttonclases={"btn-primary ml-1"} buttontxt={""}></Button>
            </div>
        </div>
    )
}

export default React.memo(PageTitleBox)
