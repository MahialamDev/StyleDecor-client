import React from 'react';
import { NavLink } from 'react-router';

const MyLink = ({children, to, className}) => {
    return (
        <NavLink to={to} className={({isActive})=> `font-semibold ${className} ${isActive ? 'text-secondary' : ''} `}>{children}</NavLink>
    );
};

export default MyLink;