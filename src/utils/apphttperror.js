import React from "react";
import {msgBox} from "./appmsgbox";
import appmsg from "./appmsg";

const handleError = (error) => {
    switch (error.response.status) {
        case 500:
            msgBox("error", appmsg.errormsg)

            return
        case 401:
            localStorage.clear()
            msgBox("info", "Oturumunuzun Süresi Dolduğu İçin Giriş Sayfasına Yönlendiriliyorsunuz")
            window.location.href = "http://localhost:3001/login"
            return
    }
}
export default handleError
