import React from 'react'
import {Route, useRoute, Redirect} from "wouter";
import Login from "../pages/Login/Login";

const MainPublic: React.FunctionComponent = () => {
    const [isOnLoginUri] = useRoute('/login')
    if (!isOnLoginUri) {
        return <Redirect to="/login" />
    }

    return (
            <Route path="/login" component={Login}/>
        )


}

export default MainPublic