import React from 'react';
import useAuth from '../Hooks/useAuth';
import ScreenLoading from '../Components/Animation/ScreenLoading/ScreenLoading';
import { Navigate, useLocation } from 'react-router';


const PrivateRouter = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    console.log(location)
    if (loading) {
        return <ScreenLoading />
    }

    if (!user) {
        return <Navigate to='/login' state={{from: location}} replace />
    }

    return children;
};

export default PrivateRouter;