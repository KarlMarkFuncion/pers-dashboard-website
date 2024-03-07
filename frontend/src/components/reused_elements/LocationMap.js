import React, { useEffect, useState } from "react";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
// import useStore from "../../Store/useStore";

const AddressMap = () => {
  const [center, setCenter] = useState({ lat: 37.774929, lng: -122.419416 }); 

  const apiKey = "AIzaSyBaD4CzQYH_Y49HGLhv7ictGRuIZxstoqU"
  const { isLoaded } = useLoadScript({googleMapsApiKey: apiKey});
 
  const address = "Polytechnic University of the Philippines Sta. Mesa"

  useEffect(() => {
    const apiKey = "AIzaSyBaD4CzQYH_Y49HGLhv7ictGRuIZxstoqU";
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const location = data.results[0].geometry.location;
        setCenter({ lat: location.lat, lng: location.lng });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [address]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "600px" }}
        center={center}
        zoom={15}
      >
        <MarkerF position={center} />
      </GoogleMap>
    </div>
  );
};

export default AddressMap;
