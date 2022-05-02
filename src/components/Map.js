import React from "react";
import "./Map.css";
import { TileLayer } from "react-leaflet";
import {showDataOnMap} from "../util";
import { Map as LeafletMap, TileYear } from "react-leaflet";
function Map({countries,casesType, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
