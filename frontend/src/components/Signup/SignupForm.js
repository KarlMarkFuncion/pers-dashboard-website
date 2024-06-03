"use client";

import { Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react";

const SignupPage = () => {
  const navigate = useNavigate();

  const [errorMessages, setErrorMessages] = useState({});

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const confirmPassword = confirmPasswordRef.current.value.trim();
    const firstName = firstNameRef.current.value.trim();
    const lastName = lastNameRef.current.value.trim();

    if (!email) {
      setErrorMessages({...errorMessages, email: true });
      isValid = false;
    }
    if (!password) {
      setErrorMessages({...errorMessages, password: true });
      isValid = false;
    }
    if (!confirmPassword) {
      setErrorMessages({...errorMessages, confirmPassword: true });
      isValid = false;
    }
    if (!firstName) {
      setErrorMessages({...errorMessages, firstName: true });
      isValid = false;
    }
    if (!lastName) {
      setErrorMessages({...errorMessages, lastName: true });
      isValid = false;
    }
    if (password!== confirmPassword) {
      setErrorMessages({...errorMessages, passwordsDontMatch: true });
      isValid = false;
    }

    if (isValid) {
      const data = {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };

      axios.defaults.withCredentials = true;
      axios
       .post(`${process.env.REACT_APP_BACKEND_URL}/add_new_user`, data)
       .then((response) => {
          console.log("Response: ", response);
          navigate("/login");
        })
       .catch((error) => {
          console.error("Error: ", error);
        });

      setErrorMessages({});
    }
  };

  return (
    <form className="mt-28 p-4 flex max-w-md flex-col gap-4 mx-auto">
      <h1 className="text-2xl font-semibold">Sign up for Hospitalitee</h1>
      {errorMessages.email && (
        <div className="text-red-600">[email] is required*</div>
      )}
      {errorMessages.password && (
        <div className="text-red-600">[password] is required*</div>
      )}
      {errorMessages.confirmPassword && (
        <div className="text-red-600">[confirmPassword] is required*</div>
      )}
      {errorMessages.firstName && (
        <div className="text-red-600">[firstName] is required*</div>
      )}
      {errorMessages.lastName && (
        <div className="text-red-600">[lastName] is required*</div>
      )}
      {errorMessages.passwordsDontMatch && (
        <div className="text-red-600">Passwords do not match.</div>
      )}
      {/* Input fields */}
      {/* Rest of the form */}
    </form>
  );
};

export default SignupPage;
