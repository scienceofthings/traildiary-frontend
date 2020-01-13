import React, { useEffect } from "react";
import LeafletMap from "../MapView/LeafletMap";
import MarkerList from "../MapView/MarkerList";
import { loadTrails } from "../../redux/slices/trail";
import { useTypedSelector, useTypedDispatch } from "../../redux";
import './styles.module.scss';

const App : React.FunctionComponent = () => {
    const dispatch = useTypedDispatch();
    const loading = useTypedSelector((state) => state.loading);
    const error = useTypedSelector((state) => state.error);
    const trailVisibility = useTypedSelector((state) => state.trailVisibility);
    const trails = useTypedSelector((state) => state.trails);

    useEffect(() => {
        dispatch(loadTrails());
    }, [dispatch])

    let mapContent;
    if (loading) {mapContent = <b>Loading Trails</b>}
    if (error) {mapContent =  <b>Error loading Trails: {error}</b>}
    if (trails) {mapContent =  <LeafletMap trails={trails} />}

    return (
        <div>
            {mapContent}
            <MarkerList trails={trails} trailVisibility={trailVisibility}/>
        </div>

    )
}

export default (App);