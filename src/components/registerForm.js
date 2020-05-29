import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import Button from "./Button";
import InputForm from "./formInput";
import {emailValidator, passwordValidator, nameValidator, surnameValidator} from "../utils/appvalidator";
import AuthContext from "../context/authContext";
import Loading from "./loading";
import useInput from "../customHooks/useInput";
import {msgBox} from "../utils/appmsgbox";

const RegisterForm = props => {
    let history = useHistory();
    const [email, bindemail, resetemail, emailValidate] = useInput('', emailValidator)
    const [password, bindpassword, resetpassword, passwordValidate] = useInput('', passwordValidator)
    const [name, bindname, resetname, nameValidate] = useInput('', nameValidator)
    const [surname, bindsurname, resetsurname, surnameValidate] = useInput('', surnameValidator)
    const {state, dispatch, register} = useContext(AuthContext)
    const onRegister = async () => {
        dispatch({type: "REGISTER", registermsg: "", loading: true})
        const result = await register({
            name,
            surname,
            password,
            email
        })
        if (result.status === 200) {
            history.push('/login')
            resetemail()
            resetname()
            resetpassword()
            resetsurname()
        }
    }

    const validateForm = () => {
        debugger
        if (!nameValidator(name)) {
            msgBox("error", "Lütfen Geçerli Bir Ad Giriniz")
        } else if (!surnameValidator(surname)) {
            msgBox("error", "Lütfen Geçerli Bir SoyAd Giriniz")
        } else if (!emailValidator(email)) {
            msgBox("error", "Lütfen Geçerli Bir Email Giriniz")
        } else if (!passwordValidator(password)) {
            msgBox("error", "Lütfen Geçerli Bir Parola Giriniz")
        } else {
            onRegister()
        }
    }
    return (
        <React.Fragment>
            {state.status === 204 ? <p className="text text-center text-danger">Email Adresi Kullanımda</p> : ''}
            <InputForm placeholder={"İsim Giriniz..."}
                       type={"text"}
                       sublabel={true}
                       sublabelclass={nameValidate === true ? "valid-feedback" : 'invalid-feedback'}
                       sublabeltext={nameValidate === true ? '' : "İsim Geçersiz"}
                       {...bindname}
                       forminputclass={nameValidate === true ? "is-valid" : "is-invalid"}
                       toplabel={true}
                       toplabeltext={"Adınız"}
            />
            <InputForm placeholder={"SoyAd Giriniz..."}
                       type={"text"}
                       sublabel={true}
                       sublabelclass={surnameValidate === true ? "valid-feedback" : 'invalid-feedback'}
                       sublabeltext={surnameValidate === true ? '' : "Soyisim  Geçersiz"}
                       {...bindsurname}
                       forminputclass={surnameValidate === true ? "is-valid" : "is-invalid"}
                       toplabel={true}
                       toplabeltext={"Soyad"}
            />
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
            <InputForm placeholder={"ornek@example.com"}
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
                        buttontxt={"Kayıt Ol"} buttonclases={"btn-primary btn-block"}>
                </Button>
                {state.loading === true ? <Loading/> : null}
            </div>

        </React.Fragment>
    )
}
export default RegisterForm

