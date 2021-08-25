import React, { useState, useEffect } from 'react';
import axios from 'axios'; // API 
import Sidebar from './Sidebar';
import { Flex, Button, Input, Heading, Box, useColorMode, useColorModeValue, Text, Container, Grid, GridItem, extendTheme, withDefaultColorScheme} from '@chakra-ui/react';
import GetGraph from './GetGraph';

function StocksPage () {
    const [symbol, setSymbol] = useState('');
    const [GRAPH, setGRAPH] = useState('');
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
            setGRAPH(getGraph(HISTORY));
        })
        .catch((error) => {
            console.log(error);
        })
    }

    function getGraph(data) {
        return (
            <Grid 
                h="400px"
                templateColumns="repeat(5, 1lfr)"
                gap={4}
                >
                    <GridItem rowSpan={10} colSpan={3} bg="papayawhip">
                        <Text fontSize="30px" color="tomato">
                            <span style={{color: "black"}}>Symbol:</span> {symbolResponse}
                        </Text>
                        <br />
                        <Text fontSize="30px" color="tomato">
                            <span style={{color: "black"}}>Price:</span> {price}
                        </Text>
                        <br />
                        <Text fontSize="30px" color="tomato">
                            <span style={{color: "black"}}>Change In Percent:</span> {changeInPercent}
                            <Button float="right" size="md" height="48px" width="200px" border="2px" borderColor="green.500"_hover={{ bg: "green.400" }}>
                                Buy
                            </Button>
                        </Text>
                    </GridItem>
                    <GridItem colSpan={3} bg="papayawhip">
                        <GetGraph data={data} />
                    </GridItem>
            </Grid>
        )
    }


    return (
        <Flex height="100vh">
            <Sidebar />
            <Container maxW="container.xl">
                <Input placeholder="'GME'" value={symbol} onChange={handleSetSymbol} onKeyPress={handleKeyPress} />
                {GRAPH}
            </Container>
        </Flex> 
    )
}

/*
            <Flex height="100vh">
                <Sidebar />
                <Container maxW="container.xl">
                    <Grid 
                    h="400px"
                    templateColumns="repeat(5, 1lfr)"
                    gap={4}
                    >
                        <GridItem rowSpan={2} colSpan={1} bg="papayawhip">
                        </GridItem>
                        <GridItem colSpan={3} bg="papayawhip">
                            {GME_GRAPH}
                        </GridItem>
                    </Grid>
                </Container>
            </Flex>
            */
export default StocksPage

