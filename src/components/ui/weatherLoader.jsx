import { useTranslation } from "react-i18next";

export const WeatherLoader = () => {
  const { t } = useTranslation("global");

  return (
    <main className="flex-1">
      <div className="container h-full">
        <div className="flex h-full flex-col items-center justify-center gap-8">
          <div className="size-20 animate-ping rounded-full bg-gray-800 dark:bg-slate-500" />
          <p className="mt-4 text-center text-lg font-semibold text-gray-800 dark:text-gray-100">
            {t("loading.weather")}
          </p>
        </div>
      </div>
    </main>
  );
};
