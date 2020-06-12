import React from "react";

const Card = (props) => {
    return (
        <div className={"card" + " " + props.cardclass} style={{height: "90%"}}>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <h6 className="card-subtitle">{props.subtitle}</h6>
                {props.children}
                <p className="card-text">{props.cardtext}</p>

                {props.sub ? (<div className="card-body">
                    {props.sub}
                </div>) : null}

            </div>
        </div>
    )
}
export default React.memo(Card)
