import React, { useState, useEffect } from 'react';
import tokenProvider from './TokenProvider';
import { useHistory } from 'react-router-dom';

const AuthProvider = {

    login: function(newTokens) {
        tokenProvider.setTokens(newTokens);
    },

    logout: function() {
        console.log("Logged Out");
        tokenProvider.setTokens(null);
        console.log("Logged in: " + tokenProvider.isLoggedIn())
        console.log("Token expired: " + tokenProvider.isExpired(tokenProvider.getExpirationDate(localStorage.getItem("ACCESS_TOKEN"))));
    },

    useAuth: function() {
        const [isLogged, setIsLogged] = useState(tokenProvider.isLoggedIn());

        /*
        useEffect(() => {
            const listener = (newIsLogged) => {
                setIsLogged(newIsLogged);
            };
    
            tokenProvider.subscribe(listener);
            return () => {
                tokenProvider.unsubscribe(listener);
            };
        }, []);
        */
        return isLogged;

    }

}

export default AuthProvider