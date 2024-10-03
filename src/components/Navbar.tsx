"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { FaSun, FaMoon, FaGlobe } from "react-icons/fa";

export default function Navbar() {
  const t = useTranslations("navbar");
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const changeLanguage = (lang: string) => {
    router.push(`/${lang}`);
    setIsLanguageMenuOpen(false);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const handleSignInSuccess = () => {
    router.push("/dashboard");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary-default text-primary-contrast p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          {t("logo")}
        </Link>
        <div className="space-x-4 flex items-center">
          <Link href="/features">{t("features")}</Link>
          <Link href="/faq">{t("faq")}</Link>

          <button onClick={toggleTheme} className=" p-2 rounded">
            {theme === "dark" ? (
              <FaSun className="h-5 w-5" />
            ) : (
              <FaMoon className="h-5 w-5" />
            )}
          </button>
          <div className="relative inline-block text-left">
            <button
              type="button"
              className=" p-2 rounded flex items-center"
              id="language-menu"
              aria-expanded={isLanguageMenuOpen}
              aria-haspopup="true"
              onClick={toggleLanguageMenu}
            >
              <FaGlobe className="h-5 w-5" />
            </button>
            {isLanguageMenuOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-surface-default ring-1 z-50 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="language-menu"
              >
                <div className="py-1" role="none">
                  <button
                    onClick={() => changeLanguage("en")}
                    className="block w-full text-left px-4 py-2 font-bold text-sm text-content-default hover:bg-surface-secondary"
                    role="menuitem"
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLanguage("fr")}
                    className="block w-full font-bold text-left px-4 py-2 text-sm text-content-default hover:bg-surface-secondary"
                    role="menuitem"
                  >
                    Français
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
