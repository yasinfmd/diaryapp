import React, {useState} from "react";
import DatePicker from 'react-date-picker'

const datePicker = (props) => {
    return (
        <React.Fragment>
            <label className={props.labelclass}>{props.labeltext}</label>
            <DatePicker
                onChange={props.onChange}
                value={props.value}
            />
        </React.Fragment>
    )
}

export default datePicker
