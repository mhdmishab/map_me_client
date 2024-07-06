import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from '../api/Axios';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const Map = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [location, setLocation] = useState(null);
    const [showHistory, setShowHistory] = useState(false);
    const [loading, setLoading] = useState(false); 

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
        if (searchTerm.trim() === '') return;

        setLoading(true); 
        await performSearch(searchTerm);
        setLoading(false); 
        setSearchTerm('');
    };

    const handleHistoryClick = async (term) => {
        await performSearch(term);
    };

    const performSearch = async (term) => {
        setShowHistory(false);
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) return;

            setLoading(true); 
            const response = await axios.get(`/user/search?query=${term}&userId=${userId}`);
            setLoading(false); 

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
            setLoading(true);
            await axios.delete(`/user/search-history/${item.placeName}?userId=${userId}`);
            setLoading(false);
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
            setLocation(null);
        }, [center, map]);
        return null;
    };

    return (
        <div className="p-5 font-sans relative h-screen">
            <form onSubmit={handleSearch} className="flex items-center mb-5 relative z-20 px-8">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowHistory(true)}
                    onBlur={() => setTimeout(() => setShowHistory(false), 200)}
                    placeholder="Search location"
                    className="flex-1 p-2 mr-2 border border-gray-300 rounded"
                />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded transition duration-300 hover:bg-blue-800">
                    {loading ? '.....' : 'Search'}
                </button>
                <button type="button" className="m-2 bg-red-600 rounded-md p-2 text-white" onClick={handleLogout}>
                    Logout
                </button>
            </form>

            {showHistory && searchHistory.length > 0 && (
                <div className="absolute mx-16 top-20 left-0 right-0 bg-white bg-opacity-60 z-10 max-h-60 overflow-y-auto p-4 rounded">
                    <h3 className="mb-2">Search History:</h3>
                    <ul className="list-none p-0">
                        {searchHistory.map((item) => (
                            <li key={item._id} className="flex justify-between items-center py-2 border-b border-gray-300" onClick={() => handleHistoryClick(item.placeName)}>
                                {item.placeName}
                                <button className="px-3 py-1 bg-red-600 text-white rounded transition duration-300 hover:bg-red-800" onClick={(e) => { e.stopPropagation(); handleDeleteHistory(item); }}>
                                    x
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
                <MapContainer center={[51.505, -0.09]} zoom={11} style={{ height: '100%', width: '100%' }}>
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
        </div>
    );
};

export default Map;
