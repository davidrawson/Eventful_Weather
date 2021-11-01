import { useEffect, useState } from "react";
import "./App.css";
import { fetchEventAndForecastData } from "./utils/dataSorter";
import { trimEvent, trimForecast } from "./utils/eventAndForecastEditor";
import { getClosestForecast } from "./utils/getClosestForecast";
import EventCard from "./Components/EventCard";

const App = () => {
  const [events, setEvents] = useState([]);
  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    const getEventsAndForecasts = async () => {
      const eventAndForecastData = await fetchEventAndForecastData();
      // console.log("events in effect", eventData);

      setEvents(eventAndForecastData.sortedEvents);
      setForecasts(eventAndForecastData.forecasts);
      console.log("forecast inEffect", eventAndForecastData.forecasts);
      console.log("event inEffect", eventAndForecastData.sortedEvents);
    };
    getEventsAndForecasts();
  }, [events]);

  console.log("Events in app", events);
  console.log("Forecasts in app", forecasts);

  const formattedEventsWithForecast = [];
  for (let event of events) {
    // console.log("here", event);
    const trimmedEvent = trimEvent(event);
    const cityForecast = forecasts.find(
      (element) => element.city === trimmedEvent.city
    );
    console.log("Found weather", cityForecast);
    // you have the forecasts
    // get date from event, get forecast for that date
    const closestCityForecast = getClosestForecast(cityForecast);
    // forecast is every 3 hours
    const trimmedForecast = trimForecast(closestCityForecast);
    console.log("Trimmed forecast", trimmedForecast);

    formattedEventsWithForecast.push({
      event: trimmedEvent,
      forecast: trimmedForecast,
    });
  }

  return (
    <div className="App">
      <header className="App-header">Eventful Weather</header>
      {/* {formattedEventsWithForecast === 0 ? <p>No events found</p> : null} */}
      {formattedEventsWithForecast.map((element) => (
        <EventCard
          key={element.event.title}
          forecast={element.forecast}
          event={element.event}
        />
      ))}
    </div>
  );
};

export default App;
