import React, { useState } from 'react';
import Axios from 'axios'; // API 
import { Button, Flex, Heading, Input, useColorModeValue, Text, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { DarkMode } from './DarkMode';
import md5 from 'md5';

function SignUpPage() {
    const formBackground = useColorModeValue("gray.100", "gray.700") /** Light Mode = gray.100,     Dark Mode = gray.700 */
    const history = useHistory();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailTakenAlert, setEmailTakenAlert] = useState(false);

    function register() {
        Axios.post('http://localhost:8080/api/signup', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }).then((response) => {
            console.log(response.status, response, response.data);
            history.push(`/Login`);
        }).catch((err) => {
            console.log("Promise Rejected", err.message, err.response.data);
            setEmailTakenAlert(true);
        })
    }


    const handleFirstName = e => { 
        setFirstName(e.target.value)
    }

    const handleLastName = e => {
        setLastName(e.target.value)
    }

    const handleEmail = e => {
        setEmail(e.target.value);
    }

    const handlePassword = e => {
        setPassword(e.target.value);
    }

    const HandleEmailTakenAlert = () => {
        if (emailTakenAlert) {
            return (
                <EmailTakenAlert/>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }

    const EmailTakenAlert = () => {
          return (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}></AlertTitle>
              <AlertDescription>Email is taken</AlertDescription>
              <CloseButton position="absolute" onClick={() => setEmailTakenAlert(false)} right="6px" top="8px"/>
            </Alert>
          )
    }

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" background={formBackground} p={12} rounded={6}>
                <Heading mb={6}>Sign up
                <DarkMode />
                </Heading>
                <Input type="text" value={firstName} onChange={handleFirstName} placeholder="first name" variant="filled" mb={3}></Input>
                <Input type="text" value={lastName} onChange={handleLastName} placeholder="last name" variant="filled" mb={3}></Input>
                <HandleEmailTakenAlert />
                <Input type="text" value={email} onChange={handleEmail} placeholder="email" variant="filled" mb={3}></Input>
                <Input type="password" value={password} onChange={handlePassword} placeholder="*********" variant="filled" mb={3}></Input>
                <Button onClick={register} mb={6} colorScheme="teal">Register</Button>
                <Text>Already have an account?</Text>
                <Button onClick={() => history.push(`/Login`)} mb={6} size="md" colorScheme="red">Sign in</Button>
            </Flex>
        </Flex>
    )
}

export default SignUpPage;