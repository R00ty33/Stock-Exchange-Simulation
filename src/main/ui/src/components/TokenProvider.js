import React from 'react';

const TokenProvider = {


    setToken: function(access_token, refresh_token) {
        localStorage.setItem("Access Token", access_token);
        localStorage.setItem("Refresh Token", refresh_token);
    },

    getExpirationDate: function(jwtToken) {
        if (!jwtToken) {
            return null;
        }
    
        const jwt = JSON.parse(jwtToken.split('.')[1]);
    
        // multiply by 1000 to convert seconds into milliseconds
        return jwt && jwt.exp && jwt.exp * 1000;
    },

    getAccessToken: async function() {
        return localStorage.getItem("Access Token");
    },

    getRefreshToken: async function() {
        return localStorage.getItem("Refresh Token");
    }


}

export default TokenProvider;