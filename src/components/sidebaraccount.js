import React, {useContext} from "react";
import GlobalContext from "../context/globalContext";
import {Link} from "react-router-dom";

const SideBarAccount = () => {
    const {user} = useContext(GlobalContext)
    return (
        <div className="leftbar-user">
            <Link to={"/"}>
                <img
                    src={user ? user.image : ''}

                    alt="user-image" height="42"
                    className="rounded-circle shadow-sm"/>
                <span className="leftbar-user-name">{user ? user.fullname.toUpperCase() : ''}</span>
            </Link>
        </div>
    )
}
export default React.memo(SideBarAccount)
