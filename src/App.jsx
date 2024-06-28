import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { merge } from "@/lib/utils";

export default function App() {
  const { i18n } = useTranslation("global");
  const lang = i18n.language.split("-")[0];
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    // Set the document language and direction to the user's preferred language
    document.documentElement.lang = lang;
    document.documentElement.dir = i18n.dir(i18n.language);
  }, [i18n, lang]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={merge(lang.toLocaleLowerCase() === "ar" ? "font-noto" : "font-macan")}>
        <h1 className="text-3xl font-bold hover:underline">Hello world!</h1>
      </div>
      <ReactQueryDevtools initialIsOpen={false} position="left" buttonPosition="bottom-left" />
    </QueryClientProvider>
  );
}
