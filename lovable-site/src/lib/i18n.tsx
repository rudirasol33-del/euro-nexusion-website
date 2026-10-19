import { track } from "./analytics";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "de" | "en";

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  text: (de: string, en: string) => string;
}>({ language: "de", setLanguage: () => undefined, text: (de) => de });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("de");

  useEffect(() => {
    const saved = window.localStorage.getItem("en-language");
    if (saved === "en") { setLanguageState("en"); document.documentElement.lang = "en"; }
  }, []);

  const setLanguage = (next: Language) => {
    track("language_switch", { to: next });
    setLanguageState(next);
    window.localStorage.setItem("en-language", next);
    document.documentElement.lang = next;
  };

  const value = useMemo(
    () => ({ language, setLanguage, text: (de: string, en: string) => (language === "de" ? de : en) }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);