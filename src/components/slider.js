import React from "react";

const Slider = (props) => {
    return (
        <div id={props.sliderid} className="carousel slide" data-ride="carousel">
            <div className="carousel-inner" role="listbox">
                {props.children}
            </div>
            <a className="carousel-control-prev" href={'#' + props.sliderid} role="button"
               data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Önceki</span>
            </a>
            <a className="carousel-control-next" href={'#' + props.sliderid} role="button"
               data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Sonraki</span>
            </a>
        </div>
    )
}
export default Slider
