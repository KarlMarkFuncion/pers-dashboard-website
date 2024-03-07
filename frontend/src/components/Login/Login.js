"use client";

import { Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import useStore from "../../store/useStore";
const LoginPage = () => {
  const navigate = useNavigate();

  const { setCurrentUser } = useStore();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: emailRef.current.value,
      password: encodeURIComponent(passwordRef.current.value),
    };

    try {
      const response = await axios.get(
        `${process.env.BACKEND_URL}/get_user_login/${data.email}/${data.password}`
      );

      setCurrentUser(response.data);
      navigate("/user/dashboard");

    } catch (error) {
      console.log("Error fetching data: ", error);
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
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" />
        </div>
        <TextInput ref={passwordRef} required type="password" />
      </div>
      <Link className="text-sm to-blue-800 underline" to="/signup">
        Don't have an account? Sign up!
      </Link>
      <Button onClick={(e) => handleSubmit(e)} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default LoginPage;
