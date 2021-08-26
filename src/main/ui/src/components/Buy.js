import React, { useState, useEffect } from 'react';
import axios from 'axios'; // API 
import { useDisclosure } from "@chakra-ui/react"
import Sidebar from './Sidebar';
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

    return (
        <>
            <Button width="100%" onClick={onOpen}>Buy</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Buy {symbol}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    
                    </ModalBody>
                    
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
