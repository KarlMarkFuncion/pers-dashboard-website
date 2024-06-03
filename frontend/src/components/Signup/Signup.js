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
      setErrorMessages(prevState => ({...prevState, email: true }));
      isValid = false;
    }
    if (!password) {
      setErrorMessages(prevState => ({...prevState, password: true }));
      isValid = false;
    }
    if (!confirmPassword) {
      setErrorMessages(prevState => ({...prevState, confirmPassword: true }));
      isValid = false;
    }
    if (!firstName) {
      setErrorMessages(prevState => ({...prevState, firstName: true }));
      isValid = false;
    }
    if (!lastName) {
      setErrorMessages(prevState => ({...prevState, lastName: true }));
      isValid = false;
    }
    if (password!== confirmPassword) {
      setErrorMessages(prevState => ({...prevState, passwordsDontMatch: true }));
      isValid = false;
    }

      // Filter for numeric input in names
      if (/[\d]/.test(firstName)) {
        setErrorMessages(prevState => ({...prevState, invalidFirstName: true }));
        isValid = false;
      }
      if (/[\d]/.test(lastName)) {
        setErrorMessages(prevState => ({...prevState, invalidLastName: true }));
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
    <form className="mt-12 p-4 flex max-w-md flex-col gap-4 mx-auto">
      <h1 className="text-2xl font-semibold">Sign up for Hospitalitee</h1>
      {errorMessages.fieldIsEmpty ? (
        <div
          class=" p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span class="font-medium">One or more fields are empty. </span>
          Please fill in all input fields
        </div>
      ) : (
        <></>
      )}
      <div>
        <div className="mb-2 block">
          <Label value="First name" />
        </div>
        <TextInput
          ref={firstNameRef}
          placeholder="First name"
          required
          shadow
          type="text"
        />
        {errorMessages.firstName && (
        <div className="text-red-600">[firstName] is required*</div>
      )}
      {errorMessages.invalidFirstName && (
        <div className="text-red-600">Invalid characters in first name. Only letters allowed.</div>
      )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label value="Last name" />
        </div>
        <TextInput
          ref={lastNameRef}
          placeholder="Last name"
          required
          shadow
          type="text"
        />
        {errorMessages.lastName && (
        <div className="text-red-600">[lastName] is required*</div>
      )}
      {errorMessages.invalidLastName && (
        <div className="text-red-600">Invalid characters in last name. Only letters allowed.</div>
      )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label value="Your email" />
        </div>
        <TextInput
          ref={emailRef}
          required
          shadow
          type="email"
          placeholder="Email"
        />
        {errorMessages.email && (
        <div className="text-red-600">[email] is required*</div>
      )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password2" value="Your password" />
        </div>
        <TextInput
          ref={passwordRef}
          required
          shadow
          placeholder="Password"
          type="password"
        />
        {errorMessages.password && (
        <div className="text-red-600">[password] is required*</div>
      )}
      </div>
      {/* Success message */}
      {errorMessages.passwordsDontMatch ? (
        <div
          class=" p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span class="font-medium">Passwords do not match. </span>
          Please check your passwords field
        </div>
      ) : (
        <></>
      )}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="repeat-password" value="Confirm password" />
        </div>
        <TextInput
          ref={confirmPasswordRef}
          required
          shadow
          placeholder="Confirm Password"
          type="password"
        />
        {errorMessages.confirmPassword && (
        <div className="text-red-600">[confirmPassword] is required*</div>
      )}
      </div>
      
      <Link className="text-sm to-blue-800 underline" to="/login">
        Already have an account? Log in
      </Link>
      <Button
        onClick={(e) => {
          handleSubmit(e);
        }}
        type="submit"
      >
        Sign Up
      </Button>
    </form>
  );
};

export default SignupPage;
