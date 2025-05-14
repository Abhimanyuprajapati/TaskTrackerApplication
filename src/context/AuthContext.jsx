import React, { createContext, useContext } from "react";
import api from "./axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const login = async (data) => {
    try {
      const response = await api.post("/login", data);
      console.log("response", response);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.user.token); // Store token in session storage
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user data in session storage
      }
      return response;
    } catch (error) {
       return error.response;
    }
  };

  const register = async (data) => {
    try {
      const response = await api.post("/register", data);
      return response;
    } catch (error) {
      return error.response;
      }
  };

  const otpSender = async (data) =>{
    try{
  const response = await  api.post("/send-otp", data);
      return response;
    }catch(error){
       return error.response;
    }
  }

  const verifyOTP = async (data) =>{
    try{
  const response = await api.post("/verify-otp", data)
      return response;
    }catch(error){
       return error.response;
    }
  }

    const projectDetailCount = async () =>{
    try{
  const response = await api.get("/projects/countrevenuepending");
       return response;
    }catch(error){
       return error.response;
    }
  }

  const recentActivity = async () =>{
    try{
  const response = await api.get("/activity/recent");
       return response;
    }catch(error){
       return error.response;
    }
  }

  const notification = async () =>{
    try{
  const response = await api.get("/notification");
       return response;
    }catch(error){
       return error.response;
    }
  }


  const fetchProjectById = async (id) => {
     try{
  const response = await api.get(`/project/${id}`);
    return response;
    }catch(error){
       return error.response;
    }
};

  const fetchProject = async () => {
     try{
  const response = await api.get("/projects");
    return response;
    }catch(error){
       return error.response;
    }
};

  const markProjectAsComplete = async (id) => {
     try{
  const response = await api.put(`/project/${id}/complete`);
    return response;
    }catch(error){
       return error.response;
    }
};

  const deleteProject = async (id) => {
     try{
  const response = await api.delete(`/project/${id}`);
    return response;
    }catch(error){
       return error.response;
    }
};

  const logout = async (data) => {
    const localStorageToken = sessionStorage.getItem("token");
    try {
      const response = await api.post("/logout", data);
      syncSessionStorage();
      return response;
    } catch (error) {
      return error.response;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        otpSender,
        verifyOTP,
        projectDetailCount,
        fetchProjectById,
        fetchProject,
        recentActivity,
        markProjectAsComplete,
        deleteProject,
        notification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);