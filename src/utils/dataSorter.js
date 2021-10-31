import { fetchEvents, fetchForecasts } from "./api";

export const fetchEventAndForecastData = async () => {
  const eventsData = await fetchEvents();
  const filteredEvents = filterAndSortByDate(eventsData);
  const sortedEvents = sortByCity(filteredEvents);
  const featuredCities = getFeaturedCities(sortedEvents);
  console.log("Featured cvities", featuredCities);

  const forecasts = await fetchForecasts(featuredCities);

  return { sortedEvents, forecasts };
};

const filterAndSortByDate = (events) => {
  const FIVE_DAYS_IN_SECONDS = 432000;
  const NOW_IN_SECONDS = Date.now() / 1000;

  console.log("Events in sorter", events);

  const filteredEvents = events
    .filter(
      (event) =>
        event.start.timestamp > NOW_IN_SECONDS &&
        event.start.timestamp - NOW_IN_SECONDS > FIVE_DAYS_IN_SECONDS
    )
    .filter((event) => !event.deleted)
    .filter((event) => !event.cancelled)
    .filter((event) => event.is_physical)
    .filter((event) => event.areas)
    .filter((event) => event.areas[0].title !== "Scotland");

  console.log("filtered events ", filteredEvents);
  return filteredEvents;
};

export const sortByCity = (events) => {
  events.sort((a, b) => {
    let cityA = a.areas[0].title;
    let cityB = b.areas[0].title;

    if (cityA < cityB) {
      return -1;
    }
    if (cityA > cityB) {
      return 1;
    }

    return 0;
  });

  return events;
};

const getFeaturedCities = (events) => {
  const featuredCities = [];

  events.forEach((event) => {
    if (!featuredCities.includes(event.areas[0].title)) {
      featuredCities.push(event.areas[0].title);
    }
  });

  return featuredCities;
};

// export const getForecasts = (featuredCities) => {
//   const getAForecast = async (city) => {
//     const weatherData = await fetchWeather(city);
//     console.log("weather in getWeather", weatherData);

//     return weatherData;
//   };

//   const weatherForecasts = [];
//   featuredCities.forEach((featuredCity) => {
//     console.log("city", featuredCity);
//     const weather = getAForecast(featuredCity);
//     weatherForecasts.push({ featuredCity, weather });
//   });
//   console.log("weather forecasts", weatherForecasts);
//   return weatherForecasts;
// };
