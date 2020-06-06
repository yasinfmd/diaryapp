import React from "react";

const SliderItem = (props) => {
    console.log("aaa",'carousel-item' + ' ' + (props.active === true ? 'active' : ''))
    return (
        <div className={'carousel-item' + ' ' + (props.active === true ? 'active' : '')}>
            <img src={props.image} alt="..."
                 style={{width:"800px",height:"450px"}}
                 className="d-block img-fluid"/>
            <div className="carousel-caption d-none d-md-block">
                <h3 className="text-white loginTitle">{props.uppertext}</h3>
                <p className={"loginTitle"}>{props.footertext}</p>
            </div>
        </div>
    )
}
export default SliderItem
