export const getClosestForecast = (event, forecast) => {
  const eventStart = event.start.timestamp;
  const forecastTimestamps = [];

  for (let i = 0; i < forecast.data.length(); i++) {
    forecastTimestamps.push(forecast.data.dt);
  }

  var closest = forecastTimestamps.reduce(function (prev, curr) {
    return Math.abs(curr - eventStart) < Math.abs(prev - eventStart)
      ? curr
      : prev;
  });

  const closestForecast = forecast.data.dt.find(
    (element) => element === closest
  );

  return closestForecast;
};
