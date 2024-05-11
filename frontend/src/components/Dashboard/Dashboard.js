import LineGraph from "../Dashboard/LineGraph";
import LocationMap from "../reused_elements/LocationMap";
import { Link } from "react-router-dom";
import useStore from "../../store/useStore";
import axios from "axios";
import { useEffect } from "react";

const Dashboard =  () => {
  const {   currentUser, setCurrentSensorData, currentSensorData} = useStore();

  useEffect(() => {

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
  }, [setCurrentSensorData]);
  

  return <>
      <div className="p-5 mx-auto grid container h-fill gap-2"> 
          <div className="grid grid-cols-2 h-2/12">
            <div className="flex gap-2">
              <img src="https://picsum.photos/60/60" className="rounded-full h-4/6" alt="patient_profile_picture" />
              <div>
                <h2 className="text-md">DASHBOARD</h2>
                <h1 className="text-3xl">{currentUser.firstName}'s Pers</h1>
              </div>
            </div>
            <div className="flex justify-end underline">
              <Link to="../alerted_pers" target="_blank">
                check alerted page
              </Link>
            </div>
          </div>
          <div className="grid gap-5">
            <div className="grid grid-cols-2 gap-3">
                <LineGraph Title={"Heart rate"}  DataName={"heartbeat"} Status={"NORMAL"} Data={currentSensorData}/>
                <LineGraph Title={"Blood Oxidation"} Data={currentSensorData}  DataName={"oxidation"} Status={"NORMAL"}/>
            </div>
            <div>
                {/* Ok, gotta get my API key from an old project first. For now I'll place a line graph here uwu */}
                <LocationMap />
            </div>

            <div>
              {currentSensorData}
            </div>
          </div>
      </div>
  </>
}

export default Dashboard