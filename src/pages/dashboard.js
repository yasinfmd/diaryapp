import React, {useContext, useEffect} from "react";
import Card from "../components/card";
import DiaryContext from "../context/diaryContext";
import Loading from "../components/loading";
import Flex from "../components/flex";
import {msgBox} from "../utils/appmsgbox";
import {Link} from "react-router-dom";
import moment from "moment"
import appmsg from "../utils/appmsg"
import GlobalContext from "../context/globalContext";
import {urlParse} from "../utils/appparser";
import PageSubHeader from "../components/pagesubheader";
import PageTitleBox from "../components/pagetitlebox";

const Dashboard = (props) => {
    //userid ekle
    const {isAuth, user} = useContext(GlobalContext)
    const {fetchdiary, state, dispatch} = useContext(DiaryContext)
    useEffect(() => {
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const where = urlParse.parse("dairdate>" + firstDay + "&dairdate<" + lastDay)


        fetchdiary({
            urlparse: where,
            userid: user._id,
            fields: "fullname",
            dairfields: "title content dairdate dairdateString -videos -images "
        }).then((response) => {
        }).catch((error) => {
            msgBox("error", appmsg.errormsg)
        })
    }, [])
    const renderDiaryItem = () => {
        if (state.diary.length > 0) {
            return state.diary.map((diaryItem, index) => {
                return (
                    <div className="col-6">
                        <Card
                            key={index}
                            sub={
                                <div className="float-right">
                                    <p className="text text-center">
                                        <Link to={"/diar-detail/" + diaryItem._id}>
                                            {diaryItem.content.length > 300 ? "   Tamamını oku .." : 'Detay'}

                                        </Link>
                                        <i className="fa fa-book text-success pl-3"></i>
                                    </p>

                                </div>
                            }
                            cardclass={"widget-flat border-primary border"}
                            cardtext={diaryItem.content.slice(0, 300) + " ..."}
                        >
                            <h3 className="mt-3 mb-3 loginTitle font-weight-normal mt-0"
                                title="Number of Customers">{moment(diaryItem.dairdate).format("LLLL")}</h3>
                        </Card>
                    </div>
                )
            })
        } else {
            return (
                <p className={"text text-center"}>Günlük Bulunamadı <Link
                    to={"/create-diar"}>Buraya </Link> Tıklayarak Hemen Yazmaya Başla.. </p>
            )
        }

    }

    const renderLoading = () => {
        return (
            <Flex column={"col-12"}>
                <p className={"text text-center"}><Loading/></p>
            </Flex>
        )
    }

    return (
        <React.Fragment>
            <PageSubHeader pagename={"Ana Sayfa"}>
                <PageTitleBox/>
            </PageSubHeader>
            <Flex column={"col-xl-12 col-lg-12"}>
                {state.loading === true ? renderLoading() : <div className="row"> {renderDiaryItem()}</div>}

            </Flex>


        </React.Fragment>

    )

}
export default Dashboard
