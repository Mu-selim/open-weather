import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import propTypes from "prop-types";
import { debounce } from "lodash";

import { Logo } from "@/components/svg/logo";
import { Search, Sun, Earth } from "lucide-react";
import { Modal } from "@/components/ui/modal";

export const Header = ({ search, setSearch }) => {
  const { t, i18n } = useTranslation("global");
  const [theme, setTheme] = useTheme();
  const [modalOpen, setModalOpen] = useState(false);

  // Simulate API call
  const fetchApiData = async (value) => {
    console.log(`Fetching data for: ${value}`);
    // Simulate a network request
    const response = await new Promise((resolve) => setTimeout(() => resolve(`Response for ${value}`), 1000));
    console.log("Response:", response);
  };

  // Debounced API call
  const debouncedFetchApiData = useCallback(
    debounce((value) => fetchApiData(value), 500),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedFetchApiData(value);
  };

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleModalToggle = () => {
    setModalOpen((prev) => !prev);
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = i18n.dir(lang);
    handleModalToggle();
  };

  return (
    <nav className="container flex flex-wrap items-center justify-between gap-4 gap-y-4 py-4">
      <div className="flex select-none items-center gap-2">
        <Logo className="w-6 min-w-6" />
        <span className="whitespace-nowrap text-xl font-bold text-[#FF630B]">{t("title")}</span>
      </div>
      <div className="relative order-3 basis-full md:order-none md:basis-auto lg:w-96">
        <input
          type="search"
          value={search}
          placeholder={t("search.placeholder")}
          onChange={handleChange}
          className="w-full rounded-full border-2 border-gray-500 bg-gray-200 py-1.5 pe-4 ps-10 outline-none focus:border-gray-700 dark:border-transparent dark:bg-slate-700 dark:focus:border-gray-200"
        />
        <button disabled={!search}>
          <Search className="absolute start-2.5 top-1/2 size-5 -translate-y-1/2 transform text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      <div className="flex items-center justify-end gap-4">
        <button onClick={handleThemeChange} aria-label={t("theme.toggle")} title={t("theme.toggle")}>
          <Sun className="size-6 text-slate-900 dark:text-gray-100" />
        </button>
        <button onClick={handleModalToggle} aria-label={t("language.toggle")} title={t("language.toggle")}>
          <Earth className="size-6 text-slate-900 dark:text-gray-100" />
        </button>
      </div>
      <Modal isOpen={modalOpen} onClose={handleModalToggle}>
        <div className="space-y-4 py-2 max-w-xl">
          <h2 className="text-pretty text-center text-2xl font-bold">{t("language.modal.title")}</h2>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => handleLanguageChange("en")}
              className="rounded-md border-2 border-slate-900 px-4 py-1.5 text-center font-semibold"
            >
              {t("language.modal.en")}
            </button>
            <button
              onClick={() => handleLanguageChange("ar")}
              className="rounded-md border-2 border-slate-900 px-4 py-1.5 text-center font-semibold"
            >
              {t("language.modal.ar")}
            </button>
            <button
              onClick={() => handleLanguageChange("es")}
              className="rounded-md border-2 border-slate-900 px-4 py-1.5 text-center font-semibold"
            >
              {t("language.modal.es")}
            </button>
          </div>
        </div>
      </Modal>
    </nav>
  );
};

Header.propTypes = {
  search: propTypes.string.isRequired,
  setSearch: propTypes.func.isRequired,
};
