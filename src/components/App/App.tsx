import React, { useEffect } from "react";
import { hot } from 'react-hot-loader/root'
import TrailMap from "../MapView/TrailMap";
import VisibleMarkers from "../MapView/VisibleMarkers";
import { loadTrails } from "../../redux/slices/trail";
import { useTypedSelector, useTypedDispatch } from "../../redux";
import './styles.module.scss';

const App : React.FunctionComponent = () => {
    const dispatch = useTypedDispatch();
    const loading = useTypedSelector((state) => state.trails.loading);
    const error = useTypedSelector((state) => state.trails.error);
    const trailVisibility = useTypedSelector((state) => state.trails.trailVisibility);
    const trails = useTypedSelector((state) => state.trails.trails);

    useEffect(() => {
        dispatch(loadTrails());
    }, [dispatch])

    return (
        <>
            {trails && trails.length ? (
                <>
                  <TrailMap trails={trails} />
                  <VisibleMarkers trails={trails} trailVisibility={trailVisibility}/>
                </>
                ) : loading ? (
                <b>Loading Trails</b>
            ) : (
                <b>Error loading Trails: {error}</b>
            )
            }

        </>

    )
}

export default hot(App);