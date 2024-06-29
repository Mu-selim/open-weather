import { useTranslation } from "react-i18next";

export const InitialLoader = () => {
  const { t } = useTranslation("global");
  const title = t("title");

  return (
    <div className="bg-gray-100 dark:bg-slate-900 sm:gap-8">
      <div className="container flex h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden">
        <div className="size-12 animate-spin rounded-md border-4 border-t-4 border-slate-900 dark:border-white sm:size-20"></div>
        <h1 className="whitespace-nowrap text-xl font-bold text-slate-900 dark:text-gray-100 sm:text-3xl">
          {title}...
        </h1>
      </div>
    </div>
  );
};
