import React from "react";
import PageSubHeader from "../components/pagesubheader";
import Card from "../components/card";
import Flex from "../components/flex";
import ChangePasswordForm from "../components/changepasswordform";

export default function ChangePassword() {
    return (
        <React.Fragment>
            <PageSubHeader pagename={"Parola Değiştir"}/>
            <Card>
                <Flex column={"col-xl-12 col-lg-12"}>
                    <ChangePasswordForm/>
                </Flex>
            </Card>
        </React.Fragment>
    )
}
