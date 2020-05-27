import React from "react";
import PageSubHeader from "../components/pagesubheader";
import Card from "../components/card";
import Accordion from "../components/accordion";
import AccordionItem from "../components/accordionItem";

export default function UserDiar() {
    return (
        <React.Fragment>
            <PageSubHeader pagename={"Günlüklerim"}/>

            <Card>

                <Accordion>
                    <AccordionItem title={"Ocak 2020"}  onClick={(e)=>{alert(e)}} id={"ocak"} headid={"ocakheader"} content={"SELAM"}/>
                    <AccordionItem title={"Ocak 2021"} onClick={(e)=>{alert(e)}}git   id={"test"} headid={"testheader"} content={"SELAM1111"}/>

                </Accordion>
            </Card>
        </React.Fragment>
    )
}
