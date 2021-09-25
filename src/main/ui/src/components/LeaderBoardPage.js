import React, { useState, useEffect } from 'react';
import { Flex, Heading, useColorMode, useColorModeValue, Button, Box,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption, Container, Grid, GridItem, extendTheme, withDefaultColorScheme} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { DarkMode } from './DarkMode';
import axios from 'axios'; // API 
import tokenProvider from './TokenProvider';
import Sidebar from './Sidebar';
import authProvider from './AuthProvider';

function LeaderBoard() {
    const { toggleColorMode } = useColorMode(); /** Changes ColorMode */
    const formBackground = useColorModeValue("gray.100", "gray.700") /** Light Mode = gray.100,     Dark Mode = gray.700 */
    const [modeName, setModeName] = useState('Dark Mode'); /** Determines Light or Dark Mode Name */
    const history = useHistory();  
    const [leaderBoardData, setLeaderBoardData] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/LeaderBoard/GetLeaderBoard', {
        }).then((response) => {
            console.log(response.data);
            setLeaderBoardData(getTable(response.data));
        })
        .catch((error) => {
            if (error.message = 'Request failed with status code 500') {
            } else {
                console.log(error.message);
            }
        })
    }, []);

    function getTable(data) {
        let formattedData = [];
        for (let i=0; i<data.length; i++) {
            let tempRank = i + 1;
            let tempEmail = data[i].user_email
            let tempBalance = data[i].portfolioBalance;
            formattedData.push(<Tbody><Tr><Td>{tempRank}</Td><Td>{tempEmail}</Td><Td>{tempBalance}</Td></Tr></Tbody>)
        }
        return (
            <Table>
                <TableCaption>Rankings</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Rank</Th>
                        <Th>Email</Th>
                        <Th>Net Balance</Th>
                    </Tr>
                </Thead>
                {formattedData}
            </Table>
        )
    }

    return (
        <Flex width="100%">
            <Sidebar />
            <Flex height="100vh" mt={6}>
                <Heading ml={8}>LeaderBoard</Heading>
                <Container ml={5} mt={6}>
                {leaderBoardData}
                </Container>
            </Flex>
        </Flex>
    )
}

export default LeaderBoard