import React from "react";
import Flex from "./flex";

const PageSubHeader = (props) => {
    console.log("pagesubhead")
    return (
        <Flex column={"col-12"}>
            <div className="page-title-box">
                {props.children}
                <h4 className="page-title">{props.pagename}</h4>
            </div>
        </Flex>
    )
}
export default React.memo(PageSubHeader)
