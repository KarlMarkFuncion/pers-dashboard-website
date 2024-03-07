import LineGraph from "../Dashboard/LineGraph";
import LocationMap from "../reused_elements/LocationMap";
import { Link } from "react-router-dom";
import useStore from "../../store/useStore";
import axios from "axios";
import { useEffect } from "react";

const AlertPage = () => {
  const { setCurrentHeartrate, setCurrentOxidation, currentOxidation, currentHeartrate,  } = useStore();

  useEffect(() => {

    const fetchData = async () =>{
      try {
        const responseHr = await axios.get(
          `http://localhost:4000/getHeartrateById`
        );
        const responseOx = await axios.get(
          `http://localhost:4000/getOxidationById`
        )
    
        setCurrentHeartrate(responseHr.data);
        setCurrentOxidation(responseOx.data); 
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }
    fetchData();
  }, [])
  

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
                <Link to="../dashboard" target="_blank">
                  check alerted page
                </Link>
              </div>
            </div>
            <div className="flex h-4/12">
              <ul className="w-4/12 px-2 flex-col flex gap-4"> 
                <li>
                  <p>Time Alert was sent: </p>
                  <h3 className="pl-3 text-xl font-bold">2:00AM</h3>
                </li>
                <li>
                  <p>Hospital Alerted</p>
                  <h3 className="pl-3 text-xl font-bold">Paranaque Doctor's Hospital</h3>  
                </li>
                <li>
                  <p>Potential cause of Emergency:</p>
                  <h3 className="pl-3 text-xl font-bold">Drastic and prolonged spike in BPM: Possible Cardiac Arrest</h3>
                </li>
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
              <LineGraph Title={"Heart rate"}  DataName={"bpm"} Status={"NORMAL"} Data={currentHeartrate}/>
              <LineGraph Title={"Blood Oxidation"} Data={currentOxidation}  DataName={"oxidation"}Status={"NORMAL"}/>
              </div>
            </div>
        </div>
    </>
}

export default AlertPage;