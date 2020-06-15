import React, {useContext, useState} from "react";
import {menu} from "../consts/menu";
import {Link, useHistory} from "react-router-dom";
import GlobalContext from "../context/globalContext";

const NavBarAccountMenu = () => {
    const history = useHistory();
    const [menuList, setMenuList] = useState(menu)
    const {logout} = useContext(GlobalContext)
    const clickMenuItem = (menuItem) => {
            logout()
    }
    const renderMenuItem = (menuItem, index) => {
        return (
            <Link to={menuItem.to}  key={index}
                  onClick={(e)=>{
                      if(menuItem.text=="Çıkış Yap"){
                          e.preventDefault()
                          clickMenuItem(menuItem)
                      }
                  }}
                  className="dropdown-item notify-item">
                <i className={menuItem.icon + " " + "mr-1"}></i>
                <span>{menuItem.text}</span>

            </Link>
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
export default React.memo(NavBarAccountMenu)
