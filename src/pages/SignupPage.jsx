import React from 'react'
import Signup from '../components/Signup'
import NavBar from '../components/Navbar'

function SignupPage() {
    return (
        <div className="w-full h-full">
            <NavBar/>
            <div className="w-full flex justify-center">
                <Signup/>
            </div>

        </div>
    )
}

export default SignupPage