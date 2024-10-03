import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
}

const CryptoDashboard = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const t = useTranslations("cryptoDashboard");

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
        );
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-surface-default p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-content-default">
        {t("title")}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-surface-secondary rounded-lg overflow-hidden">
          <thead className="bg-primary-default text-primary-contrast">
            <tr>
              <th className="px-4 py-3 text-left">{t("rank")}</th>
              <th className="px-4 py-3 text-left">{t("name")}</th>
              <th className="px-4 py-3 text-right">{t("price")}</th>
              <th className="px-4 py-3 text-right">{t("change24h")}</th>
              <th className="px-4 py-3 text-right">{t("marketCap")}</th>
              <th className="px-4 py-3 text-right">{t("volume")}</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto, index) => (
              <tr
                key={crypto.id}
                className="border-b border-solid-200 hover:bg-surface-tertiary transition-colors duration-150"
              >
                <td className="px-4 py-3 text-content-default">{index + 1}</td>
                <td className="px-4 py-3 flex items-center">
                  <Image
                    src={crypto.image}
                    alt={crypto.name}
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  <span className="font-medium text-content-default">
                    {crypto.name}
                  </span>
                  <span className="ml-2 text-content-tertiary">
                    {crypto.symbol.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-content-default">
                  $
                  {crypto.current_price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td
                  className={`px-4 py-3 text-right ${
                    crypto.price_change_percentage_24h >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  <div className="flex items-center justify-end">
                    {crypto.price_change_percentage_24h >= 0 ? (
                      <FaCaretUp />
                    ) : (
                      <FaCaretDown />
                    )}
                    <span className="ml-1">
                      {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-content-default">
                  ${crypto.market_cap.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-content-default">
                  ${crypto.total_volume.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoDashboard;
