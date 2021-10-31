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

export const fetchWeather = async (city) => {
  // console.log(city);
  // const weatherReports = [];
  const WEATHER_URL =
    "http://localhost:8080/" +
    `${process.env.REACT_APP_MAP_API_URL}${city}&appid=${process.env.REACT_APP_MAP_API_KEY}`;

  const response = await axios.get(WEATHER_URL);

  if (response.status !== 200) {
    throw new Error(`Problem getting weather data for ${city}.`);
  }

  const data = await response.data.data;
  console.log("data ", data);

  return data;
  // const fetchData = async () => {
  //   await fetch(
  //     `${process.env.REACT_MAP_API_URL}${city}&appid=${process.env.REACT_MAP_API_KEY}`
  //   )
  //     .then((res) => res.json())
  //     .then((result) => {
  //       // setData(result);
  //       console.log(result);
  //     });
  // };
  // fetchData();
};
