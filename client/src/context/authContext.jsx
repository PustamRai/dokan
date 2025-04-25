import React, { createContext, useContext, useState, useEffect } from "react";
import { API } from "../api/API.js";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

// create provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // auto-login on refresh
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const response = await API.get("/api/user/me", {
          headers: {
            Authorization: token,
          },
        });

        const data = response?.data?.data;
        setUser(data);
      } catch (error) {
        console.log("error fetching user: ", error);
        // toast.error(error.response?.data?.message || "failed fetching user");
      }
    };

    fetchUser();
  }, [token]);

  // debugging
  // useEffect(() => {
  //     console.log('Updated user: ', user);
  // }, [user]);

  // register user
  const signup = async (credentials) => {
    try {
      const response = await API.post("/api/user/register", credentials);
      const { token, user } = response?.data?.data;

      setToken(token);
      localStorage.setItem("token", token);
      setUser(user);
      toast.success("signup successfully");
    } catch (error) {
      console.log("error signup: ", error);
      toast.error(error.response?.data?.message || "signup failed");
    }
  };

  // login user
  const login = async (credentials) => {
    try {
      const response = await API.post("/api/user/login", credentials);
      const { token, user } = response?.data?.data;

      setToken(token);
      setUser(user)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user))
      toast.success("logged in successfully");
    } catch (error) {
      console.log("error login: ", error);
      toast.error(error.response?.data?.message || "login failed");
    }
  };

  // admin login
  const adminLogin = async (credentials) => {
    try {
      const response = await API.post("/api/admin/login", credentials);
      const { token, user } = response?.data?.data;

      if (user?.role === 'admin') {
        setToken(token);
        setUser(user);

        // save token and user in local storage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user))

        toast.success("Admin login successfully");
      } else {
        toast.error("Unauthorized access: Not an admin");
      }
    } catch (error) {
      console.error("Admin login error: ", error);
      toast.error(error.response?.data?.message || "Admin login failed");
    }
  };


  // Load user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  

  // logout user
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user")
    setToken("");
    setUser(null);
    toast.success("logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signup,
        login,
        logout,
        adminLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
