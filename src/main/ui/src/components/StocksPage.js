import React, { useState } from 'react';
import { Flex, Button, Heading, useColorMode, useColorModeValue, Text, Container, Grid, GridItem, extendTheme, withDefaultColorScheme} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { DarkMode } from './DarkMode';
import tokenProvider from './TokenProvider';
import Sidebar from './Sidebar';
import axios from 'axios'; // API 
import { Line } from 'react-chartjs-2';
require('dotenv').config()


function StocksPage() {
    const { toggleColorMode } = useColorMode(); /** Changes ColorMode */
    const formBackground = useColorModeValue("gray.100", "gray.700") /** Light Mode = gray.100,     Dark Mode = gray.700 */
    const [modeName, setModeName] = useState('Dark Mode'); /** Determines Light or Dark Mode Name */
    const [GME_PRICE, set_GME_PRICE] = useState('');
    const [GME_PERCENT, set_GME_PERCENT] = useState('');
    const LineChart = () => {
        return <div>
            <Line 
                data={{
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                }}
                height={200}
                width={400}
            />
            
        </div>
    }

    async function get_GME_PRICE() {
        try {
            let [data] = await Promise.all([
                axios.get('http://localhost:8080/api/v1/stocks')
            ])
            set_GME_PRICE(data.data.price);
            set_GME_PERCENT(data.data.changeInPercent)
        }
        catch (err) {
            console.log(err)
        }
    }

    async function test() {
        var options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {
              symbol: 'GME',
              function: 'TIME_SERIES_INTRADAY',
              interval: '30min',
              output_size: 'compact',
              datatype: 'json'
            },
            headers: {
              'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
              'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
            }
          };
          
          await axios.request(options).then(function (response) {
              console.log(response.data);
          }).catch(function (error) {
              console.error(error);
          });
    }
    test();
    //get_GME_PRICE();

    function buy(symbol, price) {
        const params = new URLSearchParams();
        params.append('symbol', symbol);
        params.append('price', price);

        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        axios.post('http://localhost:8080/api/login', params, config).then((response) => {
            console.log(response.status, response, response.data);
        }).catch((err) => {
            console.log("Promise Rejected", err.message, err.response.data);
        })
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
                        <Text color="tomato">GME PRICE = {GME_PRICE} GME PERCENT = {GME_PERCENT}</Text>
                        <Button onClick={() => buy('GME', GME_PRICE)} color="tomato">Buy</Button>
                    </GridItem>
                    <GridItem colSpan={3} bg="papayawhip">
                        <LineChart />
                    </GridItem>
                </Grid>
            </Container>
        </Flex>
    )
}

export default StocksPage