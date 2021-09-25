import React, { useState, useEffect } from 'react';
import { Flex, Heading, useColorMode, useColorModeValue, Button, Box, Container, Grid, GridItem, extendTheme, withDefaultColorScheme} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { DarkMode } from './DarkMode';
import tokenProvider from './TokenProvider';
import Sidebar from './Sidebar';
import authProvider from './AuthProvider';
import axios from 'axios'; // API 
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
  } from "@chakra-ui/react"

function Home() {
    const { toggleColorMode } = useColorMode(); /** Changes ColorMode */
    const formBackground = useColorModeValue("gray.100", "gray.700") /** Light Mode = gray.100,     Dark Mode = gray.700 */
    const [modeName, setModeName] = useState('Dark Mode'); /** Determines Light or Dark Mode Name */
    const [data, setData] = useState('');
    const history = useHistory();  
    let email = 't';
    let firstName = '';
    let lastName = ''; 
    let balance = '5000';
    let portfolioBalance = '5000';
    let positionData = '';

    useEffect(() => {
        let accessToken = tokenProvider.getAccessToken();
        axios.post('http://localhost:8080/api/v1/user/UserDetails?accessToken=' + accessToken, {
            accessToken: accessToken,
        }).then((response) => {  
            console.log(response.data);
            email = response.data.email;
            firstName = response.data.firstName;
            lastName = response.data.lastName;
        }).then(() => {
            axios.post('http://localhost:8080/api/v1/user/PositionDetails?accessToken=' + accessToken, {
                accessToken: accessToken,
            }).then((response) => {  
                console.log(response.data);
                if (response.data.balance != null || response.data.balance != undefined) {
                    balance = response.data.balance;    
                }
                if (response.data.portfolioBalance != null || response.data.portfolioBalance != undefined) {
                    portfolioBalance = response.data.portfolioBalance;
                }
                positionData = response.data.positions;
            }).then(() => {
                setData(getData(email, firstName, lastName, balance, positionData)); //JSON.stringify(positions)
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    function getData(email, firstName, lastName, balance, positionData) {
        return (
            <Container ml={5} mt={6}>
                <h1>Hello {firstName} {lastName},</h1>
                <h1>Email: {email}</h1>
                <h1>Balance: {balance}</h1>
                <h1>Portfolio Balance: {portfolioBalance}</h1>
                <h1>Positions: {getTable(positionData)}</h1>
            </Container>
        )
    }

    function getTable(data) {
        if (data == null || data == "") {
            return (
                <Table>
                <TableCaption>Your Positions</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Symbol</Th>
                        <Th>Shares</Th>
                        <Th>Price</Th>
                    </Tr>
                </Thead>
            </Table>
            )
        }
        let formattedData = [];
        for (let i=0; i<data.length; i++) {
            let tempSymbol = data[i].symbol;
            let tempShares = data[i].shares;
            let tempPrice = data[i].price_per_share;
            formattedData.push(<Tbody><Tr><Td>{tempSymbol}</Td><Td>{tempShares}</Td><Td>{tempPrice}</Td></Tr></Tbody>)
        }
        return (
            <Table>
                <TableCaption>Your Positions</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Symbol</Th>
                        <Th>Shares</Th>
                        <Th>Price</Th>
                    </Tr>
                </Thead>
                {formattedData}
            </Table>
        )
    }


    return (
        <Flex width="100%">
            <Sidebar />
            <Flex height="100vh" mt={6} display="block">
                <Heading ml={8}>Dashboard</Heading>
                {data}
            </Flex>
        </Flex>
    )
}

export default Home