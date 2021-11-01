import { useEffect, useState } from "react";
import "./App.css";
import { fetchEventAndForecastData } from "./utils/dataSorter";
import EventCard from "./Components/EventCard";
import { assignForecastToEvent } from "./utils/assignForecastToEvent";

const App = () => {
  // const [events, setEvents] = useState([]);
  const [forecasts, setForecasts] = useState([]);
  const [formattedEvents, setFormattedEvents] = useState([]);

  useEffect(() => {
    const getEventsAndForecasts = async () => {
      const eventAndForecastData = await fetchEventAndForecastData();

      const formattedEvents = assignForecastToEvent(eventAndForecastData);

      // setEvents(eventAndForecastData.sortedEvents);
      setForecasts(eventAndForecastData.forecasts);
      setFormattedEvents(formattedEvents);
    };
    getEventsAndForecasts();
  }, []);

  if (forecasts.length > 1) return <div>Forecast not yet fulfilled</div>;

  return (
    <div className="App">
      <header className="App-header">Eventful Weather</header>
      {/* map event object to the EventCard component here */}
      {formattedEvents === 0 ? <p>No events found</p> : null}
      {formattedEvents.map((element) => (
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
