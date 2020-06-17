import React, {useContext} from "react";
import GlobalContext from "../context/globalContext";

const NavBarAccountUser = () => {
    const {user} = useContext(GlobalContext)
    return (
        <a className="nav-link dropdown-toggle nav-user arrow-none mr-0" data-toggle="dropdown"
           id="topbar-userdrop" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                        <span className="account-user-avatar">
                                <img
                                    src={user ? user.image : ''}
                                    alt="user-image" className="rounded-circle"/>
                            </span>
            <span>
                        <span className="account-user-name">{user ? user.fullname.toUpperCase() : ''}</span>
                        <span className="account-position">{user?user.role==0?"Günlük Kullanıcısı":'Günlük Yöneticisi':null}</span>
                        </span>
        </a>
    )
}
export default React.memo(NavBarAccountUser)
