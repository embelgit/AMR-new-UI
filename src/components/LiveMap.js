import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMemo } from "react";

// Fix default icon issue with Webpack/React-Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons
const adminIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const userIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const LiveMap = ({ users }) => {
    // Center map based on average of user locations or default to India
    const center = useMemo(() => {
        if (users.length === 0) return [20.5937, 78.9629]; // India Center
        const latSum = users.reduce((sum, u) => sum + (u.lat || 0), 0);
        const lngSum = users.reduce((sum, u) => sum + (u.lng || 0), 0);
        const count = users.filter(u => u.lat && u.lng).length;
        if (count === 0) return [20.5937, 78.9629];
        return [latSum / count, lngSum / count];
    }, [users]);

    return (
        <div className="h-full w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 z-0">
            <MapContainer center={center} zoom={5} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {users.map((user) => (
                    user.lat && user.lng && (
                        <Marker
                            key={user.id}
                            position={[user.lat, user.lng]}
                            icon={user.role === "ADMIN" || user.role === "SUPER_ADMIN" ? adminIcon : userIcon}
                        >
                            <Popup>
                                <div className="p-2">
                                    <h3 className="font-bold text-slate-800">{user.name}</h3>
                                    <p className="text-xs text-slate-500">{user.role}</p>
                                    <p className={`text-xs font-semibold mt-1 ${user.active ? "text-green-600" : "text-gray-400"}`}>
                                        {user.active ? "Online" : "Offline"}
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    )
                ))}
            </MapContainer>
        </div>
    );
};

export default LiveMap;
