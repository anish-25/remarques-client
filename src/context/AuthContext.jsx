import axios from '../api/axios';
import React, {createContext} from 'react'
import { useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

    const [auth,setAuth] = useState({})

    const userVerify = (email,password) => {
       return axios.post('/login',{
            email,
            password
        })
    }

    const otpVerify = (email,otp) => {
        return axios.post('/verify-otp',{
            email,
            otp
        })
    }

    const createUser = (name,email,password) => {
        return axios.post('/register',{
            name,
            email,
            password
        })
    }

    return(
        <AuthContext.Provider 
         value={{
            auth,
            setAuth,
            userVerify,
            otpVerify,
            createUser
         }
        }>
            {children}
        </AuthContext.Provider>
    )
}
