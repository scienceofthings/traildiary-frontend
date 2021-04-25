import React from 'react'
import {TileLayer} from "react-leaflet";

export const OpenstreetmapTileLayer: React.FunctionComponent = () => {
    return (
        <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    )
}

export default OpenstreetmapTileLayer
