import React, {useContext, useEffect} from "react";
import Card from "../components/card";
import DiaryContext from "../context/diaryContext";
import Loading from "../components/loading";
import Flex from "../components/flex";
import {msgBox} from "../utils/appmsgbox";
import {Link} from "react-router-dom";
import moment from "moment"
import appmsg from "../utils/appmsg"

const Dashboard = (props) => {
    const {fetchdiary, state, dispatch} = useContext(DiaryContext)
    useEffect(() => {
        fetchdiary({}).then((response) => {
        }).catch((error) => {
            msgBox("error", appmsg.errormsg)
        })
    }, [])
    const renderDiaryItem = () => {
        if (state.diary.length > 0) {
            console.log(state)
            /*      return  state.diary.map()*/
            return state.diary.map((diaryItem, index) => {
                console.log(diaryItem)
                return (
                    <Card
                        key={index}
                        sub={
                            <div className="float-right">
                                <p className="text text-center">
                                    <Link to={"/diar-detail/" + diaryItem._id}>
                                        Tamamını Gör ..
                                    </Link>
                                    <i className="fa fa-book text-success pl-3"></i>
                                </p>

                            </div>
                        }
                        cardclass={"widget-flat border-primary border"}
                        cardtext={diaryItem.content.slice(0, 500) + " ..."}
                    >
                        <h3 className="mt-3 mb-3 loginTitle font-weight-normal mt-0"
                            title="Number of Customers">{moment(diaryItem.dairdate).format("LLLL")}</h3>
                    </Card>
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
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <form className="form-inline">
                                <div className="form-group">
                                    <div className="input-group">
                                        <input type="text" className="form-control form-control-light"
                                               id="dash-daterange"/>
                                        <div className="input-group-append">
                                                    <span
                                                        className="input-group-text bg-primary border-primary text-white">
                                                            <i className="mdi mdi-calendar-range font-13"></i>
                                                        </span>
                                        </div>
                                    </div>
                                </div>
                                <a href="javascript: void(0);" className="btn btn-primary ml-2">
                                    <i className="mdi mdi-autorenew"></i>
                                </a>
                                <a href="javascript: void(0);" className="btn btn-primary ml-1">
                                    <i className="mdi mdi-filter-variant"></i>
                                </a>
                            </form>
                        </div>
                        <h4 className="page-title">AnaSayfa</h4>
                    </div>
                </div>
            </div>
            <Flex column={"col-xl-12 col-lg-12"}>
                {state.loading === true ? renderLoading() : <Flex column={"col-lg-6"}> {renderDiaryItem()}</Flex>}

            </Flex>


        </React.Fragment>

    )

}
export default Dashboard
