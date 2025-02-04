import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../api/Axios';
import { message } from 'antd';

function Login() {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);

    const user = {
        email: "",
        password: ""
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .trim()
            .email('This is not a valid email.')
            .required('This field is required!'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters long.')
            .max(20, 'Password must not exceed 20 characters.')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
            .matches(/\d/, 'Password must contain at least one number.')
            .matches(/[@$!%*?&#]/, 'Password must contain at least one special character.')
            .required('This field is required!')
    });

    const handleSubmit = async (values) => {
        console.log(values.email);
        console.log(values.password)
        const email = values.email;
        const password = values.password
        try {
            setLoading(true);
            const response = await axios.post("/auth/login", { email, password });
            setLoading(false);
            console.log(response);

            const { token, message, userId } = response.data;
            if (token) {
                localStorage.clear();
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                navigate('/map');
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            setLoading(false)
            if (error.response && error.response.status === 403) {
                const email = error.response.data.email || error.response.config.data.email;
                console.log(email)
                localStorage.clear();
                if (email) {
                    localStorage.setItem('email', email);
                }

                navigate('/verifyemail')
            }
            message.error(error.response.data.message || "An error occurred during login.");
        }
    };

    return (
        <div className='w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto'>
            <Formik
                initialValues={user}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className='md:p-20 md:px-20  p-14 px-14 rounded-lg'>
                    <h2 className='text-4xl dark:text-gray-800 font-bold text-center m-4'>Login</h2>
                    <div className='flex flex-col py-2'>
                        <label className='text-gray-800'>Email</label>
                        <Field
                            className="pl-8 m-2 border-b-2 opacity-70 font-display focus:outline-none focus:border-black text-base"
                            type='text'
                            name='email'
                        />
                        <ErrorMessage
                            name='email'
                            component='div'
                            className='text-red-500'
                        />
                    </div>
                    <div className='flex flex-col py-2'>
                        <label className='text-gray-800'>Password</label>
                        <Field
                            className="pl-8 m-2 border-b-2 opacity-70 font-display focus:outline-none focus:border-black text-base"
                            type='password'
                            name='password'
                        />
                        <ErrorMessage
                            name='password'
                            component='div'
                            className='text-red-500'
                        />
                    </div>
                    <button className='w-full my-5 py-5 bg-blue-500 px-6 hover:bg-blue-600 text-white font-semibold rounded-lg' type='submit'>
                        {loading?".....":"Login"}
                    </button>
                    <Link to={'/signup'} className='flex justify-end'>Need a account?</Link>
                </Form>
            </Formik>
        </div>
    )
}

export default Login;
