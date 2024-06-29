import propTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { WeatherLoader } from "@/components/ui/weatherLoader";
import { WeatherError } from "@/components/ui/weatherError";

import {
  temperatureIconMap,
  getMonthAndDayName,
  timestampsToTimeAmAndPm,
  weatherStatusIconsMap,
} from "@/lib/weatherStatus";
import { MapPin, Sun, Moon, ContactRound, Wind, Droplets, Eye } from "lucide-react";

export const Dashboard = ({ isLoading, isError, data }) => {
  const { t } = useTranslation("global");

  if (isLoading) return <WeatherLoader />;
  if (isError) return <WeatherError />;

  if (data && data.cod >= 400) return <WeatherError cod={data.cod} />;

  if (data) {
    const { list, city } = data;
    // sort the list by dt
    list.sort((a, b) => a.dt - b.dt);

    // get the weather for the next 5 days
    const fiveDaysWeather = [];
    for (let i = 0; i < list.length; i += 8) {
      // get the array item with the highest temperature in each day
      const day = list.slice(i, i + 8).reduce((acc, curr) => (acc.main.temp > curr.main.temp ? acc : curr));
      fiveDaysWeather.push(day);
    }

    // get the weather for the next 24 hours
    const dayWeather = list.slice(0, 8);

    // get the current weather based on the current time
    const currentTime = new Date().getTime();
    const currentWeather = list.find((item) => item.dt * 1000 >= currentTime);

    return (
      <main className="flex-1 py-4">
        <div className="container flex h-full flex-col gap-6 md:flex-row">
          <div className="flex h-full flex-col gap-4 sm:flex-row md:w-80 md:flex-col">
            <div className="space-y-4 rounded-xl bg-gray-300/70 px-4 py-6 dark:bg-slate-800 md:basis-full">
              <div>
                <h2 className="font-semibold">{t("wearther.now")}</h2>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 font-bold">
                    <span className="text-4xl">{currentWeather.main.temp}</span>
                    <span className="select-none text-2xl">{t("weather.dgree")}</span>
                  </span>
                  <img
                    src={temperatureIconMap(currentWeather.main.temp)}
                    alt="weather icon"
                    className="pointer-events-none size-20 select-none"
                  />
                </div>
                <p className="capitalize">{currentWeather.weather[0].description}</p>
              </div>
              <div className="h-0.5 w-full bg-gray-400 dark:bg-slate-700"></div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="size-5" />
                  <span>
                    {city.name}, {city.country}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <ContactRound className="size-5" />
                  <span>
                    {city.population} {t("weather.population")}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-4 rounded-xl bg-gray-300/70 px-4 py-6 dark:bg-slate-800">
              <h2 className="font-semibold">{t("weather.fiveDays")}</h2>
              <div className="w-full space-y-4">
                {fiveDaysWeather.map((day) => {
                  const { month, day: dayName, dayNumber } = getMonthAndDayName(day.dt * 1000);

                  return (
                    <div key={day.dt} className="grid grid-cols-3 items-center gap-4 py-2">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <img
                          src={temperatureIconMap(day.main.temp)}
                          alt="weather icon"
                          className="pointer-events-none size-6 select-none"
                        />
                        <span className="text-sm">
                          {day.main.temp.toFixed(1)} {t("weather.dgree")}
                        </span>
                      </div>
                      <span className="text-end text-xs">
                        {dayNumber} {t(`month.${month}`)}
                      </span>
                      <span className="text-end text-xs">{t(`day.${dayName}`)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="rounded-xl bg-gray-300/70 px-4 pt-6 dark:bg-slate-800">
              <h2 className="text-xl font-semibold">{t("weather.today.details")}</h2>
              <div className="grid grid-cols-1 gap-6 py-4 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                <div className="w-full space-y-2 rounded-lg bg-gray-400/30 p-4 dark:bg-slate-700/70 xs:col-span-2">
                  <h3 className="font-semibold capitalize">
                    {t("weather.sunrise")} & {t("weather.sunset")}
                  </h3>
                  <div className="flex flex-col gap-4 xs:flex-row xs:items-center">
                    <div className="flex items-center gap-2">
                      <Sun className="size-10" />
                      <div className="flex flex-col">
                        <span className="text-xs capitalize">{t("weather.sunrise")}</span>
                        <span className="whitespace-nowrap">{timestampsToTimeAmAndPm(city.sunrise, true)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Moon className="size-10" />
                      <div className="flex flex-col">
                        <span className="text-xs capitalize">{t("weather.sunset")}</span>
                        <span className="whitespace-nowrap">{timestampsToTimeAmAndPm(city.sunset, true)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full space-y-2 rounded-lg bg-gray-400/30 p-4 dark:bg-slate-700/70">
                  <h3 className="font-semibold capitalize">{t("weather.wind")}</h3>
                  <div className="flex items-center gap-4">
                    <Wind className="size-10" />
                    <div className="flex flex-col">
                      <span className="text-xs capitalize">{t("weather.wind.speed")}</span>
                      <span className="whitespace-nowrap">
                        {currentWeather.wind.speed} {t("weather.wind.unit")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full space-y-2 rounded-lg bg-gray-400/30 p-4 dark:bg-slate-700/70">
                  <h3 className="font-semibold capitalize">{t("weather.humidity")}</h3>
                  <div className="flex items-center gap-4">
                    <Droplets className="size-10" />
                    <div className="flex flex-col">
                      <span className="text-xs capitalize">{t("weather.humidity")}</span>
                      <span className="whitespace-nowrap">{currentWeather.main.humidity} %</span>
                    </div>
                  </div>
                </div>
                <div className="w-full space-y-2 rounded-lg bg-gray-400/30 p-4 dark:bg-slate-700/70">
                  <h3 className="font-semibold capitalize">{t("weather.visibility")}</h3>
                  <div className="flex items-center gap-4">
                    <Eye className="size-10" />
                    <div className="flex flex-col">
                      <span className="text-xs capitalize">{t("weather.visibility")}</span>
                      <span className="whitespace-nowrap">
                        {currentWeather.visibility / 1000} {t("weather.visibility.unit")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-semibold">{t("weather.24")}</h2>
                <div className="grid grid-cols-1 gap-4 py-4 xs:grid-cols-2 md:grid-cols-4 xl:grid-cols-8">
                  {dayWeather.map((time) => {
                    return (
                      <div
                        key={time.dt}
                        className="flex flex-col items-center gap-2 rounded-lg bg-gray-400/30 p-4 dark:bg-slate-700/70"
                      >
                        <span className="text-xs">{timestampsToTimeAmAndPm(time.dt)}</span>
                        <img
                          src={temperatureIconMap(time.main.temp)}
                          alt="weather icon"
                          className="pointer-events-none size-10 select-none"
                        />
                        <span className="flex flex-wrap items-center justify-center whitespace-nowrap text-xs">
                          <span>{time.main.temp.toFixed(1)}</span>
                          <span>{t("weather.dgree")}</span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{t("weather.wind")}</h2>
              <div className="grid grid-cols-1 gap-4 py-4 xs:grid-cols-2 md:grid-cols-4 xl:grid-cols-8">
                {dayWeather.map((time) => {
                  return (
                    <div
                      key={time.dt}
                      className="flex flex-col items-center gap-2 rounded-lg bg-gray-400/30 p-4 dark:bg-slate-700/70"
                    >
                      <span className="text-xs">{timestampsToTimeAmAndPm(time.dt)}</span>
                      <img
                        src={weatherStatusIconsMap["direction"]}
                        alt="weather icon"
                        className="pointer-events-none size-10 select-none"
                        style={{ transform: `rotate(${time.wind.deg}deg)` }}
                      />
                      <span className="flex flex-wrap items-center justify-center whitespace-nowrap text-xs">
                        <span>{time.wind.speed}</span>
                        <span>{t("weather.wind.unit")}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
  return <WeatherError />;
};

Dashboard.propTypes = {
  isLoading: propTypes.bool,
  isError: propTypes.bool,
  data: propTypes.object,
};
