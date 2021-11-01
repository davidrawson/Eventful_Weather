export const trimEvent = (event) => {
  const trimmedEvent = {
    date: event.start.displaylocal,
    city: event.areas[0].title,
    title: event.summary,
    // venue: event.venue.title,
  };
  return trimmedEvent;
};

export const trimForecast = (forecast) => {
  console.log("forecast", forecast);
  const trimmedForecast = {
    temp: forecast.main.temp,
    weather: forecast.weather[0].description,
  };
  return trimmedForecast;
};
