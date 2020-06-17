import React, {useEffect, useMemo, useState} from "react";
import PageSubHeader from "../components/pagesubheader";
import openSocket from "socket.io-client"
import Card from "../components/card";
import Flex from "../components/flex";
import moment from "moment";
import header from "../utils/axiosheader";
import Loading from "../components/loading";
import axios from "axios";
import {timeDifference} from "../utils/apptimedifference";

export default function Admindashboard() {

    const [alldiar, setalldiar] = useState([])
    const [loading, setloading] = useState(false)

    useEffect(() => {
        console.log("slm")
        try {
            setloading(true)
            axios.post("http://127.0.0.1:3000/api/dair/", {
                populate: {
                    path: 'userId',
                    select: "email fullname image"
                }
            }, header()).then((response) => {
                debugger
                setalldiar(response.data)
                setloading(false)
                const socket = openSocket("http://localhost:3000/");
                socket.on("diars", data => {
                    if (data.action === "CREATE") {
                        setalldiar((oldval) => {
                            return [...oldval, data.payload]
                        })
                    }
                })
            }).catch((error) => {
                setloading(false)
            })
        } catch (error) {
            setloading(false)
        }
    }, [])

    const renderAllDiarItem = useMemo(() => {


        return alldiar.map((item, index) => {
            let sharetime = timeDifference(new Date(), moment(item.dairdate))
            return (
                <div className="inbox-item" key={index}>
                    <div className="inbox-item-img"><img
                        src={item.userId.image}
                        className="rounded-circle" alt=""/></div>
                    <p className="inbox-item-author">{item.userId.fullname}</p>
                    <p className="inbox-item-text">{item.title}</p>
                    <p className="inbox-item-date">
                        {sharetime}

                    </p>
                    <p className="float-right">
                        <button type="button" className="btn btn-sm btn-outline-primary px-1 py-0">
                            <i
                                className='fa fa-arrow-right font-16'>
                            </i>
                        </button>
                    </p>
                </div>

            )
        })

    }, [alldiar.length])


    return (
        <React.Fragment>
            <PageSubHeader pagename={"Tüm Günlükler"}>
            </PageSubHeader>
            <Card>

                <Flex column={"col-12"}>
                    {loading === true ? <Loading/> : null}
                    <div data-simplebar style={{maxHeight: "400px"}}>

                        <h4 className="header-title mb-3">Üyelerin Günlükleri</h4>

                        <div className="inbox-widget">
                            {(alldiar.length < 1) ?
                                <p className={"text text-center"}>Henüz Bir Günlük Yok</p> : renderAllDiarItem}

                        </div>


                    </div>
                </Flex>
                <p className="text text-center">Toplam Paylaşım : {alldiar.length}</p>
            </Card>
        </React.Fragment>
    )
}
