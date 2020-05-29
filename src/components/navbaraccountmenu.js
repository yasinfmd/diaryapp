import React, {useContext, useState} from "react";
import {menu} from "../consts/menu";
import {useHistory} from "react-router-dom";
import GlobalContext from "../context/globalContext";
import AuthContext from "../context/authContext";

const NavBarAccountMenu = () => {
    const [menuList, setMenuList] = useState(menu)
    const {logout} = useContext(GlobalContext)
    const clickMenuItem = (menuItem) => {
        if (menuItem.text == "Çıkış Yap") {

            debugger
            logout()
        }
    }
    const renderMenuItem = (menuItem, index) => {
        return (
            <a href="#" onClick={(e) => {
                e.preventDefault()
                clickMenuItem(menuItem)
            }} key={index} className="dropdown-item notify-item">
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
