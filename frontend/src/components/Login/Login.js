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
        {emailError && <p className="text-red-600">{emailError}</p>} {/* Display email error */}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" />
        </div>
        <TextInput ref={passwordRef} required type="password" />
        {passwordError && <p className="text-red-600">{passwordError}</p>} {/* Display password error */}
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


// "use client";

// import { Button, Label, TextInput } from "flowbite-react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useRef } from "react";
// import useStore from "../../store/useStore";
// const LoginPage = () => {
//   const navigate = useNavigate();

//   const { setCurrentUser } = useStore();

//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = {
//       email: emailRef.current.value,
//       password: encodeURIComponent(passwordRef.current.value),
//     };

//     try {
//       const response = await axios.get(
//         // console.log(process.env.REACT_BACKEND_URL)
//         `${process.env.REACT_APP_BACKEND_URL}/get_user_login/${data.email}/${data.password}`
//       );

//       setCurrentUser(response.data);
//       navigate("/user/dashboard");

//     } catch (error) {
//       console.log("Error fetching data: ", error);
//     }
//   };
//   return (
//     <form className="mt-32 p-4 flex max-w-md flex-col gap-4 mx-auto">
//       <h1 className="text-2xl font-semibold">Log into your Account</h1>
//       <div>
//         <div className="mb-2 block">
//           <Label htmlFor="login_email" value="Your email" />
//         </div> 
//         <TextInput ref={emailRef} required type="email" />
//       </div>
//       <div>
//         <div className="mb-2 block">
//           <Label htmlFor="password" value="Password" />
//         </div>
//         <TextInput ref={passwordRef} required type="password" />
//       </div>
//       <Link className="text-sm to-blue-800 underline" to="/signup">
//         Don't have an account? Sign up!
//       </Link>
//       <Button onClick={(e) => handleSubmit(e)} type="submit">
//         Submit
//       </Button>
//     </form>
//   );
// };

// export default LoginPage;
