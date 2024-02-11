import React from "react";
import { Alert, Button } from "@material-tailwind/react";
 
function Icon({ patient_photo }) {
  return (
    <>
        <img src="https://picsum.photos/60/60" className="rounded-full" alt="patient_profile_picture" />
    </>
  );
}
 

// Types of alert : 1. Caution, BPM spiked/Oxidation dropped 2. Alert, BPM has been high for 30 seconds. 3. Hospitals have been alerted.
export default function Notification() {
 
  return (
    <>
      <Alert
        variant="outlined"
        icon={<Icon />}
      >
        <h3 className="text-xl bold">
            KM's Pers online
            {/* Add notif title here */}
        </h3>

        {/* add message here */}
        Km's Pers has been activated and is now taking data
      </Alert>
    </>
  );
}