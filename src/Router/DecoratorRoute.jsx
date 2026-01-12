import React, { Children } from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import ScreenLoading from '../Components/Animation/ScreenLoading/ScreenLoading';
import { Navigate } from 'react-router';

const DecoratorRoute = ({children}) => {
    const { user, loading } = useAuth();
    const { role, isLoading: roleLoading } = useRole();
    console.log('my role', role)
    if (loading || roleLoading) {
        return <ScreenLoading />
    }

    if (!user || role !== 'decorator') {
        return <Navigate to='/' />
    }

    return children;


};

export default DecoratorRoute;