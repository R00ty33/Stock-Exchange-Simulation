import React from 'react';

const TokenProvider = {

    
    setTokens: function(access_token, refresh_token) {
        localStorage.setItem("ACCESS_TOKEN", access_token);
        localStorage.setItem("REFRESH_TOKEN", refresh_token);
    },

    getAccessToken: function() {
        return localStorage.getItem("ACCESS_TOKEN");
    },

    getRefreshToken: function() {
        return localStorage.getItem("REFRESH_TOKEN");
    },

    getExpirationDate: function(jwtToken) {
        if (!jwtToken) {
            return null;
        }
    
        const jwt = JSON.parse(atob(jwtToken.split('.')[1]));
    
        // multiply by 1000 to convert seconds into milliseconds
        return jwt && jwt.exp && jwt.exp * 1000;
    },

    
    isExpired: function(expirationDate) {
        if (!expirationDate) {
            return false;
        }

        return Date.now() > expirationDate; /* Returns true if the expiration is invalid/expired */
    },

    getToken: async function() {
        if (!localStorage.getItem("ACCESS_TOKEN")) {
            return null;
        }
        
        if (isExpired(getExpirationDate(localStorage.getItem("ACCESS_TOKEN")))) {
            /*
            const updatedToken = await fetch('/update-token', {
                method: 'POST',
                // send refresh token
                // method to update token 
            })
                .then(r => r.json());
            */

            // setTokens(updatedToken, updatedRefreshToken);
        }

        return localStorage.getItem("ACCESS_TOKEN");
    },

    isLoggedIn: function() { 
        if ((localStorage.getItem("ACCESS_TOKEN") === null) || (isExpired(localStorage.getItem("ACCESS_TOKEN")))) {
            return false;
        }
        else {
            return true;
        }
    }

}

export default TokenProvider; /** EXPORT FUNCTIONS */





/** defined functions that are used in above functions */
function getExpirationDate(jwtToken) {
    if (!jwtToken) {
        return null;
    }

    const jwt = JSON.parse(atob(jwtToken.split('.')[1]));

    // multiply by 1000 to convert seconds into milliseconds
    return jwt && jwt.exp && jwt.exp * 1000;
}


function isExpired (expirationDate) {
    if (!expirationDate) {
        return false;
    }

    return Date.now() > expirationDate; /* Returns true if the expiration is invalid/expired */
}