import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, useLocation,  } from 'react-router';

const PrivateRoute = ({children}) => {
    
    const {user, loading} = useContext(AuthContext);

    const location = useLocation();
    console.log(location);

    if(loading) {
        return <span className="loading loading-infinity loading-md"></span>

    }

    if(user && user.email){
        return  children;
    }

    return <Navigate state={location.pathname} to='/login' replace></Navigate>
};

export default PrivateRoute;