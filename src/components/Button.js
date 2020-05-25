import React from "react";
import PropTypes from 'prop-types';

const Button = props => {
    return (
        <button className={"btn" + " " + props.buttonclases} type={props.type} {...props} onClick={props.onClick}>
            {props.icon ? <i className={props.icon}></i> : null}

            {props.buttontxt}
        </button>
    )
}
/*Button.defaultProps = {
    icon: "",
    buttontxt: "",
    type: "button"
};
Button.PropTypes = {
    buttonclases: PropTypes.string.isRequired,
    icon: PropTypes.string,
    buttontxt: PropTypes.string,
    type: PropTypes.string
}*/
export default Button
