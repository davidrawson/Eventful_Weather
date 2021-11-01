const EventCard = (event, forecast) => {
  return (
    <div class="card" id="card">
      <span class="card--date">#${event.date}</span>
      <h1 class="card--city">${event.city}</h1>
      <span class="card--title">${event.title}</span>
      <h1 class="card--venue">${event.venue}</h1>
      <h2 class="card--temp">${forecast.temp}</h2>
      <h2 class="card--description">${forecast.description}</h2>
    </div>
  );
};

export default EventCard;
