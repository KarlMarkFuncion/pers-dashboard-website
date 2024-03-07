"use client";

import { Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import useStore from "../../Store/useStore";
import { useRef, useState } from "react";

const SignupPage = () => {
  const navigate = useNavigate();

  // const { setSuccessMessage } = useStore();
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

    console.log("NEW SIGNUP ATTEMPT");

    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      setErrorMessages({ ...errorMessages, fieldIsEmpty: true });
      isValid = false;
    }
    if (password !== confirmPassword) {
      setErrorMessages({ ...errorMessages, passwordsDontMatch: true });
      isValid = false;
    }

    // ADD DUPLICATE EMAIL VALIDATION

    if (isValid === true) {
      const data = {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,

        // This should be encrypted later on
        password: passwordRef.current.value,
      };

      axios
        .post(`${process.env.BACKEND_URL}/add_new_user`, data)
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
