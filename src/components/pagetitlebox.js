import React, {useState} from "react";
import DatePicker from "./datepicker";
import Button from "./Button";

const PageTitleBox = (props) => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const [startDate, setStartDate] = useState(firstDay);
    const [endData, setEndData] = useState(lastDay)

    return (
        <div className="page-title-right">
            <form className="form-inline">
                <div className="form-group">
                    <div className="input-group">
                        <DatePicker value={startDate} onChange={(e) => {
                            setStartDate(e)
                        }} labelclass={"pr-1"} labeltext={"Başlangıç Tarihi"}/>
                        <DatePicker value={endData} onChange={(e) => setEndData(e)} labelclass={"pr-1 pl-3"}
                                    labeltext={"Bitiş Tarihi"}/>
                    </div>
                </div>
                <Button icon={"fa fa-undo"} buttonclases={"btn-primary ml-2"} buttontxt={""}></Button>
                <Button icon={"fa fa-search"} buttonclases={"btn-primary ml-1"} buttontxt={""}></Button>
            </form>
        </div>
    )
}

export default PageTitleBox
