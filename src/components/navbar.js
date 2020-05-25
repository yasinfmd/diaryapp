import React from "react";

import Lines from "./lines";
import NavBarLogo from "./navbarlogo";
import NavBarText from "./navbartext";
import NavBarAccount from "./navbaraccount";

const NavBar = props => {
    return (
        <div className="navbar-custom topnav-navbar topnav-navbar-dark">
            <div className="container-fluid">
                <NavBarLogo/>
                <NavBarText/>
                <NavBarAccount/>
                <Lines/>
            </div>
        </div>

    )
}
export default NavBar
