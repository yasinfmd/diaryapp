import React, {useContext, useState} from "react";
import {menu} from "../consts/menu";
import {useHistory} from "react-router-dom";
import GlobalContext from "../context/globalContext";

const NavBarAccountMenu = () => {
    const [menuList, setMenuList] = useState(menu)
    const {updateUser, updateAuth} = useContext(GlobalContext)
    let history = useHistory();
    const clickMenuItem = (menuItem) => {
        if (menuItem.text == "Çıkış Yap") {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            updateAuth(true)
            updateUser(null)
            history.replace("/login")
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
