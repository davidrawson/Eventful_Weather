import { useEffect, useState } from "react";
import "./App.css";
import { fetchEvents, fetchWeather } from "./utils/api";
import {
  filterAndSortByDate,
  sortByCity,
  getWeather,
  getForecasts,
} from "./utils/dataSorter";

const App = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const eventData = await fetchEvents();
      // console.log("events in effect", eventData);

      setEvents(eventData);
    };
    getEvents();
  }, []);

  // console.log("events in App", events);
  const filteredEvents = filterAndSortByDate(events);

  const citySortedEvents = sortByCity(filteredEvents);

  const { sortedEvents, weather } = getForecasts(citySortedEvents);

  return (
    <div className="App">
      <header className="App-header">Eventful Weather</header>
    </div>
  );
};

export default App;
