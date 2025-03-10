import axios from 'axios';
import { useEffect } from 'react';
import { StringLiteral } from 'typescript';

interface Login{
    email: string,
    password: string
}

export const loginTrail = async () => {
    const emailAdd = "abhinav@gmail.com";
    const passwordS = "password";
    const responseData = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/users/api/login`,{
        email: emailAdd,
        password: passwordS
    })
    return responseData;
}

