import React from 'react'
import NavBar from "../components/navbar";
import SideBarAccount from "../components/sidebaraccount";
import SideBar from "../components/sidebar";

const MailnLayout= ({children}) => {


    return (
     <React.Fragment>
            <NavBar/>
            <div className="container-fluid mm-active">
                <div className="wrapper mm-show">
                    <div className="left-side-menu left-side-menu-detached mm-active">

                        <SideBarAccount/>

                  <SideBar/>


                        <div className="clearfix"></div>

                    </div>
                    <div className="content-page">
                        <div className="content">

                            {children}


                        </div>
                    </div>


                </div>
            </div>
     </React.Fragment>
    )
}

export  default  React.memo(MailnLayout)
