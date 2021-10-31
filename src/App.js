import { useEffect, useState } from "react";
import "./App.css";
import { fetchEventAndForecastData } from "./utils/dataSorter";
import { trimEvent, trimForecast } from "./utils/eventAndForecastEditor";

const App = () => {
  const [events, setEvents] = useState([]);
  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    const getEventsAndForecasts = async () => {
      const eventAndForecastData = await fetchEventAndForecastData();
      // console.log("events in effect", eventData);

      setEvents(eventAndForecastData.sortedEvents);
      setForecasts(eventAndForecastData.forecasts);
    };
    getEventsAndForecasts();
  }, []);

  console.log("Events and Forecasts in app", events);
  console.log("Events and Forecasts in app", forecasts);

  for (let event of events) {
    console.log("here", event);
    const trimmedEvent = trimEvent(event);
    const weather = forecasts.find(
      (element) => element.city === trimmedEvent.city
    );
    console.log("Found weather", weather);
  }
  // const container: HTMLElement | any = document.getElementById("app");
  // const showEvent = () => {
  //   let output = `
  //     <div class="card" id="card">
  //       <span class="card--id">#${pokemon.id}</span>
  //       <img class="card--image" src=${pokemon.image} alt=${pokemon.name}></img>
  //       <h1 class="card--name>${pokemon.name}</h1>
  //       <span class="card--details">${pokemon.type}</span>
  //     </div>`;

  //   container.innerHTML += output;
  // };
  return (
    <div className="App">
      <header className="App-header">Eventful Weather</header>
    </div>
  );
};

export default App;
