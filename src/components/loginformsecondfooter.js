import React from "react";

const LoginFormSecondFooter = () => {
    return (
        <div className="auth-fluid-right text-center">
            <div className="auth-user-testimonial">
                <h2 className="mb-3 loginTitle">Hayat Bir Günlük İle Başlar :)</h2>
                <p className="lead">
                    © {new Date().toLocaleDateString().split(".")[2]}-
                    <a href="https://github.com/YASIINN?tab=repositories">Created by Yasin Dalkılıç</a>
                </p>
            </div>
        </div>
    )
}
export default LoginFormSecondFooter
