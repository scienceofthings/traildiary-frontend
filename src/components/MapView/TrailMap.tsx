import React, {useRef, useEffect} from "react";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import L from "leaflet";
import { setVisibility } from "../../redux/slices/trail";
import "../../../node_modules/leaflet/dist/leaflet.css";
import { Trail } from "../../redux/slices/trail";
import { LeafletEvent } from "leaflet";
import { useDispatch } from 'react-redux'

export const pointerIcon = new L.Icon({
    iconUrl: require('../../../node_modules/leaflet/dist/images/marker-icon.png'),
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    shadowUrl: '../../../node_modules/leaflet/dist/images/marker-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [20, 92],
})

type props = {
    trails: Array<Trail>
}

const TrailMap: React.FunctionComponent<props> = ({trails}) => {
    const mapReference = useRef(null);
    const dispatch = useDispatch()


    const initialPositionOfMap = {
        lat: 47.9959,
        lng: 7.85222,
        zoom: 10
    }

    const updateTrailVisibility = (map: Map) => {
        trails.forEach(trail => {
            // @ts-ignore: Unreachable code error
            if (map.getBounds().contains(trail.position)) {
                dispatch(setVisibility(trail.id, true));
            } else {
                dispatch(setVisibility(trail.id, false));
            }
        });
    }

    const handleMoveEnd = (event: LeafletEvent) => {
        updateTrailVisibility(event.target);
    }

    useEffect(() => {
        if(mapReference.current !== null) {
            // @ts-ignore: Unreachable code error
            updateTrailVisibility(mapReference.current.leafletElement);
        }

    })

    return (
        <Map
            ref={mapReference}
            style={{ height: "280px", width: "100%" }}
            zoom={initialPositionOfMap.zoom}
            onMoveEnd={handleMoveEnd}
            center={[initialPositionOfMap.lat, initialPositionOfMap.lng]}>
            <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

            {trails && trails.length ? trails.map((trail) =>
                <Marker position={trail.position} icon={pointerIcon} key={trail.id}>
                    <Popup>
                        {trail.title}
                    </Popup>
                </Marker>
            ) : ""};
        </Map>
    )
}

export default TrailMap;
