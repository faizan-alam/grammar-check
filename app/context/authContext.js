"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "../compnents/Spinner";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  const signIn = async (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login Successful");
      router.push("/grammar");
      setUser(user);
    }
  };

  const signOut = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      setUser(null);
      localStorage.removeItem("user");
      toast.success("Logout Successful!");
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Try again.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {user === undefined ? (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
