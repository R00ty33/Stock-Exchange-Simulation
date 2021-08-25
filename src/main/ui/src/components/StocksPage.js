import React, { useState, useEffect } from 'react';
import axios from 'axios'; // API 
import Sidebar from './Sidebar';
import { Flex, Button, Input, Heading, useColorMode, useColorModeValue, Text, Container, Grid, GridItem, extendTheme, withDefaultColorScheme} from '@chakra-ui/react';
import GetGraph from './GetGraph';

function StocksPage () {
    const [symbol, setSymbol] = useState('');
    const [GME_GRAPH, set_GME_GRAPH] = useState('');
    const GME_HISTORY = [];

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
            console.log(response.data[0].symbol)
            console.log(response.data[0].price)
            console.log(response.data[0].changeInPercent)
            for (let i = 0; i < response.data[1].length; i++) {
                GME_HISTORY.push(response.data[1][i].close);
            }
        })
        .then(() => {
            set_GME_GRAPH(getGraph(GME_HISTORY));
        })
    }

    function getGraph(data) {
        return (
            <GetGraph data={data} />
        )
    }


    return (
        <Flex height="100vh">
            <Sidebar />
            <Input placeholder="'GME'" value={symbol} onChange={handleSetSymbol} onKeyPress={handleKeyPress} />
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

