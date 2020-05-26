import React, {useContext} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import MainLayout from "../layouts/mainlayout"
import LoginLayout from "../layouts/loginlayout"
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import AppRoute from "./approutelayout";
import Register from "../pages/register";
import ForgotPassword from "../pages/forgotpassword"
import ResetPassword from "../pages/resetpassword"
import CreateDiar from "../pages/creatediar"


import AuthStore from "../store/authStateProvider"
import DiaryStore from "../store/diaryStateProvider";

export default function Routers() {

    return (
        <Router>
            <DiaryStore>
                <AppRoute path="/" exact layout={MainLayout} component={Dashboard} routeProtection={true}></AppRoute>
                <AppRoute path="/create-diar" exact
                          layout={MainLayout}
                          component={CreateDiar}
                          routeProtection={true}></AppRoute>
            </DiaryStore>
            <AuthStore>
                <AppRoute path="/resetpassword/:token" header={"Yeni Parola Oluştur"}
                          footerurl={"/login"}

                          footertext={""}
                          footer={""} layout={LoginLayout}
                          component={ResetPassword}
                          routeProtection={false}></AppRoute>

                <AppRoute path="/forgotpassword" header={"Parola Sıfırlama"}
                          footerurl={"/login"}
                          footertext={"Geri Dön"}
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
            {/*   <Redirect from='*' to='/login' />*/}
        </Router>
    )
}
