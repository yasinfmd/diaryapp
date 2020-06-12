import React, {useContext, useState} from "react";
import InputForm from "./formInput";
import useInput from "../customHooks/useInput";
import {nameValidator, surnameValidator, emailValidator} from "../utils/appvalidator";
import Button from "./Button";
import Loading from "./loading";
import {msgBox} from "../utils/appmsgbox";
import UserContext from "../context/userContext";
import GlobalContext from "../context/globalContext";
import {urlParse} from "../utils/appparser";
import appmsg from "../utils/appmsg";

const EditUserForm = (props) => {
    const [loading, setLoading] = useState(false)
    const {user, updateUser} = useContext(GlobalContext)
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
            msgBox("info", appmsg.userprofile.pleaseupdafefield)
        } else {
            setLoading(true)
            const where = urlParse.parse("_id=" + user._id)
            update({urlparse: where, name: name, surname: surname, email: email}).then((response) => {
                setLoading(false)
                props.setMode(false)
                let newuser = {image: user.image, fullname: name + " " + surname, email: email, _id: user._id}
                localStorage.setItem("user", JSON.stringify(newuser))
                updateUser(newuser)
                msgBox("success", appmsg.userprofile.updateuser)
                resetForm()
            }).catch((error) => {
                setLoading(false)
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
            msgBox("error", appmsg.userprofile.name)
        } else if (!surnameValidator(surname)) {
            msgBox("error", appmsg.userprofile.surname)
        } else if (!emailValidator(email)) {
            msgBox("error", appmsg.userprofile.email)
        } else {
            onUpdateUser()
        }
    }
    return (
        <React.Fragment>
            <InputForm placeholder={appmsg.userprofile.nameplaceholder}
                       type={"text"}
                       sublabel={true}
                       sublabelclass={nameValidate === true ? "valid-feedback" : 'invalid-feedback'}
                       sublabeltext={nameValidate === true ? '' : appmsg.userprofile.nameerror}
                       {...bindname}
                       forminputclass={nameValidate === true ? "is-valid" : "is-invalid"}
                       toplabel={true}
                       toplabeltext={appmsg.userprofile.namelabel}
            />
            <InputForm placeholder={appmsg.userprofile.surnameplaceholder}
                       type={"text"}
                       sublabel={true}
                       sublabelclass={surnameValidate === true ? "valid-feedback" : 'invalid-feedback'}
                       sublabeltext={surnameValidate === true ? '' : appmsg.userprofile.surnameerror}
                       {...bindsurname}
                       forminputclass={surnameValidate === true ? "is-valid" : "is-invalid"}
                       toplabel={true}
                       toplabeltext={appmsg.userprofile.surnamelabel}
            />
            <InputForm placeholder={appmsg.userprofile.emailplaceholder}
                       type={"email"}
                       sublabel={true}
                       sublabelclass={emailValidate === true ? "valid-feedback" : 'invalid-feedback'}
                       sublabeltext={emailValidate === true ? '' : appmsg.userprofile.emailerror}
                       {...bindemail}
                       forminputclass={emailValidate === true ? "is-valid" : "is-invalid"}
                       toplabel={true}
                       toplabeltext={appmsg.userprofile.emaillabel}
            />
            <div className="form-group mb-0 text-center">
                <Button icon="fa fa-sign-in mr-1"
                        onClick={() => {
                            validateForm()
                        }}
                        disabled={(emailValidate === true && nameValidate === true && surnameValidate == true) ? false : true}
                        type={"button"}
                        buttontxt={appmsg.userprofile.update} buttonclases={"btn-primary btn-block"}>
                </Button>
                {loading === true ? <Loading/> : null}
            </div>

        </React.Fragment>
    )
}
export default React.memo(EditUserForm)
