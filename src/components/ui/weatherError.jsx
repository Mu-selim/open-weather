import propTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { UndrawWeatherApp } from "@/components/svg/undrawWeatherApp";

const mapErrorCode = {
  400: "weather.error.badRequest",
  401: "weather.error.unauthorized",
  402: "weather.error.paymentRequired",
  403: "weather.error.forbidden",
  404: "weather.error.cityNotFound",
  500: "weather.error.internalServerError",
};

export const WeatherError = ({ cod }) => {
  const { t } = useTranslation("global");
  const message = mapErrorCode[cod];
  console.log(cod);

  return (
    <div className="bg-gray-100 dark:bg-slate-900 sm:gap-8">
      <div className="container flex h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden">
        <UndrawWeatherApp className="w-64" />
        <h2 className="text-pretty text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
          {message ? t(message) : t("weather.error.default")}
        </h2>
      </div>
    </div>
  );
};

WeatherError.propTypes = {
  cod: propTypes.number,
};
