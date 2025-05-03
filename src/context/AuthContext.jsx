import React, { createContext, useContext } from "react";
import axios from "axios";


const FROENTEND_URL = import.meta.env.VITE_BASE_FRONTEND_URL;
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

  console.log("FROENTEND_URL",FROENTEND_URL)
  const login = async (data) => {
    try {
      const response = await axios.post(`${FROENTEND_URL}/login`, data, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("response", response);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.user.token); // Store token in session storage
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user data in session storage
      }
      return response;
    } catch (error) {
      return error;
    }
  };

  const register = async (data) => {
    try {
      const response = await axios.post(`${FROENTEND_URL}/register`, data, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error) {
      return error;
    }
  };

  const logout = async (data) => {
    const localStorageToken = sessionStorage.getItem("token");
    try {
      const response = await axios.post(`${FROENTEND_URL}/logout`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageToken}`,
        },
      });
      syncSessionStorage();
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Logout error");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);