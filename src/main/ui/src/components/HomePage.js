import React, { useState } from 'react';
import { Button, Flex, Heading, Input, useColorMode, useColorModeValue, Text } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { DarkMode } from './DarkMode';

function Home() {
    const { toggleColorMode } = useColorMode(); /** Changes ColorMode */
    const formBackground = useColorModeValue("gray.100", "gray.700") /** Light Mode = gray.100,     Dark Mode = gray.700 */
    const [modeName, setModeName] = useState('Dark Mode'); /** Determines Light or Dark Mode Name */

    const handleModeName = () => { /** handles toggleColorMode & modeName */ 
        if (formBackground == "gray.100") {
            setModeName("Light Mode");
        } else {
            setModeName("Dark Mode");
        }
        toggleColorMode();
    } 
    
    const history = useHistory();

    

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" background={formBackground} p={12} rounded={6}>
                <Heading mb={6}>Home
                <DarkMode />
                </Heading>
            </Flex>
        </Flex>
    )
}

export default Home