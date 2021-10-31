import { fetchWeather } from "./api";

export const filterAndSortByDate = (events) => {
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
    .filter((event) => event.areas);

  console.log("filtered events ", filteredEvents);
  return filteredEvents;
};

export const sortByCity = (events) => {
  // There is no evidence that this is working.
  // Sorting on an inconsistently present field is problematic.
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

export const getForecasts = (events) => {
  const featuredCities = [];

  events.forEach((event) => {
    if (!featuredCities.includes(event.areas[0].title)) {
      featuredCities.push(event.areas[0].title);
    }
  });

  const getWeather = async (city) => {
    const eventData = await fetchWeather(city);
    // console.log("weather in getWeather", eventData);

    // setEvents(eventData);
  };
  const weatherForecasts = [];
  featuredCities.forEach((featuredCity) => {
    console.log(featuredCity);
    const weather = getWeather(featuredCity);
    weatherForecasts.push({ featuredCity, weather });
  });

  return { events, weatherForecasts };
};
