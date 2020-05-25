import React, {useContext} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import MainLayout from "../layouts/mainlayout"
import LoginLayout from "../layouts/loginlayout"
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import AppRoute from "./approutelayout";
import Register from "../pages/register";
import AuthStore from "../store/authStateProvider"
import ForgotPassword from "../pages/resetpassword"

export default function Routers() {

    return (
        <Router>
            <AppRoute path="/" exact layout={MainLayout} component={Dashboard} routeProtection={true}></AppRoute>
            <AuthStore>
                <AppRoute path="/forgotpassword" header={"Parolamı Unuttum"}
                          footerurl={"/login"}
                          footertext={"Geri Dön Giriş Yap"}
                          footer={"Giriş Yap"} layout={LoginLayout}
                          component={ForgotPassword}
                          routeProtection={false}></AppRoute>
                <AppRoute path="/login" header={"Giriş Yap"}
                          footertext={"Hesabın Yok Mu ?"}
                          footerurl={"/register"}
                          footer={"Kayıt Ol"} layout={LoginLayout} component={Login}
                          routeProtection={false}></AppRoute>
                <AppRoute path="/register" header={"Kayıt Ol"}
                          footerurl={"/login"}
                          footertext={"Hesabın Var Mı ?"}

                          footer={"Giriş Yap"} layout={LoginLayout} component={Register}
                          routeProtection={false}></AppRoute>
            </AuthStore>
        </Router>
    )
}
