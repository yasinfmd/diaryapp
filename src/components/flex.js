import React from "react";

const Flex = (props) => {
    console.log("flex")
    return (
        <div className="row">
            <div className={props.column}>
                {props.children}
            </div>
        </div>
    )
}

export default  React.memo(Flex);
