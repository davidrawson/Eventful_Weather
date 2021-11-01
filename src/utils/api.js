import axios from "axios";

export const fetchEvents = async () => {
  const EVENTS_URL =
    "http://localhost:8080/" +
    "https://opentechcalendar.co.uk/api1/events.json";
  const response = await axios.get(EVENTS_URL);

  if (response.status !== 200) {
    throw new Error("Problem getting event data.");
  }

  const data = await response.data.data;

  return data;
};

export const fetchForecasts = async (featuredCities) => {
  const weatherForecasts = [];

  for (let city of featuredCities) {
    const WEATHER_URL =
      "http://localhost:8080/" +
      `${process.env.REACT_APP_MAP_API_URL}${city}&units=metric&appid=${process.env.REACT_APP_MAP_API_KEY}`;

    const response = await axios.get(WEATHER_URL);

    if (response.status !== 200) {
      throw new Error(`Problem getting weather data for ${city}.`);
    }

    if (response.status === 404) {
      console.log("Error city", city);
      throw new Error(`Problem getting weather data for ${city}.`);
    }
    const data = await response.data.list;

    weatherForecasts.push({ city, data });
  }

  return weatherForecasts;
};
