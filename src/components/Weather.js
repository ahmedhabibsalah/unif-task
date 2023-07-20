import React, { useEffect, useState } from "react";
import WeatherData from "./WeatherData";

export default function Weather() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(
        `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      ).then((result) => {
        setData(result);
        console.log(result.json());
      });
    };
    fetchData();
  }, [lat, long]);
  return (
    <div className="App">
      {typeof data.main != "undefined" ? (
        <WeatherData weatherData={data} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
