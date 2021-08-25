import React, {useState} from 'react'
import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList,
    Button
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom';
import authProvider from './AuthProvider';

export default function ButtonItem({ icon, title, navSize,}) {
    const history = useHistory();  
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu placement="right">
                <Link
                    p={5}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: "#AEC8CA" }}
                    w={navSize == "large" && "100%"}
                >
                
                    <Button w="75%" variant="ghost" onClick={() => { authProvider.logout(); history.push('/Login')}}>
                        <Flex>
                            <Icon as={icon} fontSize="x1" color={"gray.500"} />
                            <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                        </Flex>
                    </Button>
                </Link>
            </Menu>
        </Flex>
    )
}

/*
                    <Button p={5} borderRadius={8} _hover={{ textDecor: 'none', backgroundColor: "#AEC8CA" }}onClick={() => { authProvider.logout(); history.push('/Login')}} leftIcon={<FiLogOut />}>Logout</Button>

*/