import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  LoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { Card, Container, TextField } from "@mui/material";

const Map = () => {
  const [map, setMap] = useState();
  const [searchBox, setSearchBox] = useState();
  const [markers, setMarkers] = useState([]);

  const position = {
    lat: -22.834394,
    lng: -47.052813,
  };

  const onMapLoad = (map) => {
    setMap(map);
  };

  const onLoad = (ref) => {
    console.log("Search box loaded:", ref);
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    const place = places[0];
    const location = {
      lat: place.geometry.location.lat() || 0,
      lng: place.geometry.location.lng() || 0,
    };
    setMarkers([...markers, location]);
    map.panTo(location);
  };

  return (
    <Container sx={{ mt: "20px", justifyContent: "center", ml: 40 }}>
      <Card sx={{ width: "1000px", height: "200px", borderRadius: "10px" }}>
        <LoadScript googleMapsApiKey="" libraries={["places"]}>
          <GoogleMap
            onLoad={onMapLoad}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={position}
            zoom={15}
          >
            <StandaloneSearchBox
              onLoad={onLoad}
              onPlacesChanged={onPlacesChanged}
            >
              <TextField
                label="Digite um endereço"
                variant="outlined"
                sx={{
                  ml: "250px",
                  mt: "10px",
                  width: "500px",
                }}
              />
            </StandaloneSearchBox>
            {markers.map((marker, index) => (
              <Marker key={index} position={marker} />
            ))}
          </GoogleMap>
        </LoadScript>
      </Card>
    </Container>
  );
};
export default Map;
