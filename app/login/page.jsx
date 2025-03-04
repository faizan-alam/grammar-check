"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Input from "../compnents/Form/Input";
import "../styles/styles.css";
import { useAuth } from "../context/authContext";
import Spinner from "../compnents/Spinner";
import Button from "../compnents/Form/Button";
import FormFooter from "../compnents/Form/FormFooter";

export default function Login() {
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      toast.error("Enter a valid email");
      return;
    }
    if (!validatePassword(formData.password)) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/login", formData);
      if (response.status === 200) {
        signIn(response?.data.user);
      } else {
        toast.error(result.message || "Invalid email or password.", false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="font-bold text-2xl">Login</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button loading={loading} label={loading ? <Spinner /> : "Login"} />
      </form>
      <FormFooter
        label="Don't have an account?"
        navigateLabel="Sign Up"
        navigate="signup"
      />
    </div>
  );
}
