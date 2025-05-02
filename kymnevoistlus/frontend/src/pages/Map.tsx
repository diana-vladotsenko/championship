import { Popup, Marker } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'

function Map() {
    return (
        <div>
            <h2>See location</h2>
            <MapContainer className="map" center={[59.436, 24.721]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[59.436, 24.729]}>
                    <Popup>
                        Tallinn <br /> Pealinn.
                    </Popup>
                </Marker>
                <Marker position={[59.432, 24.762]}>
                    <Popup>
                        Old Town <br /> Tallinn.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map;