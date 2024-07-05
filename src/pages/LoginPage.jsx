import React from 'react';
import Login from "../components/Login";
import NavBar from '../components/Navbar';


function LoginPage() {

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
