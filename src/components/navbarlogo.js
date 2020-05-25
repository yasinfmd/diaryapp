import React from "react";
import Logo from "../logo.png"
import {
    Link
} from "react-router-dom";

const NavBarLogo = () => {
    return (
        <Link to={"/"} className={"topnav-logo"}>
                <span className="topnav-logo-lg">
                        <img src={Logo} alt="Günlük" className="navlogo" height="50" width="50"/>
                    </span>
                    <span className="topnav-logo-sm">
                        <img src={Logo} className="navlogo" alt="Günlük" height="50" width="50"/>
                    </span>

        </Link>
)
}
export default NavBarLogo
