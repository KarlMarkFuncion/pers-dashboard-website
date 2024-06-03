import AlertPage from "./AlertPage/AlertPage";
import Dashboard from "./Dashboard/Dashboard";
import History from "./History/History"; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
// import AppLayout from "./AppLayout"; 
// import LandingPage from "./LandingPage/LandingPage";
import React, { useEffect } from 'react';
import socket from '../socket';
import Nav from "./reused_elements/Nav/Nav";
import ForgotPasswordPage from "./Login/ForgotPassword";

function App() {

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on('alert', (data) => {
      const { time } = data;
      console.log('Received alert:', data);  // Log the received alert
      window.location.href = `/alerted_pers?time=${encodeURIComponent(time)}`;
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    socket.on('error', (err) => {
      console.error('Socket.IO client error:', err);
    });

    return () => {
      socket.off('connect');
      socket.off('alert');
      socket.off('disconnect');
      socket.off('error');
    };
  }, []);

  // const { isLoggedIn } = useStore();
  return (
    // fit content height 
      <div className="App flex flex-col pb-5">
          {/* Add logged in and logged out states */} 
          <BrowserRouter>
          <Nav />
            <Routes>

              {/* Add logic where if the website is not logged in, make it a login/signup page. And if it's logged in, make it the dashboard of the first PERS device. */}
              
              {/* { isLoggedIn ?  <Route path="/user/dashboard" element={<Dashboard />} /> : <Route path="/" element={<Login />} /> } */}

              <Route path="/" element={<Login />} /> 
              {/* Make several app layouts to reflect logged in and logged out states. */}
              {/* <Route path="/user" element={<AppLayout />}>                */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="alerted_pers" element={<AlertPage />} />
              <Route path="history" element={<History />} />
              {/* </Route>       */}
              <Route path="signup" element={<Signup />} />  
              <Route path="login" element={<Login />} />
              <Route path="forgot_password" element={<ForgotPasswordPage/>} />
            </Routes>
          </BrowserRouter>
      </div> 
  );
}

export default App;
