import React from "react";
import Accordion from "./accordion";

const AccordionItem = (props) => {
    return (
        <div className="card mb-0">
            <div className="card-header" id={props.headid}>
                <h5 className="m-0">
                    <a className="custom-accordion-title collapsed d-block py-1"
                       onClick={props.onClick}
                       data-toggle="collapse" href={'#' + props.id}
                       aria-expanded="false" aria-controls={props.id}>
                        {props.title}<i
                    ></i>
                    </a>
                </h5>
            </div>
            <div id={props.id} className="collapse"
                 aria-labelledby={props.headid}
                 data-parent="#custom-accordion-one">
                <div className="card-body">
                    {props.content}
                </div>
            </div>
        </div>
    )
}
export default AccordionItem
