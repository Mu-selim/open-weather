export const fetchCurrentLocation = async () => {
  const url = "https://apimk.com/rapidapi/ip?";
  const response = await fetch(url).then((res) => res.json());
  return response;
};

export const fetchWeather = async ({ city, lang }) => {
  const key = import.meta.env.VITE_APP_OPEN_WEATHER_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=${lang}&units=metric`;

  const response = await fetch(url).then((res) => res.json());
  return response;
};
