//import 'leaflet/dist/leaflet.css';
import React from 'react';
import {
    MapContainer,
    TileLayer,
    useMap,
    Polyline, Popup, Marker
  } from "react-leaflet";
// ...

export default function GpxReader() {
    return(
        <div>
        <MapContainer style={{height: "300px", width: "300px"}}
  center={[40.7317535212683, -73.99685430908403]}
  zoom={9}
  scrollWheelZoom={false}
>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
</MapContainer>
        </div>
    );
};