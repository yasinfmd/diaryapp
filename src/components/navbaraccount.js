import React from "react";
import NavBarAccountUser from "./navbaraccountuser";
import NavBarAccountMenu from "./navbaraccountmenu";

const NavBarAccount = () => {
    return (
        <ul className="list-unstyled topbar-right-menu float-right mb-0">
            <li className="dropdown notification-list">
            <NavBarAccountUser/>
            <NavBarAccountMenu/>
            </li>

        </ul>)
}
export default React.memo(NavBarAccount)
