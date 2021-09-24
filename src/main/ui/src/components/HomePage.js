import React, { useState, useEffect } from 'react';
import { Flex, Heading, useColorMode, useColorModeValue, Button, Box, Container, Grid, GridItem, extendTheme, withDefaultColorScheme} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { DarkMode } from './DarkMode';
import tokenProvider from './TokenProvider';
import Sidebar from './Sidebar';
import authProvider from './AuthProvider';
import axios from 'axios'; // API 

function Home() {
    const { toggleColorMode } = useColorMode(); /** Changes ColorMode */
    const formBackground = useColorModeValue("gray.100", "gray.700") /** Light Mode = gray.100,     Dark Mode = gray.700 */
    const [modeName, setModeName] = useState('Dark Mode'); /** Determines Light or Dark Mode Name */
    const balance = '';
    const history = useHistory();  

    function getUserDetails() {
        let accessToken = tokenProvider.getAccessToken();
        axios.post('http://localhost:8080/api/v1/user/UserDetails?accessToken=' + accessToken, {
            accessToken: accessToken,
        }).then((response) => {  
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
    }

    function getPositionDetails() {
        let accessToken = tokenProvider.getAccessToken();
        axios.post('http://localhost:8080/api/v1/user/PositionDetails?accessToken=' + accessToken, {
            accessToken: accessToken,
        }).then((response) => {  
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <Flex width="100%">
            <Sidebar />
            <Flex height="100vh" mt={6}>
                <Heading ml={8}>Dashboard</Heading>
                <h1>Balance: </h1>
                <Button onClick={() => getUserDetails()}>Click Me</Button>
                <Button onClick={() => getPositionDetails()}>Click Me</Button>
            </Flex>
        </Flex>
    )
}

export default Home