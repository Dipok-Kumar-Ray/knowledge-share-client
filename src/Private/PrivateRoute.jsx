import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);

    if(loading) {
        return <span className="loading loading-infinity loading-md"></span>

    }

    if(user && user.email){
        return  children;
    }

    return <Navigate to='/login' replace></Navigate>
};

export default PrivateRoute;