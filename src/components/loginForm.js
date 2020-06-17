import React, {useContext} from "react";
import Button from "./Button";
import InputForm from "./formInput";
import {emailValidator, passwordValidator} from "../utils/appvalidator";
import useInput from "../customHooks/useInput";
import {msgBox} from "../utils/appmsgbox"
import AuthContext from "../context/authContext";
import {useHistory} from "react-router-dom";
import GlobalContext from "../context/globalContext";
import parseJwt from "../utils/apptokendecoder";
import appmsg from "../utils/appmsg";

const LoginForm = () => {
    const [email, bindemail, resetemail, emailValidate] = useInput('', emailValidator)
    const [password, bindpassword, resetpassword, passwordValidate] = useInput('', passwordValidator)
    const {login} = useContext(AuthContext)
    const {updateUser, updateAuth, setExpiresin} = useContext(GlobalContext)
    let history = useHistory();
    const onLogin = () => {
       try{
           login({email, password}).then((response) => {
               if (response.status === 200) {
                   const parsedToken = parseJwt(response.data.token)
                   const exp = parsedToken.exp
                   const iat = parsedToken.iat
                   const expseconds = exp - iat
                   setExpiresin(+expseconds * 1000)
                   localStorage.setItem("expirationDate", new Date().getTime() + expseconds * 1000)
                   localStorage.setItem("token", JSON.stringify(response.data.token))
                   localStorage.setItem("user", JSON.stringify(response.data.user))
                   updateAuth(true)
                   updateUser(response.data.user)
                   console.log("role",response.data.user)
                   if(response.data.user.role===0)return history.push("/")
                       return history.push('/admin-dashboard')
               } else if (response.status === 204) {
                   msgBox("warning", appmsg.loginform.usernameorpassworderror)
               }
           })
       }catch (error) {
           msgBox("error", appmsg.errormsg)
       }
    }
    const validateForm = async () => {
        try{
            if (!emailValidator(email)) {
                msgBox("error", appmsg.loginform.email)
            } else if (!passwordValidator(password)) {
                msgBox("error", appmsg.loginform.password)
            } else {
                onLogin()
            }
        }catch (error) {
            msgBox("error", appmsg.errormsg)
        }
    }
    return (
        <React.Fragment>
            <InputForm placeholder={appmsg.loginform.emailplaceholder}
                       type={"email"}
                       sublabel={true}
                       name={"email"}
                       sublabelclass={emailValidate === true ? "valid-feedback" : 'invalid-feedback'}
                       sublabeltext={emailValidate === true ? '' : appmsg.loginform.emailerror}
                       {...bindemail}
                       forminputclass={emailValidate === true ? "is-valid" : "is-invalid"}
                       toplabel={true}
                       toplabeltext={appmsg.loginform.emaillabel}
            />
            <InputForm placeholder={appmsg.loginform.passwordplaceholder}
                       type={"password"}
                       sublabel={true}
                       name={"password"}
                       sublabelclass={passwordValidate === true ? "valid-feedback" : 'invalid-feedback'}
                       sublabeltext={passwordValidate === true ? '' : appmsg.loginform.passworderror}
                       {...bindpassword}
                       forminputclass={passwordValidate === true ? "is-valid" : "is-invalid"}
                       toplabel={true}
                       toplabeltext={appmsg.loginform.passwordlabel}
            />
            <div className="form-group mb-0 text-center">
                <Button icon="fa fa-sign-in mr-1"
                        onClick={() => {
                            validateForm()
                        }}
                        disabled={(emailValidate === true && passwordValidate === true) ? false : true} type={"button"}
                        buttontxt={appmsg.loginform.login} buttonclases={"btn-primary btn-block"}/>
            </div>
        </React.Fragment>
    )
}
export default LoginForm

