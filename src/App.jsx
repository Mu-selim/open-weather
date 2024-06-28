import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { merge } from "@/lib/utils";

export default function App() {
  const { i18n } = useTranslation("global");

  useEffect(() => {
    // Set the document language and direction to the user's preferred language
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.dir(i18n.language);
  }, [i18n]);

  return (
    <div className={merge(i18n.language.toLocaleLowerCase() === "ar" ? "font-noto" : "font-macan")}>
      <h1 className="text-3xl font-bold hover:underline">Hello world!</h1>
    </div>
  );
}
