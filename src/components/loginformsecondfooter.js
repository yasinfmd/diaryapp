import React from "react";
import appmsg from "../utils/appmsg";

const LoginFormSecondFooter = () => {
    return (
        <div className="auth-fluid-right text-center">
            <div className="auth-user-testimonial">
                <h2 className="mb-3 loginTitle">{appmsg.loginlayout.mainmsg}</h2>
                <p className="lead">
                    © {new Date().toLocaleDateString().split(".")[2]}-
                    <a href="https://github.com/YASIINN?tab=repositories">{appmsg.loginlayout.created}</a>
                </p>
            </div>
        </div>
    )
}
export default LoginFormSecondFooter
