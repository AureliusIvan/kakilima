"use client";

import {MapContainer} from 'react-leaflet/MapContainer'
import {TileLayer} from 'react-leaflet/TileLayer'
import {useMap} from 'react-leaflet/hooks'
import {HiLocationMarker} from "react-icons/hi";
import {Marker, Popup} from "react-leaflet";

function Map(props: any) {
  const {position, zoom} = props

  return (
      <MapContainer
          className={`w-full h-96 border border-black overflow-hidden`}
          // @ts-ignore
          center={[51.505, -0.09]}
          zoom={zoom}
          scrollWheelZoom={false}
      >

        <TileLayer
            // @ts-ignore
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br/> Easily customizable.
          </Popup>
        </Marker>

      </MapContainer>
  )
}

export default Map