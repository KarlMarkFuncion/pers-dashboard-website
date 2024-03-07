import AlertPage from "./AlertPage/AlertPage";
import Dashboard from "./Dashboard/Dashboard";
import Inbox from "./Inbox/Inbox";
import History from "./History/History"; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import AppLayout from "./AppLayout"; 
// import LandingPage from "./LandingPage/LandingPage";

function App() {
  // const { isLoggedIn } = useStore();
  return (
    // fit content height 
      <div className="App flex flex-col pb-5">
          {/* Add logged in and logged out states */} 
          <BrowserRouter>
            <Routes>

              {/* Add logic where if the website is not logged in, make it a login/signup page. And if it's logged in, make it the dashboard of the first PERS device. */}
              
              {/* { isLoggedIn ?  <Route path="/user/dashboard" element={<Dashboard />} /> : <Route path="/" element={<Login />} /> } */}

              <Route path="/" element={<Login />} /> 
              {/* Make several app layouts to reflect logged in and logged out states. */}
              <Route path="/user" element={<AppLayout />}>               
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="alerted_pers" element={<AlertPage />} />
                    <Route path="history" element={<History />} />
              </Route>      
              <Route path="Signup" element={<Signup />} />  
              <Route path="Login" element={<Login />} />
            </Routes>
          </BrowserRouter>
      </div> 
  );
}

export default App;
