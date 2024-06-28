import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

import { merge } from "@/lib/utils";
import { InitialLoader } from "@/components/ui/initialLoader";
import { InitialError } from "@/components/ui/initialError";
import { Header } from "@/components/header";

export const AppContainer = () => {
  const { i18n } = useTranslation("global");
  const lang = i18n.language.split("-")[0];
  const { data, isFetching, error } = useQuery({
    queryKey: ["current-city"],
    queryFn: () => fetch("https://apimk.com/rapidapi/ip?").then((res) => res.json()),
    refetchOnWindowFocus: false,
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Set the document language and direction to the user's preferred language
    document.documentElement.lang = lang;
    document.documentElement.dir = i18n.dir(i18n.language);
  }, [i18n, lang]);

  if (isFetching) return <InitialLoader />;
  if (error) return <InitialError isFetchError />;
  return (
    <div
      className={merge(
        "h-screen w-full overflow-hidden bg-gray-100 text-slate-900 dark:bg-slate-900 dark:text-gray-100",
        lang.toLocaleLowerCase() === "ar" ? "font-noto" : "font-macan"
      )}
    >
      <Header search={search} setSearch={setSearch} />
    </div>
  );
};
