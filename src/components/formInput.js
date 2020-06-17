import React from "react";
import PropTypes from "prop-types";


const InputForm = props => {
    return (
        <div className={"form-group" + " " + props.forminputclass}>
            {props.toplabel === true ? <label>{props.toplabeltext}</label> : null}
            <input type={props.type}
                   name={props.name}
                   autoFocus={props.autoFocus}
                   className={"form-control" + " " + props.forminputclass}
                   placeholder={props.placeholder} value={props.value} onChange={props.onChange}/>
            {/*"invalid-feedback"*/}
            {props.sublabel === true ? <div className={props.sublabelclass}>
                {props.sublabeltext}
            </div> : null}

        </div>
    )
}
/*InputForm.defaultProps = {
    type:"",
    inputclass: "",
    toplabel: false,
    sublabel: false,
    sublabeltext: "",
    sublabelclass: "",
    value: "",
    placeholder: "...",
    toplabeltext: "",
    forminputclass: ""
};*/
/*InputForm.PropTypes = {
    type:PropTypes.string,
    onChange: PropTypes.func,
    inputclass: PropTypes.string,
    forminputclass: PropTypes.string,
    toplabel: PropTypes.bool,
    toplabeltext: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    buttonclases: PropTypes.string.isRequired,
    sublabelclass: PropTypes.string,
    sublabeltext: PropTypes.string,
    sublabel: PropTypes.bool
}*/
export default InputForm
