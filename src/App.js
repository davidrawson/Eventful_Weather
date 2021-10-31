import { useEffect, useState } from "react";
import "./App.css";
import { fetchEventAndForecastData } from "./utils/dataSorter";

const App = () => {
  const [eventsAndForecasts, setEventsAndForecasts] = useState([]);

  useEffect(() => {
    const getEventsAndForecasts = async () => {
      const eventAndForecastData = await fetchEventAndForecastData();
      // console.log("events in effect", eventData);

      setEventsAndForecasts(eventAndForecastData);
    };
    getEventsAndForecasts();
  }, []);

  console.log("Events and Forecasts in app", eventsAndForecasts);
  return (
    <div className="App">
      <header className="App-header">Eventful Weather</header>
    </div>
  );
};

export default App;
