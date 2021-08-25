import React, { useState, useEffect } from 'react';
import { Flex, Heading, useColorMode, useColorModeValue, Button, Box, Container, Grid, GridItem, extendTheme, withDefaultColorScheme} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { DarkMode } from './DarkMode';
import tokenProvider from './TokenProvider';
import Sidebar from './Sidebar';
import authProvider from './AuthProvider';

function Home() {
    const { toggleColorMode } = useColorMode(); /** Changes ColorMode */
    const formBackground = useColorModeValue("gray.100", "gray.700") /** Light Mode = gray.100,     Dark Mode = gray.700 */
    const [modeName, setModeName] = useState('Dark Mode'); /** Determines Light or Dark Mode Name */
    const history = useHistory();  


    return (
        <Flex width="100%">
            <Sidebar />
            <Flex height="100vh" mt={6}>
                <Heading ml={8}>Dashboard</Heading>
            </Flex>
        </Flex>
    )
}

export default Home