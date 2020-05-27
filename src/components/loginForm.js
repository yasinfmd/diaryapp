import React, {useContext, useState} from "react";
import Button from "./Button";
import InputForm from "./formInput";
import {emailValidator, passwordValidator} from "../utils/appvalidator";
import useInput from "../customHooks/useInput";
import {msgBox} from "../utils/appmsgbox"
import AuthContext from "../context/authContext";
import {useHistory} from "react-router-dom";
import GlobalContext from "../context/globalContext";

const LoginForm = props => {
    const [email, bindemail, resetemail, emailValidate] = useInput('', emailValidator)
    const [password, bindpassword, resetpassword, passwordValidate] = useInput('', passwordValidator)
    const {login} = useContext(AuthContext)
    const {updateUser, updateAuth} = useContext(GlobalContext)
    let history = useHistory();
    const onLogin = () => {
        login({email, password}).then((response) => {
            if (response.status === 200) {
                localStorage.setItem("token", JSON.stringify(response.data.token))
                localStorage.setItem("user", JSON.stringify(response.data.user))
                updateAuth(true)
                updateUser(response.data.user)
                history.push('/')
                //dispatch token storageset token
            } else if (response.status === 204) {
                msgBox("warning", "Kullanıcı Adı Veya Parola Hatalı")
            }
        }).catch((error) => {
            msgBox("error", "Beklenmedik Bir Hata Gerçekleti Lütfen Daha Sonra Tekrar Deneyin")
        })
    }
    const validateForm = async () => {
        if (!emailValidator(email)) {
            msgBox("error", "Lütfen Geçerli Bir Email Adresi Giriniz")
        } else if (!passwordValidator(password)) {
            msgBox("error", "Lütfen Geçerli Bir Parola Giriniz")
        } else {
            onLogin()
        }
    }
    return (
        <React.Fragment>
            <InputForm placeholder={"ornek@example.com"}
                       type={"email"}
                       sublabel={true}
                       sublabelclass={emailValidate === true ? "valid-feedback" : 'invalid-feedback'}
                       sublabeltext={emailValidate === true ? '' : "Email Adresi Geçersiz"}
                       {...bindemail}
                       forminputclass={emailValidate === true ? "is-valid" : "is-invalid"}
                       toplabel={true}
                       toplabeltext={"Email"}
            />
            <InputForm placeholder={"Parolanız..."}
                       type={"password"}
                       sublabel={true}
                       sublabelclass={passwordValidate === true ? "valid-feedback" : 'invalid-feedback'}
                       sublabeltext={passwordValidate === true ? '' : "Parolanız 8 Karakter İçermelidir"}
                       {...bindpassword}
                       forminputclass={passwordValidate === true ? "is-valid" : "is-invalid"}
                       toplabel={true}
                       toplabeltext={"Parola"}
            />
            <div className="form-group mb-0 text-center">
                <Button icon="fa fa-sign-in mr-1"
                        onClick={() => {
                            validateForm()
                        }}
                        disabled={(emailValidate === true && passwordValidate === true) ? false : true} type={"button"}
                        buttontxt={"Giriş Yap"} buttonclases={"btn-primary btn-block"}/>

            </div>
        </React.Fragment>
    )
}
export default LoginForm

