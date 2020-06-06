import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import Button from "./Button";
import InputForm from "./formInput";
import {emailValidator, passwordValidator, nameValidator, surnameValidator} from "../utils/appvalidator";
import AuthContext from "../context/authContext";
import Loading from "./loading";
import useInput from "../customHooks/useInput";
import {msgBox} from "../utils/appmsgbox";
import appmsg from "../utils/appmsg";

const RegisterForm = () => {
    let history = useHistory();
    const [email, bindemail, resetemail, emailValidate] = useInput('', emailValidator)
    const [password, bindpassword, resetpassword, passwordValidate] = useInput('', passwordValidator)
    const [name, bindname, resetname, nameValidate] = useInput('', nameValidator)
    const [surname, bindsurname, resetsurname, surnameValidate] = useInput('', surnameValidator)
    const {state, dispatch, register} = useContext(AuthContext)
    const onRegister = async () => {
        try {
            dispatch({type: "REGISTER", registermsg: "", loading: true})
            const result = await register({
                name,
                surname,
                password,
                email
            })
            if (result.status === 200) {
                history.push('/login')
            }
        } catch (error) {
            msgBox("error", appmsg.errormsg)
        }
    }

    const validateForm = () => {
        try {
            if (!nameValidator(name)) {
                msgBox("error", appmsg.registerform.name)
            } else if (!surnameValidator(surname)) {
                msgBox("error", appmsg.registerform.surname)
            } else if (!emailValidator(email)) {
                msgBox("error", appmsg.registerform.email)
            } else if (!passwordValidator(password)) {
                msgBox("error", appmsg.registerform.password)
            } else {
                onRegister()
            }
        } catch (error) {
            msgBox("error", appmsg.errormsg)
        }
    }
    return (
        <React.Fragment>
            {state.status === 204 ?
                <p className="text text-center text-danger">{appmsg.registerform.emailexist}</p> : ''}
            <InputForm placeholder={appmsg.registerform.nameplaceholder}
                       type={"text"}
                       sublabel={true}
                       sublabelclass={nameValidate === true ? "valid-feedback" : 'invalid-feedback'}
                       sublabeltext={nameValidate === true ? '' : appmsg.registerform.nameerror}
                       {...bindname}
                       forminputclass={nameValidate === true ? "is-valid" : "is-invalid"}
                       toplabel={true}
                       toplabeltext={appmsg.registerform.namelabel}
            />
            <InputForm placeholder={appmsg.registerform.surnameplaceholder}
                       type={"text"}
                       sublabel={true}
                       sublabelclass={surnameValidate === true ? "valid-feedback" : 'invalid-feedback'}
                       sublabeltext={surnameValidate === true ? '' : appmsg.registerform.surnameerror}
                       {...bindsurname}
                       forminputclass={surnameValidate === true ? "is-valid" : "is-invalid"}
                       toplabel={true}
                       toplabeltext={appmsg.registerform.surnamelabel}
            />
            <InputForm placeholder={appmsg.registerform.emailplaceholder}
                       type={"email"}
                       sublabel={true}
                       sublabelclass={emailValidate === true ? "valid-feedback" : 'invalid-feedback'}
                       sublabeltext={emailValidate === true ? '' : appmsg.registerform.emailerror}
                       {...bindemail}
                       forminputclass={emailValidate === true ? "is-valid" : "is-invalid"}
                       toplabel={true}
                       toplabeltext={appmsg.registerform.emaillabel}
            />
            <InputForm placeholder={appmsg.registerform.passwordplaceholder}
                       type={"password"}
                       sublabel={true}
                       sublabelclass={passwordValidate === true ? "valid-feedback" : 'invalid-feedback'}
                       sublabeltext={passwordValidate === true ? '' : appmsg.registerform.passworderror}
                       {...bindpassword}
                       forminputclass={passwordValidate === true ? "is-valid" : "is-invalid"}
                       toplabel={true}
                       toplabeltext={appmsg.registerform.passwordlabel}
            />
            <div className="form-group mb-0 text-center">
                <Button icon="fa fa-sign-in mr-1"
                        onClick={() => {
                            validateForm()
                        }}
                        disabled={(emailValidate === true && passwordValidate === true) ? false : true} type={"button"}
                        buttontxt={appmsg.registerform.register} buttonclases={"btn-primary btn-block"}>
                </Button>
                {state.loading === true ? <Loading/> : null}
            </div>
        </React.Fragment>
    )
}
export default RegisterForm

