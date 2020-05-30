import React from "react";

const ProfileMedia = (props) => {
    return (
        <div className="media">
                    <span className="float-left m-2 mr-4">
                        <img
                            src={props.src}
                            style={{height: "100px"}} alt=""
                            className="rounded-circle img-thumbnail"/></span>
            <div className="media-body">

                <h4 className="mt-1 mb-1 text-white">{props.fullname}</h4>
                <p className="font-13 text-white-50">Email : {props.email}</p>

                <ul className="mb-0 list-inline text-light">
                    <li className="list-inline-item mr-3">
                        <h5 className="mb-1"> {props.totaldiary == 0 ? "Henüz günlük kaydı bulunamadı" : props.totaldiary}</h5>
                        <p className="mb-0 font-13 text-white-50">{props.totaldiary > 0 ? 'Toplam Tutulan Günlük' : null}</p>
                    </li>
                    <li className="list-inline-item">
                        <h5 className="mb-1">5482</h5>
                        <p className="mb-0 font-13 text-white-50">Bu Yıl Toplam Tutulan Günlük</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default ProfileMedia
