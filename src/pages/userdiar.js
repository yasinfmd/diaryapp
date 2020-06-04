import React, {useContext, useEffect, useState} from "react";
import PageSubHeader from "../components/pagesubheader";
import Card from "../components/card";
import Accordion from "../components/accordion";
import AccordionItem from "../components/accordionItem";
import GlobalContext from "../context/globalContext";
import DiaryContext from "../context/diaryContext";
import Loading from "../components/loading";
import {msgBox} from "../utils/appmsgbox";
import {datewithnumber} from "../utils/datewithnumber";
import appmsg from "../utils/appmsg";
import {urlParse} from "../utils/appparser";
import {Link} from "react-router-dom";
import moment from "moment";
import Button from "../components/Button";

export default function UserDiar() {
    const {user} = useContext(GlobalContext)
    const [cl, setCl] = useState("collapse")

    const {fetchUserGroupedDiary, fetchdiary, state,deleteDiar, dispatch} = useContext(DiaryContext)
    useEffect(() => {
        fetchUserGroupedDiary({userId: user._id}).then((response) => {
            console.log("result", response)
        }).catch((error) => {
            msgBox("error", appmsg.errormsg)
        })
    }, [])


    const fetchUserDiar = (year, mont) => {

        const date = new Date(year, mont - 1)
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0, 24, 0, 0, 0);
        const where = urlParse.parse("dairdate>" + firstDay + "&dairdate<" + lastDay)
        fetchdiary({
            urlparse: where,
            userid: user._id,
            fields: "fullname",
            dairfields: "title content dairdate dairdateString -videos -images "
        }).then((response) => {
            console.log("cevappp", response)
        }).catch((error) => {
            msgBox("error", appmsg.errormsg)
        })
    }
    const deleteDiarItem=(diaryItem,index,groupedindex)=>{
        debugger
        const where = urlParse.parse("_id=" + diaryItem._id)
        deleteDiar({urlparse: where, index, id: diaryItem._id,groupedindex}).then((response) => {
            debugger
            msgBox("success", "Günlük Başarıyla Silindi")
        }).catch((error) => {
            debugger
            msgBox("error", appmsg.errormsg)
        })
    }
    const renderDiaryItem = (month,year,groupedindex) => {
        if (state.loading == false && state.diary.length > 0) {
            debugger
            return state.diary.map((diaryItem, index) => {
                return (
                    <div className="col-12" key={index}>
                        <Card
                            key={index}

                            cardclass={"widget-flat border-primary border"}
                            cardtext={diaryItem.content.slice(0, 500) + " ..."}
                        >
                            <h3 className="mt-3 mb-3 loginTitle font-weight-normal mt-0"
                                title="Number of Customers">{moment(diaryItem.dairdate).format("LLLL")}</h3>

                            <div className="float-right">
                                <Link to={"/diar-detail/" + diaryItem._id}
                                      className={"btn btn-sm btn-outline-info btn-rounded"} role={"button"}>
                                    <i className={"pr-1 fa fa-home"}></i>
                                    {'Detay'}
                                </Link>
                                <Button type={"button"} buttontxt={"Sil"}
                                        onClick={() => {
                                          deleteDiarItem(diaryItem, index,groupedindex)
                                        }}
                                        buttonclases={" btn-sm btn-outline-danger ml-3 btn-rounded"}
                                        icon={"pr-2 fa fa-save"}/>

                            </div>
                        </Card>
                    </div>
                )
            })
        } else {
            return (
                <h2>Günlük Bulunamadı...</h2>
            )
        }

    }
    const setaccordionClass = (diaryItem) => {
        state.groupeduserdiary.forEach((item) => {
            if (item._id.month == diaryItem._id.month && item._id.year == diaryItem._id.year) {
                if (diaryItem.accordionClass == "collapse") {
                    diaryItem.accordionClass = "collapse show"
                } else {
                    diaryItem.accordionClass = "collapse"
                }
            } else {
                item.accordionClass = "collapse"
            }
        })

    }
    const renderAccordionItem = () => {
        debugger
        if (state.loading === false && state.groupeduserdiary.length > 0) {
            return state.groupeduserdiary.map((diaryItem, index) => {
                return (
                    <AccordionItem key={index} title={datewithnumber(diaryItem._id.month) + " " + diaryItem._id.year}
                                   cl={diaryItem.accordionClass}
                                   onClick={() => {
                                       setaccordionClass(diaryItem)
                                       if (diaryItem.accordionClass == "collapse show")
                                           fetchUserDiar(diaryItem._id.year, diaryItem._id.month)

                                   }} id={"accordionitem" + index} headid={"accordionitemheader" + index}
                                   content={<div className="row">{renderDiaryItem(diaryItem._id.month,diaryItem._id.year,index)}</div>}/>
                )
            })
        }
    }

    return (
        <React.Fragment>
            <PageSubHeader pagename={"Günlüklerim"}/>

            <Card>
                {state.loading === true ? (<p className={"text text-center"}><Loading/></p>)
                    : null}
                <Accordion>
                    {state.loading === false ? renderAccordionItem() : null}
                </Accordion>
            </Card>
        </React.Fragment>
    )
}
