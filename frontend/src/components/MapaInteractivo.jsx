import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Arreglo para el icono por defecto de Leaflet que suele romperse en React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Componente para actualizar el centro del mapa dinámicamente
function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function MapaInteractivo({ origen, destino }) {
  // Centro por defecto: Guayaquil
  const defaultCenter = [-2.1894, -79.8891];
  const mapCenter = origen || defaultCenter;

  return (
    <div style={{ height: '100%', width: '100%', zIndex: 0 }}>
      <MapContainer center={mapCenter} zoom={14} style={{ height: '100%', width: '100%' }} zoomControl={false}>
        {/* Usamos un tema oscuro para los mapas que combine con el diseño premium */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <MapUpdater center={mapCenter} />

        {origen && (
          <Marker position={origen}>
            <Popup>Tu ubicación (Origen)</Popup>
          </Marker>
        )}

        {destino && (
          <Marker position={destino}>
            <Popup>Destino</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
