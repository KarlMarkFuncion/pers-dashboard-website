// import React, { useEffect, useState } from "react";
// import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api"; 

// const AddressMap = () => {
//   const [center, setCenter] = useState({ lat: 37.774929, lng: -122.419416 }); // Default center for the map

//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY_1,
//   });

//   // const address = ${currentListing.addressLine1} ${currentListing.addressLine2} ${currentListing.city} ${currentListing.province} ${currentListing.zipCode}; // Replace with the zip code you want to geocode

//   const address = "PUP Institute of Technology"

//   useEffect(() => {
//     const apiKey = "AIzaSyBaD4CzQYH_Y49HGLhv7ictGRuIZxstoqU ";
//     fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
//       .then((response) => response.json())
//       .then((data) => {
//         const location = data.results[0].geometry.location;
//         setCenter({ lat: location.lat, lng: location.lng });
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }, [address]);

//   if (!isLoaded) return <div>Loading...</div>;

//   return (
//       <GoogleMap
//         mapContainerStyle={{ width: "100%", height: "600px" }}
//         center={center}
//         zoom={15}
//       >
//         <MarkerF position={center} />
        
//       </GoogleMap>
//   );
// };

// export default AddressMap;

import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const AddressMap = () => {
  const [markers, setMarkers] = useState([]);

  const handleMapClick = (event) => {
    setMarkers([...markers, { position: event.latLng, key: Date.now().toString() }]);
  };

  const handleMarkerRightclick = (index) => {
    setMarkers(markers.filter((_, i) => i !== index));
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBaD4CzQYH_Y49HGLhv7ictGRuIZxstoqU">
      <GoogleMap
        id='example-map'
        mapContainerStyle={{ width: '100%', height: '400px' }}
        zoom={8}
        center={{ lat: -34.397, lng:  150.644 }}
        onClick={handleMapClick}
      >
        {markers.map((marker, index) => (
          <Marker
            key={marker.key}
            position={marker.position}
            onRightclick={() => handleMarkerRightclick(index)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default AddressMap;
