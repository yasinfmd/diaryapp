import {Route} from "react-router-dom";
import React, {useContext} from "react";

import ProtectedRoute from "./protectedroute";

const AppRoute = ({component: Component, layout: Layout, ...rest}) => {


    return (
        <Route {...rest} exact render={props => {
            return (

                <Layout>{rest.routeProtection === false ? <Component header={rest.header}
                                                                     footertext={rest.footertext}
                                                                     footerurl={rest.footerurl}
                                                                     footer={rest.footer}  {...props}></Component> :
                    <ProtectedRoute component={Component}/>} </Layout>
            )
        }}>
        </Route>
    )
}
export default AppRoute;
