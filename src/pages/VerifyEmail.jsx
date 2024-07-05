import React from 'react'
import axios from '../api/Axios';
import { message } from 'antd';
import { Link } from 'react-router-dom';

function VerifyEmail() {

    const handleResend = async () => {
        try {
            const email = localStorage.getItem("email");
            const response = await axios.get(`/auth/resend-mail?email=${email}`);
            console.log(response)
            message.success(response.data.message)

        } catch (error) {
            console.log(error)
            message.error(error.response.data.message);
        }
    }


    return (
        <div className='flex flex-col justify-center items-center h-screen w-screen'>
            <h1 className='text-red-600 m-4 text-2xl'>!!<span className='text-black text-xl'>Your mail is not VERIFIED...</span></h1>
            <h3 className='m-4 text-lg'>Check Your Mail Soon for the LINK...</h3>
            <button onClick={handleResend} className='p-3 bg-green-600 text-white rounded-md m-8'>Resend</button>
            <Link to={'/'}><button className='p-3 bg-green-600 text-white rounded-md m-8'>Go Home</button></Link>
        </div>
    )
}

export default VerifyEmail