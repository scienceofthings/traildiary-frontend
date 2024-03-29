import React, {useEffect, useState} from 'react'
import {Redirect, Route, Switch} from "wouter";
import MapSearch from "../pages/MapSearch/MapSearch";
import {composeRegionsPageUri} from "../../misc/uri";
import Regions from "../pages/Regions/Regions";
import Detail from "../pages/Detail/Detail";
import {useTypedDispatch, useTypedSelector} from "../../redux";
import {selectTrailsData} from "../../redux/slices/trail";
import {fetchTrails} from "../../redux/api/fetchTrails";
import {LatLngLiteral} from "leaflet";

export type LatLngAndZoomLevel = LatLngLiteral & { zoomLevel: number}

const MainProtected: React.FunctionComponent = () => {

    const dispatch = useTypedDispatch()
    const trails = useTypedSelector(state => selectTrailsData(state))

    const [mapState, setMapState] = useState<LatLngAndZoomLevel>({
        lat: 47.9959,
        lng: 7.85222,
        zoomLevel: 13
    })

    useEffect(() => {
        if (trails === undefined) {
            dispatch(fetchTrails())
        }
    }, [dispatch, trails])

    return (
        <Switch>
            <Route path="/">
                <MapSearch mapState={mapState} setMapState={setMapState} />
            </Route>
            <Route path={composeRegionsPageUri()}>
                <Regions trails={trails} />
            </Route>
            <Route path="/trails/:trailId">
                {(params) => (
                    params.trailId === undefined ?
                        <h1>Trail nicht gefunden</h1> :
                        <Detail trailId={parseInt(params.trailId)} />

                )}
            </Route>
            <Route path="/login">
                <Redirect to={"/"} />
            </Route>
        </Switch>
    )
}

export default MainProtected