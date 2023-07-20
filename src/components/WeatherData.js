import { Card, CardContent, CardHeader } from "@mui/material";
import React from "react";
import moment from "moment";

export default function WeatherData({ weatherData }) {
  return (
    <Card>
      <CardContent>
        <CardHeader>{weatherData.name}</CardHeader>
        <p>Temprature: {weatherData.main.temp}</p>
        <p>Sunrise: {weatherData.sys.sunrise}</p>
        <p>Sunset: {weatherData.sys.sunset}</p>
        <p>Description: {weatherData.weather[0].description}</p>
        <p>Humidity: {weatherData.main.humidity} %</p>
        <p>Day: {moment().format("dddd")}</p>
        <p>Date: {moment().format("LL")}</p>
      </CardContent>
    </Card>
  );
}
