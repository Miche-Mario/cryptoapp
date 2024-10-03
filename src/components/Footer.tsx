import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaTwitter, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  const t = useTranslations("footer");

  return (
    <footer className="bg-primary-default text-primary-contrast">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <img className="h-10" src="/assets/logo.png" alt="Company logo" />
            <p className="text-primary-contrast text-base">
              {t("description")}
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-primary-contrast hover:text-primary-secondary"
              >
                <span className="sr-only">Twitter</span>
                <FaTwitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-primary-contrast hover:text-primary-secondary"
              >
                <span className="sr-only">Facebook</span>
                <FaFacebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-primary-contrast hover:text-primary-secondary"
              >
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-primary-contrast hover:text-primary-secondary"
              >
                <span className="sr-only">GitHub</span>
                <FaGithub className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-primary-contrast tracking-wider uppercase">
                  {t("solutions")}
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {["tracking", "analytics", "commerce", "insights"].map(
                    (item) => (
                      <li key={item}>
                        <Link
                          href="#"
                          className="text-base text-primary-contrast hover:text-primary-secondary"
                        >
                          {t(`solutions.${item}`)}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-primary-contrast tracking-wider uppercase">
                  {t("support")}
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {["pricing", "documentation", "guides", "api-status"].map(
                    (item) => (
                      <li key={item}>
                        <Link
                          href="#"
                          className="text-base text-primary-contrast hover:text-primary-secondary"
                        >
                          {t(`support.${item}`)}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-primary-contrast tracking-wider uppercase">
                  {t("company")}
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {["about", "blog", "jobs", "press"].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-base text-primary-contrast hover:text-primary-secondary"
                      >
                        {t(`company.${item}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-primary-contrast tracking-wider uppercase">
                  {t("legal")}
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {["privacy", "terms"].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-base text-primary-contrast hover:text-primary-secondary"
                      >
                        {t(`legal.${item}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-primary-secondary pt-8">
          <p className="text-base text-primary-contrast xl:text-center">
            &copy; {new Date().getFullYear()} {t("companyName")}.{" "}
            {t("allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
