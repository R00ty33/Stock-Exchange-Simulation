import React, { useEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom'
import authProvider from './AuthProvider';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)  
    useEffect(() => {
        if (authProvider.useAuth()) {
            console.log("Logged in: " + authProvider.useAuth())
            setIsAuthenticated(true);
        }
        else {
            console.log("Logged in: " + authProvider.useAuth())
            setIsAuthenticated(false);
        }
    }, [])

    if (isAuthenticated === null) {
        return <></>
    }

    return (
        <Route {...rest} render={props =>
            !isAuthenticated ? (
              <Redirect to='/Login'/>
            ) : (
              <Component {...props} />
            )
        }
        />
    );
}

export default PrivateRoute;