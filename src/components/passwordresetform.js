import React, {useContext} from "react";
import Button from "./Button";
import InputForm from "./formInput";
import {emailValidator} from "../utils/appvalidator";
import useInput from "../customHooks/useInput";
import {msgBox} from "../utils/appmsgbox"
import AuthContext from "../context/authContext";
import {useHistory} from "react-router-dom";

const PasswordResetForm = props => {
    const [email, bindemail, resetemail, emailValidate] = useInput('', emailValidator)
    const {forgotpassword} = useContext(AuthContext)

    let history = useHistory();

    const forgotpass = () => {
        forgotpassword({email: email}).then((response) => {
            msgBox("success", "Parola Sıfırlama Bağlantısı Email Adresine Gönderildi")
            history.push("/login")
        }).catch((error) => {
            if (error.response.status === 404) {
                msgBox("info", "Email Adresi Bulunumadı")
            } else if (error.response.status === 500) {
                msgBox("error", "Beklenmedik Bir Hata Gerçekleşti Lütfen Daha Sonra Tekrar Deneyin")
            }
        })
    }
    const validateForm = () => {
        if (!emailValidator(email)) {
            msgBox("error", "Lütfen Geçerli Bir Email Adresi Giriniz")
        } else {
            forgotpass()
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

            <div className="form-group mb-0 text-center">
                <Button icon="fa fa-sign-in mr-1"
                        onClick={() => {
                            validateForm()
                        }}
                        disabled={(emailValidate === true) ? false : true} type={"button"}
                        buttontxt={"Parolamı Sıfırla"} buttonclases={"btn-primary btn-block"}/>

            </div>
        </React.Fragment>
    )
}
export default PasswordResetForm

