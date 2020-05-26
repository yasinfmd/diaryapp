import React, {useState} from "react";
import {sidemenu} from "../consts/menu";
import {Link} from "react-router-dom";

const SideBar = () => {
    const [sideMenu, setSideMenu] = useState(sidemenu)

    const renderSideMenuItem = (menuItem, index) => {
        return (
            <li className="side-nav-item">
                <Link to={menuItem.to} key={index} className="side-nav-link active">
                    <i className={menuItem.icon}></i>
                    <span> {menuItem.text} </span>
                </Link>
            </li>
        )
    }
    return (
        <ul className="metismenu side-nav mm-show">
            <li className="side-nav-title side-nav-item">Erişim</li>
            {sideMenu.map((menuItem, index) => renderSideMenuItem(menuItem, index))}
        </ul>
    )
}
export default SideBar
