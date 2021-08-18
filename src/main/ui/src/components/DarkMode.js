import React, { useState } from 'react';
import { Button, useColorMode, useColorModeValue} from '@chakra-ui/react';

export const DarkMode = () => {
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

    return (
        <Button onClick={handleModeName} ml={6} size="xs">{modeName}</Button>
    )
}