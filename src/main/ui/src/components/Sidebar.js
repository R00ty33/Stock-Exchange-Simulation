import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Button, 
    Center,
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiDollarSign,
    FiBriefcase,
    FiSettings,
    FiLogOut
} from 'react-icons/fi'
import { IoPawOutline } from 'react-icons/io5'
import NavItem from '../components/NavItem'
import ButtonItem from '../components/ButtonItem';



export default function Sidebar() {
    const [navSize, changeNavSize] = useState("large")

    const getActiveSideBar = () => {
        if (window.location.pathname == "/Dashboard") {
            return (
                <div>
                    <NavItem url="/Dashboard" navSize={navSize} icon={FiHome} title="Dashboard" active/>
                    <NavItem url="/Stocks" navSize={navSize} icon={FiDollarSign} title="Stocks" />
                    <NavItem navSize={navSize} icon={FiBriefcase} title="Reports" />
                    <NavItem navSize={navSize} icon={FiSettings} title="Settings" />
                    <ButtonItem navSize={navSize} icon={FiLogOut} title="Logout"/>
                </div>
            )
        }
        if (window.location.pathname == "/Stocks") {
            return (
                <div>
                    <NavItem url="/Dashboard" navSize={navSize} icon={FiHome} title="Dashboard" />
                    <NavItem url="/Stocks" navSize={navSize} icon={FiDollarSign} title="Stocks" active/>
                    <NavItem navSize={navSize} icon={FiBriefcase} title="Reports" />
                    <NavItem navSize={navSize} icon={FiSettings} title="Settings" />
                    <ButtonItem navSize={navSize} icon={FiLogOut} title="Logout"/>
                </div>
            )
        }
        if (window.location.pathname == "/Reports") {
            return (
                <div>
                    <NavItem url="/Dashboard" navSize={navSize} icon={FiHome} title="Dashboard" />
                    <NavItem url="/Stocks" navSize={navSize} icon={FiDollarSign} title="Stocks" />
                    <NavItem navSize={navSize} icon={FiBriefcase} title="Reports" active/>
                    <NavItem navSize={navSize} icon={FiSettings} title="Settings" />
                    <ButtonItem navSize={navSize} icon={FiLogOut} title="Logout"/>
                </div>
            )
        }
        if (window.location.pathname == "/Settings") {
            return (
                <div>
                    <NavItem url="/Dashboard" navSize={navSize} icon={FiHome} title="Dashboard" />
                    <NavItem url="/Stocks" navSize={navSize} icon={FiDollarSign} title="Stocks" />
                    <NavItem navSize={navSize} icon={FiBriefcase} title="Reports" />
                    <NavItem navSize={navSize} icon={FiSettings} title="Settings" active/>
                    <ButtonItem navSize={navSize} icon={FiLogOut} title="Logout"/>
                </div>
            )
        }
    }

    return (
        <Flex
            pos="sticky"
            left="5"
            h="95vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
                {getActiveSideBar()}
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize == "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="avatar-1.jpg" />
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">Sylwia Weller</Heading>
                        <Text color="gray">Admin</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}



