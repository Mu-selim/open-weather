import { useTranslation } from "react-i18next";
import { UndrawWeatherApp } from "@/components/svg/undrawWeatherApp";

export const InitialError = () => {
  const { t } = useTranslation("global");

  return (
    <div className="bg-gray-100 dark:bg-slate-900 sm:gap-8">
      <div className="container flex h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden">
        <UndrawWeatherApp className="w-64" />
        <h2 className="text-pretty text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
          {t("initialError.fetchError")}
        </h2>
      </div>
    </div>
  );
};
