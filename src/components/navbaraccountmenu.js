import React, {useState} from "react";
import {menu} from "../consts/menu";

const NavBarAccountMenu = () => {
    const [menuList, setMenuList] = useState(menu)

    const renderMenuItem = (menuItem, index) => {
        return (
            <a href="javascript:void(0);" key={index} className="dropdown-item notify-item">
                <i className={menuItem.icon + " " + "mr-1"}></i>
                <span>{menuItem.text}</span>
            </a>
        )
    }
    return (
        <div
            className="dropdown-menu dropdown-menu-right dropdown-menu-animated topbar-dropdown-menu profile-dropdown"
            aria-labelledby="topbar-userdrop">
            <div className="dropdown-header noti-title">
                <h6 className="text-overflow m-0">Hoşgeldiniz &#128522;</h6>
            </div>
            {menuList.map((menuItem, index) => renderMenuItem(menuItem, index))}
        </div>
    )
}
export default NavBarAccountMenu
