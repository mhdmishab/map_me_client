import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import axios from '../api/Axios';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const Map = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [location, setLocation] = useState(null);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    useEffect(() => {
        const fetchHistory = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) return;
            try {
                const response = await axios.get(`/user/search-history?userId=${userId}`);
                const data = response.data;
                setSearchHistory(data.history);
            } catch (error) {
                console.error('Error fetching search history:', error);
                message.error('Failed to fetch search history');
            }
        };
        fetchHistory();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        await performSearch(searchTerm);
        setSearchTerm('');
    };

    const handleHistoryClick = async (term) => {
        await performSearch(term);
    };

    const performSearch = async (term) => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) return;
            const response = await axios.get(`/user/search?query=${term}&userId=${userId}`);
            const data = response.data;

            if (data.location) {
                const { lat, lon, placeName } = data.location;
                setLocation({ latitude: lat, longitude: lon, placeName });
                if (!searchHistory.some(historyItem => historyItem.placeName === placeName)) {
                    setSearchHistory([{ _id: new Date().getTime(), placeName, lat, lon }, ...searchHistory]);
                }
            } else {
                console.error('Location not found');
                message.error('Location not found');
            }
        } catch (error) {
            console.error('Error searching location:', error);
            message.error('Failed to search location');
        }
    };

    const handleDeleteHistory = async (item) => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;
        try {
            await axios.delete(`/user/search-history/${item.placeName}?userId=${userId}`);
            setSearchHistory(prevHistory => prevHistory.filter(term => term._id !== item._id));
        } catch (error) {
            console.error('Error deleting search history item:', error);
            message.error('Failed to delete search history item');
        }
    };

    const UpdateMapView = ({ center }) => {
        const map = useMap();
        useEffect(() => {
            map.setView(center);
            setLocation(null)
        }, [center, map]);
        return null;
    };

    return (
        <div className="map-container">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search location"
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
                <button type="button" className="m-2 bg-red-600 rounded-md p-2" onClick={handleLogout}>Logout</button>
            </form>

            {searchHistory.length > 0 && (
                <div className="search-history">
                    <h3>Search History:</h3>
                    <ul>
                        {searchHistory.map((item) => (
                            <li key={item._id} onClick={() => handleHistoryClick(item.placeName)}>
                                {item.placeName}
                                <button className="delete-button" onClick={(e) => { e.stopPropagation(); handleDeleteHistory(item); }}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <MapContainer center={[51.505, -0.09]} zoom={11} style={{ height: '600px', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {searchHistory.length > 0 && searchHistory.map((item) => (
                    <Marker key={item._id} position={[item.lat, item.lon]}>
                        <Popup>
                            {item.placeName}<br />
                            Latitude: {item.lat}<br />
                            Longitude: {item.lon}
                        </Popup>
                    </Marker>
                ))}
                {location && (
                    <>
                        <UpdateMapView center={[location.latitude, location.longitude]} />
                        <Marker position={[location.latitude, location.longitude]}>
                            <Popup>
                                {location.placeName}<br />
                                Latitude: {location.latitude}<br />
                                Longitude: {location.longitude}
                            </Popup>
                        </Marker>
                    </>
                )}
            </MapContainer>
        </div>
    );
};

export default Map;
