import React from "react";
import InputForm from "./formInput";
import Button from "./Button";
import useInput from "../customHooks/useInput";
import {passwordValidator} from "../utils/appvalidator";
import {msgBox} from "../utils/appmsgbox";

const ChangePasswordForm = (props) => {
    const [currentpassword, bindcurrentpassword, resetcurrentpassword, currentpasswordValidate] = useInput('', passwordValidator)
    const [newpassword, bindnewpassword, resetnewpassword, newpasswordValidate] = useInput('', passwordValidator)
    const [newpasswordrepeat, bindnewpasswordrepeat, resetnewpasswordrepeat, newpasswordrepeatValidate] = useInput('', passwordValidator)

    const checkCurrentPassword = () => {

    }

    const validateForm = () => {
        if (!passwordValidator(currentpassword)) {
            msgBox("error", "Lütfen Geçerli Bir Parola  Giriniz")
        } else if (!passwordValidator(newpassword)) {
            msgBox("error", "Lütfen Geçerli Bir Yeni Parola  Giriniz")
        } else if (!passwordValidator(newpasswordrepeat)) {
            msgBox("error", "Lütfen Geçerli Bir Yeni Parola Tekrarı Giriniz")
        } else if (newpassword != newpasswordrepeat) {
            msgBox("error", "Parolalar Eşleşmiyor")
        } else {
            checkCurrentPassword()
        }
    }

    return (
        <React.Fragment>
            <InputForm placeholder={"Şuanki Parolanız.."}
                       type={"password"}
                       sublabel={true}
                       sublabelclass={currentpasswordValidate === true ? "valid-feedback" : 'invalid-feedback'}
                       sublabeltext={currentpasswordValidate === true ? '' : "Email Adresi Geçersiz"}
                       {...bindcurrentpassword}
                       forminputclass={currentpasswordValidate === true ? "is-valid" : "is-invalid"}
                       toplabel={true}
                       toplabeltext={"Şuanki Parola"}
            />

            <InputForm placeholder={"Yeni Parola.."}
                       type={"password"}
                       sublabel={true}
                       sublabelclass={newpasswordValidate === true ? (newpassword != newpasswordrepeat) ? "invalid-feedback" : "valid-feedback" : 'invalid-feedback'}
                       sublabeltext={newpasswordValidate === true ? (newpassword != newpasswordrepeat) ? "Parolalar Eşleşmiyor" : '' : "Yeni Parola Geçersiz"}
                       forminputclass={newpasswordValidate === true ? (newpassword != newpasswordrepeat) ? "is-invalid" : "is-valid" : "is-invalid"}
                       {...bindnewpassword}
                       toplabel={true}
                       toplabeltext={"Yeni Parola"}
            />
            <InputForm placeholder={"Yeni Parola Tekrarı.."}
                       type={"password"}
                       sublabel={true}

                       sublabelclass={newpasswordrepeatValidate === true ? (newpassword != newpasswordrepeat) ? "invalid-feedback" : "valid-feedback" : 'invalid-feedback'}
                       sublabeltext={newpasswordrepeatValidate === true ? (newpassword != newpasswordrepeat) ? "Parolalar Eşleşmiyor" : '' : "Yeni Parola Tekrarı Geçersiz"}
                       forminputclass={newpasswordrepeatValidate === true ? (newpassword != newpasswordrepeat) ? "is-invalid" : "is-valid" : "is-invalid"}
                       {...bindnewpasswordrepeat}
                       toplabel={true}
                       toplabeltext={"Yeni Parola Tekrarı"}
            />

            <div className="form-group mb-0 text-center">
                <Button icon="fa fa-sign-in mr-1"
                        type={"button"}
                        onClick={() => {
                            validateForm()
                        }}
                        disabled={(currentpasswordValidate == true && newpasswordValidate === true && newpasswordrepeatValidate === true && newpassword === newpasswordrepeat) ? false : true}
                        buttontxt={"Parolamı Sıfırla"} buttonclases={"btn-primary btn-block"}/>
            </div>
        </React.Fragment>
    )
}
export default ChangePasswordForm
