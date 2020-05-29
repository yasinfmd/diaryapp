import React, {useContext, useEffect} from "react";
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

export default function UserDiar() {
    const {user} = useContext(GlobalContext)
    const {fetchUserGroupedDiary, fetchdiary, state, dispatch} = useContext(DiaryContext)
    useEffect(() => {
        fetchUserGroupedDiary({userId: user._id}).then((response) => {
            console.log("cevap", response)
        }).catch((error) => {
            msgBox("error", "Beklenmedik Bir Hata Gerçekleşti Lütfen Daha Sonra Tekrar Deneyin")
        })
    }, [])


    const fetchUserDiar = (year, mont) => {
        alert("mrb")
        const date = new Date(year, mont - 1)
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const where = urlParse.parse("dairdate>" + firstDay + "&dairdate<" + lastDay)
        fetchdiary({
            urlparse: where,
            userid: user._id,
            fields: "fullname",
            dairfields: "title content dairdate dairdateString -videos -images "
        }).then((response) => {
            debugger
            console.log("cevappp", response)
        }).catch((error) => {
            debugger
            msgBox("error", appmsg.errormsg)
        })
    }

    const renderAccordionItem = () => {
        debugger
        if (state.loading === false && state.groupeduserdiary.length > 0) {
            return state.groupeduserdiary.map((diaryItem, index) => {

                return (
                    <AccordionItem  key={index} title={datewithnumber(diaryItem._id.month) + " " + diaryItem._id.year}
                                   onClick={() => {
                                       fetchUserDiar(diaryItem._id.year, diaryItem._id.month)
                                   }} git id={"accordionitem" + index} headid={"accordionitemheader" + index}
                                   content={<h1>SELAMMM</h1>}/>
                )
                console.log(diaryItem)
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
