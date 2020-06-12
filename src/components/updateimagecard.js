import React from "react";

const UpdateImageCard = (props) => {
    console.log("resim kart çalıştı")
    return (
        <React.Fragment>
            <div className="card-body tex-center d-flex align-items-center flex-column">
                {props.base64 == null ? null : <p className={"text text-center"}>Önizleme</p>}
                {props.base64 == null ? null :
                    <p className={"text text-center"}>
                        <img src={props.base64.base64} alt="image" className="img-fluid avatar-xl"
                             style={{width: '200px', height: '200px'}}/>
                    </p>}

                <input className={"form-control"} hidden type={"file"} ref={props.inputref}
                       name="myImage"
                       accept="image/*"
                       style={{display: "none"}}
                       onChange={props.onChange}/>

                <a
                    onClick={props.onFileInputClick}
                    aria-pressed="true"
                    className="btn btn-success text-white"
                    role="button"
                >Resim Seç</a>

            </div>
            <div className="float-right pb-3">
                {props.save == true ? <a
                    aria-pressed="true"
                    onClick={props.saveClick}
                    className="btn btn-primary text-white"
                    role="button"
                >Kaydet</a> : null}

            </div>
            <div className="float-left pb-3">
                {props.cancel == true ? <a
                    onClick={props.cancelClick}
                    aria-pressed="true"
                    className="btn btn-danger text-white "
                    role="button"
                >Vazgeç</a> : null}

            </div>
        </React.Fragment>
    )
}
export default React.memo(UpdateImageCard)
