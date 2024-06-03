"use client";

import { Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react"; // Import useState
import useStore from "../../store/useStore";

const LoginPage = () => {
  const navigate = useNavigate();

  const { setCurrentUser } = useStore();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [emailError, setEmailError] = useState(""); // State for email error
  const [passwordError, setPasswordError] = useState(""); // State for password error
  const [notFoundError, setNotFoundError] = useState(""); // State for not found error
  const [invalidCredentialsError, setInvalidCredentialsError] = useState(""); // State for invalid credentials error

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!emailRef.current.value.trim()) {
      setEmailError("[email] is required*");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!passwordRef.current.value.trim()) {
      setPasswordError("[password] is required*");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) {
      return; // Exit early if validation fails
    }

    const data = {
      email: emailRef.current.value,
      password: encodeURIComponent(passwordRef.current.value),
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/get_user_login/${data.email}/${data.password}`
      );

      setCurrentUser(response.data);
      navigate("/dashboard");

    } catch (error) {
      console.log("Error fetching data: ", error);
      if (error.response && error.response.status === 401) {
        setInvalidCredentialsError("Incorrect credentials. Please check your email and password.");
      } else if (error.response && error.response.status === 404) {
        setNotFoundError("User not found. Please check your email and password.");
      } else {
        setNotFoundError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <form className="mt-32 p-4 flex max-w-md flex-col gap-4 mx-auto">
      <h1 className="text-2xl font-semibold">Log into your Account</h1>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="login_email" value="Your email" />
        </div> 
        <TextInput ref={emailRef} required type="email" />
        {emailError && <p className="text-red-600">{emailError}</p>} {/* Display email error */}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" />
        </div>
        <TextInput ref={passwordRef} required type="password" />
        {passwordError && <p className="text-red-600">{passwordError}</p>} {/* Display password error */}
      </div>
      {notFoundError && <p className="text-red-600">{notFoundError}</p>} {/* Display not found error */}
      {invalidCredentialsError && <p className="text-red-600">{invalidCredentialsError}</p>} {/* Display invalid credentials error */}
      <Link className="text-sm to-blue-800 underline" to="/signup">
        Don't have an account? Sign up!
      </Link>
      <Link className="text-sm to-blue-800 underline" to="/forgot_password">
        Forgot password?
      </Link>
      <Button onClick={(e) => handleSubmit(e)} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default LoginPage;
