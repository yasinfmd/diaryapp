import React, {useContext} from "react";
import Button from "./Button";
import InputForm from "./formInput";
import {emailValidator} from "../utils/appvalidator";
import useInput from "../customHooks/useInput";
import {msgBox} from "../utils/appmsgbox"
import AuthContext from "../context/authContext";
import {useHistory} from "react-router-dom";
import appmsg from "../utils/appmsg";

const ForgotPasswordForm = () => {
    const [email, bindemail, resetemail, emailValidate] = useInput('', emailValidator)
    const {forgotpassword} = useContext(AuthContext)

    let history = useHistory();

    const forgotpass = () => {
        forgotpassword({email: email}).then((response) => {
            msgBox("success", appmsg.forgotpassword.resetpasswordlinksend)
            history.push("/login")
        })
    }
    const validateForm = () => {
        if (!emailValidator(email)) {
            msgBox("error", appmsg.forgotpassword.email)
        } else {
            forgotpass()
        }
    }
    return (
        <React.Fragment>
            <InputForm placeholder={appmsg.forgotpassword.emailplaceholder}
                       type={"email"}
                       sublabel={true}
                       sublabelclass={emailValidate === true ? "valid-feedback" : 'invalid-feedback'}
                       sublabeltext={emailValidate === true ? '' : appmsg.forgotpassword.emailerror}
                       {...bindemail}
                       forminputclass={emailValidate === true ? "is-valid" : "is-invalid"}
                       toplabel={true}
                       toplabeltext={appmsg.forgotpassword.emaillabel}
            />

            <div className="form-group mb-0 text-center">
                <Button icon="fa fa-sign-in mr-1"
                        onClick={() => {
                            validateForm()
                        }}
                        disabled={(emailValidate === true) ? false : true} type={"button"}
                        buttontxt={appmsg.forgotpassword.resetpassword} buttonclases={"btn-primary btn-block"}/>

            </div>
        </React.Fragment>
    )
}
export default ForgotPasswordForm

