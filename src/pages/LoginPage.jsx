import React from 'react';
import Login from "../components/Login";
import NavBar from '../components/Navbar';


function LoginPage() {
    // const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    return (
        <div className="w-full h-full">
           <NavBar/>
            <div className="w-full">
                <Login />
            </div>
            
        </div>
    );
}

export default LoginPage;
