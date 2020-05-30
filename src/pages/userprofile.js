import React, {useContext, useEffect} from "react";
import PageSubHeader from "../components/pagesubheader";
import GlobalContext from "../context/globalContext";
import ProfileMedia from "../components/profilemedia";
import ProfileCard from "../components/profile";
import UserContext from "../context/userContext";
import {msgBox} from "../utils/appmsgbox";
import Loading from "../components/loading";

export default function UserProfile() {
    const {user} = useContext(GlobalContext)
    const {userstate, userdispatch, show} = useContext(UserContext)
    useEffect(() => {
        show({id: user._id, fields: "fullname image email diaries"}).then((response) => {
            debugger
        }).catch((error) => {
            debugger
            msgBox("error", "Beklenmedik Bir Hata Gerçekleşti Lütfen Daha Sonra Tekrar Deneyin")
        })
    }, [])

    const renderUserProfile = () => {
        let renderitem;
        if (userstate.loading == true || userstate.user == null) {
            renderitem = <Loading/>
        } else {
            console.log("bakstate", userstate)
            renderitem = <ProfileCard src={userstate.user.image}
                                      onEditClick={() => {
                                          alert("Tıkladı")
                                      }
                                      }
                                      totaldiary={userstate.user.diaries.length} fullname={userstate.user.fullname}
                                      email={userstate.user.email}/>
        }
        return renderitem
    }

    return (
        <React.Fragment>
            <PageSubHeader pagename={"Profilim"}/>
            {renderUserProfile()}
        </React.Fragment>

    )
}
