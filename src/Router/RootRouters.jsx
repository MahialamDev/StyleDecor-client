import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Auth/Login/Login';
import AuthLayout from '../Layouts/AuthLayout';
import SignUp from '../Pages/Auth/SignUp/SignUp';



const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'sign-up',
                Component: SignUp
            }
        ]
    }
]);


export default router;