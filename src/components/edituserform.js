import React, {useContext, useState} from "react";
import InputForm from "./formInput";
import useInput from "../customHooks/useInput";
import {nameValidator, surnameValidator, emailValidator, passwordValidator} from "../utils/appvalidator";
import Button from "./Button";
import Loading from "./loading";
import {msgBox} from "../utils/appmsgbox";
import UserContext from "../context/userContext";
import GlobalContext from "../context/globalContext";
import {urlParse} from "../utils/appparser";
import appmsg from "../utils/appmsg";

const EditUserForm = (props) => {
    const [loading, setLoading] = useState(false)
    const {user,updateUser} = useContext(GlobalContext)
    const [email, bindemail, resetemail, emailValidate] = useInput(props.email, emailValidator, true)
    const [name, bindname, resetname, nameValidate] = useInput(props.name, nameValidator, true)
    const [surname, bindsurname, resetsurname, surnameValidate] = useInput(props.surname, surnameValidator, true)
    const {userstate, update} = useContext(UserContext)
    const resetForm = () => {
        resetemail()
        resetname()
        resetsurname()
    }

    const onUpdateUser = () => {
        const iseq = sameusercontrol()
        if (iseq) {
            msgBox("info", "Lütfen Alanları Güncelleyiniz")
        } else {
            const where = urlParse.parse("_id=" + user._id)
            update({urlparse: where, name: name, surname: surname, email: email}).then((response) => {
                props.setMode(false)
                let newuser = {image: user.image, fullname: name+" "+surname, email: email, _id: user._id}
                localStorage.setItem("user", JSON.stringify(newuser))
                updateUser(newuser)
                msgBox("success", "Güncelleme İşlemi Başarıyla Tamamlandı")
                resetForm()
            }).catch((error) => {
                msgBox("error", appmsg.errormsg)
            })
        }
    }

    const sameusercontrol = () => {
        return userstate.user.name.trim().toLocaleLowerCase() === name.trim().toLocaleLowerCase() &&
            userstate.user.surname.trim().toLocaleLowerCase() === surname.trim().toLocaleLowerCase() &&
            userstate.user.email.trim().toLocaleLowerCase() === email.trim().toLocaleLowerCase();

    }

    const validateForm = () => {
        if (!nameValidator(name)) {
            msgBox("error", "Lütfen Geçerli Bir Ad Giriniz")
        } else if (!surnameValidator(surname)) {
            msgBox("error", "Lütfen Geçerli Bir SoyAd Giriniz")
        } else if (!emailValidator(email)) {
            msgBox("error", "Lütfen Geçerli Bir Email Giriniz")
        } else {
            onUpdateUser()
        }
    }
    return (
        <React.Fragment>
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
            <div className="form-group mb-0 text-center">
                <Button icon="fa fa-sign-in mr-1"
                        onClick={() => {
                            validateForm()
                        }}
                        disabled={(emailValidate === true && nameValidate === true && surnameValidate == true) ? false : true}
                        type={"button"}
                        buttontxt={"Kayıt Ol"} buttonclases={"btn-primary btn-block"}>
                </Button>
                {loading === true ? <Loading/> : null}
            </div>

        </React.Fragment>
    )
}
export default EditUserForm
