import { trimEvent, trimForecast } from "./eventAndForecastEditor";
import { getClosestForecast } from "./getClosestForecast";

export const assignForecastToEvent = ({ events, forecasts }) => {
  console.log("here1", events);
  // Serious async issue - WE DON"T HAVE EVENTS< AAAAARGH
  // sigh, promises, promises.
  const formattedEventsWithForecast = [];

  for (let event of events) {
    const trimmedEvent = trimEvent(event);
    const cityForecast = forecasts.find(
      (element) => element.city === trimmedEvent.city
    );
    const closestCityForecast = getClosestForecast(event, cityForecast);
    const trimmedForecast = trimForecast(closestCityForecast);

    formattedEventsWithForecast.push({
      event: trimmedEvent,
      forecast: trimmedForecast,
    });
  }

  return formattedEventsWithForecast;
};
