import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "@tanstack/react-query";
import { debounce } from "lodash";
import { merge } from "@/lib/utils";
import { fetchCurrentLocation, fetchWeather } from "@/lib/api";

import { InitialLoader } from "@/components/ui/initialLoader";
import { InitialError } from "@/components/ui/initialError";
import { Header } from "@/components/header";

export const AppContainer = () => {
  const { i18n } = useTranslation("global");
  const lang = i18n.language.split("-")[0];
  const { data, isFetching, error } = useQuery({
    queryKey: ["current-city"],
    queryFn: fetchCurrentLocation,
    refetchOnWindowFocus: false,
  });
  const { mutateAsync, data: weatherData } = useMutation({
    mutationKey: ["weather-data"],
    mutationFn: fetchWeather,
  });
  const [search, setSearch] = useState("");

  console.log(weatherData);

  useEffect(() => {
    // Set the document language and direction to the user's preferred language
    document.documentElement.lang = lang;
    document.documentElement.dir = i18n.dir(i18n.language);
  }, [i18n, lang]);

  useEffect(() => {
    if (data && data.city && lang) {
      // mutateAsync({ city: data.city, lang });
    }
  }, [data, lang, mutateAsync]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchApiData = useCallback(
    debounce((value) => mutateAsync({ city: value, lang }), 200),
    []
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedFetchApiData(value);
  };

  if (isFetching) return <InitialLoader />;
  if (error) return <InitialError isFetchError />;
  return (
    <div
      className={merge(
        "h-screen w-full overflow-hidden bg-gray-100 text-slate-900 dark:bg-slate-900 dark:text-gray-100",
        lang.toLocaleLowerCase() === "ar" ? "font-noto" : "font-macan"
      )}
    >
      <Header search={search} handleSearch={handleSearch} />
    </div>
  );
};
