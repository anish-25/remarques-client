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

    return(
        <AuthContext.Provider 
         value={{
            auth,
            setAuth,
            userVerify
         }
        }>
            {children}
        </AuthContext.Provider>
    )
}
