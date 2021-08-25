import React, { useState, useEffect, Component } from 'react';
import { Flex, Button, Heading, useColorMode, useColorModeValue, Text, Container, Grid, GridItem, extendTheme, withDefaultColorScheme} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { DarkMode } from './DarkMode';
import tokenProvider from './TokenProvider';
import Sidebar from './Sidebar';
import axios from 'axios'; // API 
import GetGraph from './GetGraph';

function StocksPage () {
        let GME_HISTORY = [];
        const [GME_GRAPH, set_GME_GRAPH] = useState('');

        useEffect(() => {
            get_GME_GRAPH();
        }, []); /** [] only runs once before render like componentDidMount() */

        function get_GME_GRAPH() {
            axios.get('http://localhost:8080/api/v1/stocks/GME/History').then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    GME_HISTORY.push(response.data[i].close);
                }
            }).then(() => {
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

export default StocksPage

