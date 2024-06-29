import propTypes from "prop-types";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { fetchWeather } from "@/lib/api";
import { responseSchema } from "@/schemas/apiResponse";

import { WeatherLoader } from "@/components/ui/weatherLoader";
import { WeatherError } from "@/components/ui/weatherError";

import { weatherStatusIconsMap, isDayLight, temperatureIconMap, dateHoursAndMinutes } from "@/lib/weatherStatus";
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
                  <span>{city.name}, {city.country}</span>
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
              
            </div>
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
  data: propTypes.shape(responseSchema),
};
