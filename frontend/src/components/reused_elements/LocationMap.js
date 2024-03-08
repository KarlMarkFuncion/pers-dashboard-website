import React, { useEffect, useState } from "react";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
// import useStore from "../../Store/useStore";

const AddressMap = () => {
  const [center, setCenter] = useState({ lat: 37.774929, lng: -122.419416 }); 

  const apiKey = process.env.REACT_GMAPS_API_KEY;
  const { isLoaded } = useLoadScript({googleMapsApiKey: apiKey});
 
  const address = "Polytechnic University of the Philippines Sta. Mesa"

  useEffect(() => {
    if (!isLoaded) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
        );
        const data = await response.json();
        const location = data.results[0].geometry.location;
        setCenter({ lat: location.lat, lng: location.lng });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
 }, [isLoaded, address, apiKey]);

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
