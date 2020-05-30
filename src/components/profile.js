import React, {useEffect} from "react";
import Flex from "./flex";
import ProfileMedia from "./profilemedia";
import Button from "./Button";

const ProfileCard = (props) => {

    return (
        <Flex column={"col-sm-12"}>
            <div className="card bg-primary">
                <div className="card-body profile-user-box">
                    <div className="row">
                        <div className="col-sm-8">
                            <ProfileMedia totaldiary={props.totaldiary} src={props.src}
                                          fullname={props.fullname.toUpperCase()} email={props.email}/>
                        </div>
                        <div className="col-sm-4">
                            <div className="text-center mt-sm-0 mt-3 text-sm-right">
                                <Button icon="fa fa-edit"
                                        type={"button"}
                                        onClick={props.onEditClick}
                                        buttontxt={"Profili Düzenle"} buttonclases={"btn-light btn-rounded"}/>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Flex>
    )
}
export default ProfileCard
