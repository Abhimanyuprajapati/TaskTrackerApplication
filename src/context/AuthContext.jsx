import React, { createContext, useContext, useState } from "react";
import api from "./axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

   const [profilePic, setProfilePic] = useState(null);

  const login = async (data) => {
    try {
      const response = await api.post("/login", data);
      console.log("response", response);
      if (response.status === 200) {
        sessionStorage.setItem("token", response.data.user.token); // Store token in session storage
        sessionStorage.setItem("user", JSON.stringify(response.data.user)); // Store user data in session storage
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

  const otpSender = async (data) => {
    try {
      const response = await api.post("/send-otp", data);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  const verifyOTP = async (data) => {
    try {
      const response = await api.post("/verify-otp", data)
      return response;
    } catch (error) {
      return error.response;
    }
  }

  const projectDetailCount = async () => {
    try {
      const response = await api.get("/projects/countrevenuepending");
      return response;
    } catch (error) {
      return error.response;
    }
  }

  const recentActivity = async () => {
    try {
      const response = await api.get("/activity/recent");
      return response;
    } catch (error) {
      return error.response;
    }
  }

  const notification = async () => {
    try {
      const response = await api.get("/notification");
      return response;
    } catch (error) {
      return error.response;
    }
  }


  const fetchProjectById = async (id) => {
    try {
      const response = await api.get(`/project/${id}`);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  const fetchProject = async () => {
    try {
      const response = await api.get("/projects");
      return response;
    } catch (error) {
      return error.response;
    }
  };

  const markProjectAsComplete = async (id) => {
    try {
      const response = await api.put(`/project/${id}/complete`);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  const deleteProject = async (id) => {
    try {
      const response = await api.delete(`/project/${id}`);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  const createProject = async (data) => {
    try {
      const response = await api.post("/project", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  const editProject = async (id, data) => {
    try {
      const response = await api.patch(`/project/${id}`, data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  const feedback = async (data) => {
    try {
      const response = await api.post("/feedback", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  const getProfile = async () => {
    try {
      const response = await api.get("/profile-pic");
      return response;
    } catch (error) {
      return error.response;
    }
  };

  const updateProfile = async (data) => {
    try {
      const response = await api.post("/update-profile", data, {
          headers: {
        'Content-Type': 'multipart/form-data', 
      },
      });
      return response;
    } catch (error) {
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
        createProject,
        editProject,
        feedback,
        updateProfile,
        deleteProject,
        getProfile,
        notification,
        profilePic,
        setProfilePic,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);