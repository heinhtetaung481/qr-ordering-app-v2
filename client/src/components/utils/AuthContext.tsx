import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type AuthProviderProps = {
    children: React.ReactElement;
};

interface AuthContextValue {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const initialAuthState = {
  isLoggedIn: false,
  login: async () => { throw new Error("Function not implemented"); },
  logout: () => { throw new Error("Function not implemented"); },
};

export const AuthContext = createContext<AuthContextValue>(initialAuthState);

export const AuthProvider = (props: AuthProviderProps) => {
    const { children } = props;
    const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (outletCode: string, password: string) => {
    try {
        // Replace with your login API call using axios or fetch
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { outletCode, password });
        // set token, userData, etc. in local storage
        if(response.status === 200){
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userData', response.data.userData);
        }else{
            // Handle error and set isLoggedIn to false
            console.error('Login failed');
        }
    } catch (error) {
        // Handle error and set isLoggedIn to false
        console.error('Login failed');
    }
  };

  const isLoggedIn = localStorage.getItem('token') ? true : false;

  const logout = () => {
    // Remove token, userData, etc. from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
