import React, { useState, useEffect, Component } from 'react';
import { Flex, Button, Heading, useColorMode, useColorModeValue, Text, Container, Grid, GridItem, extendTheme, withDefaultColorScheme} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { DarkMode } from './DarkMode';
import tokenProvider from './TokenProvider';
import Sidebar from './Sidebar';
import axios from 'axios'; // API 
import { Line } from 'react-chartjs-2';
import GetGraph from './GetGraph';

class StocksPage extends Component {
    constructor() {
        super();
        this.state = {
            chartData:{}
        }
    }

    componentDidMount() {
        this.getChartData();
    }

    getChartData() {
        let GME_HISTORY = [];
        axios.get('http://localhost:8080/api/v1/stocks/GME/History').then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                GME_HISTORY.push(response.data[i].close);
            }
            this.setState({
                chartData: {
                    GME_HISTORY,
                }
            })
        });
    }

    render() {
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
                            <GetGraph data={this.state.chartData.GME_HISTORY} />
                        </GridItem>
                    </Grid>
                </Container>
            </Flex>
        )
    }
}

export default StocksPage