import React from 'react'
import { Routes,Route } from 'react-router-dom';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import ProtectedRouteLogin from '../middleware/AuthorizationLogin';
import VerifyEmail from '../pages/VerifyEmail';
import MapPage from '../pages/MapPage';
import ProtectedRoute from '../middleware/Authorization';

export default function Router() {
  return (
    <Routes>
        <Route path='/' element={<ProtectedRouteLogin><Home/></ProtectedRouteLogin>}></Route>
        <Route path='/login' element={<ProtectedRouteLogin><LoginPage/></ProtectedRouteLogin>}></Route>
        <Route path='/signup' element={<ProtectedRouteLogin><SignupPage/></ProtectedRouteLogin>}></Route>
        <Route path='/verifyemail' element={<ProtectedRouteLogin><VerifyEmail/></ProtectedRouteLogin>}></Route>
        
        <Route path='/map' element={<ProtectedRoute><MapPage/></ProtectedRoute>}></Route>


    </Routes>
  )
}
