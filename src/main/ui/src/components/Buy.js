import React, { useState, useEffect } from 'react';
import axios from 'axios'; // API 
import { useDisclosure } from "@chakra-ui/react"
import Sidebar from './Sidebar';
import tokenProvider from './TokenProvider';
import { Flex, Button, Input, Heading, Box, useColorMode, useColorModeValue, Alert, AlertIcon, AlertTitle, 
    AlertDescription, CloseButton, Text, Container, Grid, GridItem, extendTheme, withDefaultColorScheme,
    Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuIcon, MenuCommand, MenuDivider,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';

export default function Buy({symbol}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ shares, setShares] = useState('');

    const handleShares = (e) => {
        setShares(e.target.value);
    }

    function handleSubmit() {
        let accessToken = tokenProvider.getAccessToken();
        axios.post('http://localhost:8080/api/v1/stocks/Trade?accessToken=' + accessToken + '&symbol=' + symbol + '&shares=' + shares + '&transaction=buy', {
            accessToken: accessToken,
            symbol: symbol,
            shares: shares,
            transaction: 'buy',
        }).then((response) => {  
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            <Button width="325%" onClick={onOpen}>Buy</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Buy {symbol}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input type="text" onChange={handleShares} placeholder="Number of shares" variant="filled" mb={3}></Input>
                    </ModalBody>
                    
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                            Buy
                        </Button>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
