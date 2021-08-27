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
import GetGraph from './GetGraph';
import Buy from './Buy';
import Sell from './Sell';

function StocksPage () {
    const [symbol, setSymbol] = useState('');
    const [GRAPH, setGRAPH] = useState('');
    const [symbolAlert, setSymbolAlert] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()

    let symbolResponse = '';
    let price = 0;
    let changeInPercent = 0;
    let HISTORY = [];

    function handleSetSymbol(e) {
        setSymbol(e.target.value);
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }


    function handleSubmit() {
        axios.post('http://localhost:8080/api/v1/stocks/GetStock?symbol=' + symbol, {
            symbol: symbol,
        }).then((response) => {
            symbolResponse = response.data[0].symbol;
            price = response.data[0].price;
            changeInPercent = response.data[0].changeInPercent;
            for (let i = 0; i < response.data[1].length; i++) {
                HISTORY.push(response.data[1][i].close);
            }
        })
        .then(() => {
            setGRAPH(getGraph(HISTORY, symbolResponse));
        })
        .catch((error) => {
            if (error.message = 'Request failed with status code 500') {
                setSymbolAlert(true);
            } else {
                console.log(error.message);
            }
        })
    }

    function getGraph(data, label) {
        return (
            <Grid 
                h="400px"
                templateColumns="repeat(5, 1lfr)"
                gap={4}
                mt={3} ml={6}
                >
                    <GridItem rowSpan={10} colSpan={3} bg="gray.200">
                        <Text fontSize="30px" color="blue.700">
                            <span style={{color: "blue.700"}}>Symbol: </span> {symbolResponse}
                        </Text>
                        <br />
                        <Text fontSize="30px" color="blue.700">
                            <span style={{color: "blue.700"}}>Price: </span> {price}
                        </Text>
                        <br />
                        <Text fontSize="30px" color="blue.700">
                            <span style={{color: "blue.700"}}>Change In Percent: </span> {changeInPercent} %
                        </Text>
                        <Menu>
                            <div>
                                <MenuButton as={Button} color="blue.700"float="right" mr={3} mb={3} size="md" height="48px" width="200px" border="2px" borderColor="blue.700"_hover={{ bg: "#AEC8CA" }}>
                                    Trade now
                                </MenuButton>
                            </div>
                            <MenuList>
                                <MenuItem>
                                    <div>
                                        <Buy symbol={symbolResponse} />
                                    </div>
                                </MenuItem>
                                <MenuItem>
                                    <div>
                                        <Sell symbol={symbolResponse} />
                                    </div>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </GridItem>
                    <GridItem colSpan={3} bg="gray.200">
                        <GetGraph data={data} label={label} />
                    </GridItem>
            </Grid>
        )
    }

    const SymbolAlert = () => {
        return (
          <Alert status="error" mt={3} ml={6} mb={3}>
            <AlertIcon />
            <AlertTitle mr={2}></AlertTitle>
            <AlertDescription>Symbol does not exist</AlertDescription>
            <CloseButton position="absolute" onClick={() => setSymbolAlert(false)} right="6px" top="8px"/>
          </Alert>
        )
  }

  
  const HandleSymbolAlert = () => {
    if (symbolAlert) {
        return (
            <SymbolAlert />
        )
    }
    else {
        return (
            <div></div>
        )
    }
}


    return (
        <Flex height="100vh">
            <Sidebar />
            <Container maxW="container.xl">
                <Input mt={3} ml={6} placeholder="Type ticker here..." value={symbol} onChange={handleSetSymbol} onKeyPress={handleKeyPress} />
                <HandleSymbolAlert/>
                {GRAPH}
            </Container>
        </Flex> 
    )
}

export default StocksPage

