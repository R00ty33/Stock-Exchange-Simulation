import React, { useState, useEffect } from 'react';
import Axios from 'axios'; // API 
import { Button, Flex, Heading, Input, useColorModeValue, Text, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { DarkMode } from './DarkMode';
import tokenProvider from './TokenProvider';
import authProvider from './AuthProvider';

function LoginPage() {
    const formBackground = useColorModeValue("gray.100", "gray.700") /** Light Mode = gray.100,     Dark Mode = gray.700 */  
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [incorrectPasswordAlert, setIncorrectPasswordAlert] = useState(false);

    useEffect(() => {
        handleLogged();
    }, [])
    
    /** If logged in, go to Dashboard */
    function handleLogged() {
        if (authProvider.useAuth()) {
            history.push('/Dashboard');
        }
    }


    function LoginAuthentication() {
        const params = new URLSearchParams();
        params.append('email', email);
        params.append('password', password);

        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        Axios.post('http://localhost:8080/api/login', params, config).then((response) => {
            console.log(response.status, response, response.data);
            if (response.data.message === 'Unauthorized') {
                setIncorrectPasswordAlert(true);
            }
            else {
                let access_token = response.data.access_token;
                let refresh_token = response.data.refresh_token;
                tokenProvider.setTokens(access_token, refresh_token);
                console.log(tokenProvider.getAccessToken());
                console.log("Logged in: " + tokenProvider.isLoggedIn())
                return history.push('/Dashboard');
            }
        }).catch((err) => {
            console.log("Promise Rejected", err.message, err.response.data);
            if (err.response.data.message === 'Unauthorized') {
                setIncorrectPasswordAlert(true);
            }
        })
    }

    const HandleIncorrectPasswordAlert = () => {
        if (incorrectPasswordAlert) {
            return (
                <IncorrectPasswordAlert/>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }

    const IncorrectPasswordAlert = () => {
          return (
            <Alert status="error" mb={6}>
              <AlertIcon />
              <AlertTitle mr={-1}></AlertTitle>
              <AlertDescription maxWidth="sm">Wrong Email/Password</AlertDescription>
              <CloseButton position="absolute" onClick={() => setIncorrectPasswordAlert(false)} right="-2px" top="8px"/>
            </Alert>
          )
    }

    const handleEmail = e => {
        setEmail(e.target.value);
    }

    const handlePassword = e => {
        setPassword(e.target.value);
    }


    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" background={formBackground} p={12} rounded={6}>
                <Heading mb={6}>Log in
                <DarkMode />
                </Heading>
                <Input type="text" onChange={handleEmail} placeholder="email" variant="filled" mb={3}></Input>
                <Input type="password" onChange={handlePassword} placeholder="*********" variant="filled" mb={6}></Input>
                <HandleIncorrectPasswordAlert/>
                <Button onClick={LoginAuthentication} mb={3} colorScheme="teal">Log in</Button>
                <Text>Dont have an account? Sign up!</Text>
                <Button onClick={() => history.push(`/Register`)} mb={6} colorScheme="red">Sign up</Button>
            </Flex>
        </Flex>
    )
}

export default LoginPage