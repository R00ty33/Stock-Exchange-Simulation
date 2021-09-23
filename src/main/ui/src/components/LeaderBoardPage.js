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
    let STACK = []

    function handleSubmit() {
        axios.get('http://localhost:8080/api/v1/LeaderBoard/GetLeaderBoard', {
        }).then((response) => {
            console.log(response);
            for (let i = 0; i < response.data[1].length; i++) {
                STACK.push(response.data())
            }
            setLeaderBoardData(getTable('test'));
        })
        .catch((error) => {
            if (error.message = 'Request failed with status code 500') {
            } else {
                console.log(error.message);
            }
        })
    }

    function getTable(first_email) {
        return (
            <Table>
                <TableCaption>Top 5</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Rank</Th>
                        <Th>Email</Th>
                        <Th>Net Gain</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>1</Td>
                        <Td>{first_email}</Td>
                        <Td></Td>
                    </Tr>
                    <Tr>
                        <Td>2</Td>
                        <Td></Td>
                        <Td></Td>
                    </Tr>
                    <Tr>
                        <Td>3</Td>
                        <Td></Td>
                        <Td></Td>
                    </Tr>
                    <Tr>
                        <Td>4</Td>
                        <Td></Td>
                        <Td></Td>
                    </Tr>
                    <Tr>
                        <Td>5</Td>
                        <Td></Td>
                        <Td></Td>
                    </Tr>
                </Tbody>
            </Table>
        )
    }

    return (
        <Flex width="100%">
            <Sidebar />
            <Flex height="100vh" mt={6}>
                <Heading ml={8}>LeaderBoard</Heading>
                <Button onClick={() => handleSubmit()}>Click Me</Button>
                {leaderBoardData}
            </Flex>
        </Flex>
    )
}

export default LeaderBoard