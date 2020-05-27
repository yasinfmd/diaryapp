import React from "react";
import Card from "./card";


const Accordion = (props) => {
    return (
        <div className="accordion custom-accordion" id="custom-accordion-one">
            {props.children}
        </div>
    )
}
export default Accordion
