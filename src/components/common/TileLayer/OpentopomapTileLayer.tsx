import React from 'react'
import {TileLayer} from "react-leaflet";

export const OpenstreetmapTileLayer: React.FunctionComponent = () => {
    return (
        <TileLayer
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        />
    )
}

export default OpenstreetmapTileLayer
