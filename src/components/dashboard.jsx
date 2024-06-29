import propTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { WeatherLoader } from "@/components/ui/weatherLoader";
import { WeatherError } from "@/components/ui/weatherError";

import { temperatureIconMap, getMonthAndDayName } from "@/lib/weatherStatus";
import { MapPin, Sun, Moon, ContactRound } from "lucide-react";

export const Dashboard = ({ isLoading, isError, data }) => {
  const { t } = useTranslation("global");
  console.log(isLoading, isError, data);

  if (isLoading) return <WeatherLoader />;
  if (isError) return <WeatherError />;

  if (data && data.cod >= 400) return <WeatherError cod={data.cod} />;

  if (data) {
    const { list, city } = data;
    const now = list[0];

    // Group data by date for the next 5 days
    const dailyData = {};

    list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0]; // Extract date (YYYY-MM-DD)
      if (!dailyData[date]) {
        dailyData[date] = [];
      }
      dailyData[date].push(item);
    });

    // Convert dailyData object to an array of days (considering only 5 days)
    const forecastDays = Object.keys(dailyData)
      .slice(0, 5)
      .map((date) => {
        const dayData = dailyData[date][0];
        return {
          date: date,
          temperature: dayData.main.temp,
          description: dayData.weather[0].description,
          icon: temperatureIconMap(dayData.main.temp),
        };
      });

    return (
      <main className="flex-1 py-4">
        <div className="container flex h-full gap-6">
          <div className="h-full w-80 space-y-4">
            <div className="w-full space-y-4 rounded-xl bg-gray-300/70 px-4 py-6 dark:bg-slate-800">
              <div>
                <h2 className="font-semibold">{t("wearther.now")}</h2>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 font-bold">
                    <span className="text-4xl">{now.main.temp}</span>
                    <span className="select-none text-2xl">{t("weather.dgree")}</span>
                  </span>
                  <img
                    src={temperatureIconMap(now.main.temp)}
                    alt="weather icon"
                    className="pointer-events-none size-20 select-none"
                  />
                </div>
                <p className="capitalize">{now.weather[0].description}</p>
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
            <div className="">
              <h2 className="font-semibold">{t("weather.fiveDays")}</h2>
            </div>
            <div className="w-full space-y-4 rounded-xl bg-gray-300/70 px-4 py-6 dark:bg-slate-800">
              {forecastDays.map((day) => {
                const { month, day: dayName, dayNumber } = getMonthAndDayName(day.date);

                return (
                  <div key={day} className="grid grid-cols-3 items-center gap-4 py-2">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <img src={day.icon} alt="weather icon" className="pointer-events-none size-6 select-none" />
                      <span className="text-sm">
                        {day.temperature.toFixed(1)} {t("weather.dgree")}
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
          <div className="flex-1 h-full bg-gray-300/70 dark:bg-slate-800 rounded-xl px-4 py-6">
            <h2 className="font-semibold text-xl">{t("weather.today.details")}</h2>
          </div>
        </div>
      </main>
    );
  }
  return null;
};

Dashboard.propTypes = {
  isLoading: propTypes.bool,
  isError: propTypes.bool,
  data: propTypes.object,
};
