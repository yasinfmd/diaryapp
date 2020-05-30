import React, {useContext, useEffect, useState} from "react";
import Button from "./Button";
import InputForm from "./formInput";
import {passwordValidator} from "../utils/appvalidator";
import useInput from "../customHooks/useInput";
import {msgBox} from "../utils/appmsgbox"
import AuthContext from "../context/authContext";
import {useHistory, useParams} from "react-router-dom";
import Loading from "./loading";

const PasswordResetForm = props => {
    const [loading, setLoading] = useState(false)
    const [userId, setuserId] = useState(1)
    const [password, bindpassword, resetpassword, passwordValidate] = useInput('', passwordValidator)
    const [confirmpassword, bindconfirmpassword, resetconfirmpassword, confirmpasswordValidate] = useInput('', passwordValidator)
    const {passwordtokencheck, updatepass} = useContext(AuthContext)
    let history = useHistory();
    let {token} = useParams();
    useEffect(() => {
        passwordtokencheck(token).then((response) => {
            setuserId(response.data._id)
        }).catch((error) => {
            if (error.response.status === 404) {
                msgBox("error", "Link Geçersiz")
            }

            history.replace("/login")
        })
    }, [])
    const updatepassword = () => {
        setLoading(true)
        updatepass({userid: userId, password: password}).then((response) => {
            history.replace("/login")
            setLoading(false)
        }).catch((error) => {
            msgBox("error", "Beklenmedik Bir Hata Gerçekleşti Lütfen Daha Sonra Tekrar Deneyin")
        })
    }
    const validateForm = () => {
        if (passwordValidator(password) === false) {
            msgBox("error", "Lütfen Geçerli Bir Parola  Giriniz")
        } else if (passwordValidator(confirmpassword) === false) {
            msgBox("error", "Lütfen Geçerli Bir Parola  Tekrarı  Giriniz")
        } else if (confirmpassword !== password) {
            msgBox("error", "Parolalar Eşleşmiyor")
        } else {
            updatepassword()
        }
    }
    return (
        <React.Fragment>
            {loading ? <Loading/> : null}
            <InputForm placeholder={"Parola"}
                       type={"password"}
                       sublabel={true}
                       {...bindpassword}
                       sublabelclass={passwordValidate === true ? (confirmpassword != password) ? "invalid-feedback" : "valid-feedback" : 'invalid-feedback'}
                       sublabeltext={passwordValidate === true ? (confirmpassword != password) ? "Parolalar Eşleşmiyor" : '' : "Parola Geçersiz"}
                       forminputclass={passwordValidate === true ? (confirmpassword != password) ? "is-invalid" : "is-valid" : "is-invalid"}
                       toplabel={true}
                       toplabeltext={"Parola"}
            />

            <InputForm placeholder={"Parola Tekrarı"}
                       type={"password"}
                       sublabel={true}
                       sublabelclass={confirmpasswordValidate === true ? (confirmpassword != password) ? "invalid-feedback" : "valid-feedback" : 'invalid-feedback'}
                       sublabeltext={
                           confirmpasswordValidate === true ? (confirmpassword != password) ? "Parolalar Eşleşmiyor" : ''
                               : "Parola Tekrarı Geçersiz"
                       }
                       {...bindconfirmpassword}
                       forminputclass={confirmpasswordValidate === true ? (confirmpassword != password) ? "is-invalid" : "is-valid" : "is-invalid"}
                       toplabel={true}
                       toplabeltext={"Parola Tekrarı"}
            />

            <div className="form-group mb-0 text-center">
                <Button icon="fa fa-sign-in mr-1"
                        onClick={() => {
                            validateForm()
                        }}
                        disabled={(passwordValidate === true && confirmpasswordValidate === true && password === confirmpassword) ? false : true}
                        type={"button"}
                        buttontxt={"Parolamı Sıfırla"} buttonclases={"btn-primary btn-block"}/>

            </div>
        </React.Fragment>
    )
}
export default PasswordResetForm

