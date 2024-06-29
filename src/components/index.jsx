import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "@tanstack/react-query";
import { debounce } from "lodash";
import { merge } from "@/lib/utils";
import { fetchCurrentLocation, fetchWeather } from "@/lib/api";

import { InitialLoader } from "@/components/ui/initialLoader";
import { InitialError } from "@/components/ui/initialError";
import { Header } from "@/components/header";
import { Dashboard } from "@/components/dashboard";

export const AppContainer = () => {
  const { i18n } = useTranslation("global");
  const lang = i18n.language.split("-")[0];
  const { data, isFetching, error } = useQuery({
    queryKey: ["current-city"],
    queryFn: fetchCurrentLocation,
    refetchOnWindowFocus: false,
  });
  const {
    mutateAsync,
    isPending,
    isError,
    data: weatherData,
  } = useMutation({
    mutationKey: ["weather-data"],
    mutationFn: fetchWeather,
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Set the document language and direction to the user's preferred language
    document.documentElement.lang = lang;
    document.documentElement.dir = i18n.dir(i18n.language);
  }, [i18n, lang]);

  useEffect(() => {
    if (data && data.city && lang && search === "") {
      mutateAsync({ city: data.city, lang });
    }
  }, [data, lang, mutateAsync, search]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchApiData = useCallback(
    debounce((value) => {
      if (value === "") return;
      mutateAsync({ city: value, lang });
    }, 200),
    []
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedFetchApiData(value);
  };

  if (isFetching) return <InitialLoader />;
  if (error) return <InitialError isFetchError />;

  const dashboardProps = {
    isLoading: isPending,
    isError,
    data: weatherData,
  };

  return (
    <div
      className={merge(
        "flex min-h-screen w-full flex-col overflow-hidden bg-gray-100 text-slate-900 dark:bg-slate-900 dark:text-gray-100",
        lang.toLocaleLowerCase() === "ar" ? "font-noto" : "font-macan"
      )}
    >
      <Header search={search} handleSearch={handleSearch} />
      <Dashboard {...dashboardProps} />
    </div>
  );
};
