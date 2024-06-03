// ForgotPasswordPage.jsx
"use client";

import { Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailRef.current.value.trim()) {
      setEmailError("Email is required.");
      return;
    }

    setEmailError("");

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/forgot_password`, {
        email: emailRef.current.value,
      });
    
      console.log("Response Status:", response.status); // Log the response status
      console.log("Response Data:", response.data); // Log the response data
    
      alert("Reset link sent to your email. Check your inbox.");
      navigate("/login"); // Redirect back to login page
    } catch (error) {
      console.error("Failed to send reset link:", error);
      alert("Failed to send reset link. Please try again later.");
    }
    
  };

  return (
    <form className="mt-32 p-4 flex max-w-md flex-col gap-4 mx-auto">
      <h1 className="text-2xl font-semibold">Forgot Password?</h1>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="forgot_password_email" value="Enter your email" />
        </div>
        <TextInput ref={emailRef} required type="email" />
        {emailError && <p className="text-red-600">{emailError}</p>}
      </div>
      <Button onClick={(e) => handleSubmit(e)} type="submit">
        Send Reset Link
      </Button>
      <Link className="text-sm text-blue-800 underline" to="/login">
        Back to Login
      </Link>
    </form>
  );
};

export default ForgotPasswordPage;
