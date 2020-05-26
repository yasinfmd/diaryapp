import React from "react";

const Flex = (props) => {
    return (
        <div className="row">
            <div className={props.column}>
                {props.children}
            </div>
        </div>
    )
}

export default Flex;
