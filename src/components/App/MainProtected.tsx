import React, {useEffect} from 'react'
import {Route, Switch} from "wouter";
import MapSearch from "../pages/MapSearch/MapSearch";
import {composeRegionsPageUri} from "../../misc/uri";
import Regions from "../pages/Regions/Regions";
import Detail from "../pages/Detail/Detail";
import {useTypedDispatch, useTypedSelector} from "../../redux";
import {selectTrailsData} from "../../redux/slices/trail";
import {fetchTrails} from "../../redux/api/fetchTrails";
import Logout from "../pages/Logout/Logout";

const MainProtected: React.FunctionComponent = () => {

    const dispatch = useTypedDispatch()
    const trails = useTypedSelector(state => selectTrailsData(state))

    useEffect(() => {
        if (trails === undefined) {
            dispatch(fetchTrails())
        }
    }, [dispatch, trails])

    return (
        <Switch>
            <Route path="/">
                <MapSearch />
            </Route>
            <Route path={composeRegionsPageUri()}>
                <Regions trails={trails} />
            </Route>
            <Route path="/trails/:trailId">
                {(params) => (
                    <Detail trailId={parseInt(params.trailId)} />
                )}
            </Route>
            <Route path="/logout" component={Logout}/>
        </Switch>
    )
}

export default MainProtected