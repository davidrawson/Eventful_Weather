import { fetchEvents, fetchForecasts } from "./api";

export const fetchEventAndForecastData = async () => {
  const eventsData = await fetchEvents();
  const filteredEvents = filterAndSortByDate(eventsData);
  const sortedEvents = sortByCity(filteredEvents);
  const featuredCities = getFeaturedCities(sortedEvents);

  const forecasts = await fetchForecasts(featuredCities);

  return { sortedEvents, forecasts };
};

const filterAndSortByDate = (events) => {
  const FIVE_DAYS_IN_SECONDS = 432000;
  const NOW_IN_SECONDS = Date.now() / 1000;

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
