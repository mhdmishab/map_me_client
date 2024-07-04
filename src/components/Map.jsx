import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from "axios"

const Map = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [location, setLocation] = useState(null);

    const NOMINATIM_URL = 'https://nominatim.openstreetmap.org';

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = `${NOMINATIM_URL}/search/${searchTerm}?format=json&limit=1`;
            console.log(response)
            const data = await response.json();
            if (data.length > 0) {
                const { lat, lon, display_name } = data[0];
                setLocation({ latitude: lat, longitude: lon, placeName: display_name });
                setSearchHistory([...searchHistory, display_name]);
            } else {
                console.error('Location not found');
            }
        } catch (error) {
            console.error('Error searching location:', error);
        }
    };

    const handleDeleteHistory = (item) => {
        setSearchHistory(searchHistory.filter(term => term !== item));
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search location"
                />
                <button type="submit">Search</button>
            </form>

            <div>
                {searchHistory.length > 0 && (
                    <div>
                        <h3>Search History:</h3>
                        <ul>
                            {searchHistory.map((item, index) => (
                                <li key={index}>
                                    {item}
                                    <button onClick={() => handleDeleteHistory(item)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {location && (
                    <Marker position={[location.latitude, location.longitude]}>
                        <Popup>
                            {location.placeName}<br />
                            Latitude: {location.latitude}<br />
                            Longitude: {location.longitude}
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default Map;
