import React, {useContext, useState} from "react";
import {sidemenu, adminmenu} from "../consts/menu";
import {Link} from "react-router-dom";
import GlobalContext from "../context/globalContext";

const SideBar = () => {
    const [sideMenu, setSideMenu] = useState(sidemenu)
    const {user} = useContext(GlobalContext)
    const renderSideMenuItem = (menuItem, index) => {
        return (
            <li className="side-nav-item" key={index}>
                <Link to={menuItem.to} key={index} className="side-nav-link active">
                    <i className={menuItem.icon}></i>
                    <span> {menuItem.text} </span>
                </Link>
            </li>
        )
    }
    return (
        <ul className="metismenu side-nav mm-show">
            <li className="side-nav-title side-nav-item">Erişim </li>

            {
                (user && user.role != null) ? user.role == 0 ? sideMenu.map((menuItem, index) => renderSideMenuItem(menuItem, index))
                    : adminmenu.map((menuItem, index) => renderSideMenuItem(menuItem, index))
                    : null


            }
        </ul>
    )
}
export default React.memo(SideBar)
