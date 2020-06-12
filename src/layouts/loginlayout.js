import React from 'react'
import LoginFormSecondFooter from "../components/loginformsecondfooter";
import {Link} from "react-router-dom";
import appmsg from "../utils/appmsg";


const LoginLayout= (props) => {
    return (
        <React.Fragment>
            <div className="authentication-bg pb-0">
                <div className="auth-fluid">
                    <div className="auth-fluid-form-box">
                        <div className="align-items-center d-flex h-100">
                            <div className="card-body">

                                <div className="auth-brand text-center text-lg-left">
                                        <span><img
                                            src="data:image/png;base64,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"
                                            alt="" height="200"/></span>
                                </div>

                                <p className="text-muted mb-4">
                                    {props.children[0].props.header}
                                </p>

                                {props.children}
                                {props.children[0].props.location.pathname === "/login" ?
                                    <div className="text-center mt-4">
                                        <p className="text-muted font-16">
                                            <Link to={"/forgotpassword"} className="text-muted ml-1">
                                                {appmsg.loginlayout.forgotpassword}
                                            </Link>
                                        </p>
                                    </div> : null
                                }

                                <footer className="footer footer-alt">
                                    <p className="text-muted">{props.children[0].props.footertext}
                                        <Link
                                            to={props.children[0].props.footerurl}
                                            className="text-muted ml-1">
                                            <b>
                                                {props.children[0].props.footer}
                                            </b></Link></p>
                                </footer>

                            </div>
                        </div>
                    </div>
                    <LoginFormSecondFooter/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default React.memo(LoginLayout)
