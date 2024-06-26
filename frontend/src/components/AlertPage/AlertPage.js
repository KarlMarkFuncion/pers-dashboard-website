import LineGraph from "../Dashboard/LineGraph";
import LocationMap from "../reused_elements/LocationMap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'; // if you are using react-router

const AlertPage = () => { 

  const [ currentSensorData, setCurrentSensorData ] = useState([]); 
  const [formattedTime, setFormattedTime] = useState('');
  const location = useLocation(); // to get the current location object

  const formatDate = (date) => {
    const pad = (num) => (num < 10 ? '0' + num : num);
    let hours = date.getHours();
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // Months are zero-indexed
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of year

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = pad(hours);

    return `${hours}:${minutes}:${seconds} ${ampm} ${day}:${month}:${year}`;
  };

  useEffect(() => { 
    const queryParams = new URLSearchParams(location.search);
    const timeParam = queryParams.get('time');
    if (timeParam) {
      const date = new Date(decodeURIComponent(timeParam));
      const formattedDate = formatDate(date);
      setFormattedTime(formattedDate);
    }
    const fetchData = async () =>{
      try {

        const responseData = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getRecentData`
        );
        // const responseHr = await axios.get(
        //   `${process.env.REACT_APP_BACKEND_URL}/getHeartrateById`
        // );
        // const responseOx = await axios.get(
        //   `${process.env.REACT_APP_BACKEND_URL}/getOxidationById`
        // )
        if ( responseData.data) {
          setCurrentSensorData(responseData.data);
          // setCurrentHeartrate(responseHr.data);
          // setCurrentOxidation(responseOx.data); 
          console.log("console log is:")
          console.log(currentSensorData)
        } else {
          setCurrentSensorData([]);
          // setCurrentHeartrate([]);
          // setCurrentOxidation([]);
        }
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }
    fetchData();

    
  // Call fetchData every 1 second
  const intervalId = setInterval(fetchData, 1000);

  // Cleanup function to clear interval when component unmounts or when dependencies change
  return () => {
    clearInterval(intervalId);
  };
  }, [setCurrentSensorData, currentSensorData, location.search]);
  

    return <>
        <div className="p-5 mx-auto grid container h-12 gap-2"> 
            <div className="grid grid-cols-2 h-2/12 pb-3 border-b-2 mb-5">
              <div className="flex gap-2 text-red-600 font-bold">
                <img src="https://picsum.photos/60/60" className="rounded-full h-4/6" alt="patient_profile_picture" />
                <div>
                  <h2 className="text-md">ALERT!  </h2>
                  <h1 className="text-3xl">KM's Pers' EMERGENCY BUTTON HAS BEEN PRESSED</h1>
                </div>
              </div>
              <div className="flex justify-end underline">
                <Link to="/" target="_blank">
                  return to dashboard
                </Link>
              </div>
            </div>
            <div className="flex h-4/12">
              <ul className="w-4/12 px-2 flex-col flex gap-4"> 
                <li>
                  <p>Time Alert was sent: </p>
                  <h3 className="pl-3 text-xl font-bold">{formattedTime}</h3>
                </li>
                {/* <li>
                  <p>Hospital Alerted</p>
                  <h3 className="pl-3 text-xl font-bold">Paranaque Doctor's Hospital</h3>  
                </li>
                <li>
                  <p>Potential cause of Emergency:</p>
                  <h3 className="pl-3 text-xl font-bold">Drastic and prolonged spike in BPM: Possible Cardiac Arrest</h3>
                </li> */}
                <li>
                  <p>Connection status:</p>
                  <h3 className="pl-3 text-xl font-bold">Connected</h3>
                </li>
              </ul>
              <div className="w-8/12 h-1/12">
                <h3 className="text-xl font-bold">Current Location</h3>
                <LocationMap />
                {/* Title spans 1 row, content spans 9 rows */} 
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold">Recent vitals</h3>
              <div className="grid grid-cols-2"> 
              <LineGraph Title={"Heart rate"}  DataName={"heartbeat"} Status={"NORMAL"} Data={currentSensorData}/>
                <LineGraph Title={"Blood Oxidation"} Data={currentSensorData}  DataName={"oxidation"} Status={"NORMAL"}/>
              </div>
            </div>
        </div>
    </>
}

export default AlertPage;