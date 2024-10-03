"use client";

import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaBitcoin,
  FaEthereum,
  FaCoins,
  FaArrowUp,
  FaArrowDown,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";
import axios from "axios";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;
  status: "Completed" | "Pending" | "Failed";
}

interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  icon: React.ReactNode;
}

const WalletContent: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [walletCode, setWalletCode] = useState("");
  const [balance, setBalance] = useState({ crypto: 0, usd: 0 });
  const [cryptoPrices, setCryptoPrices] = useState<CryptoCurrency[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    setWalletCode(Math.random().toString(36).substring(2, 20).toUpperCase());
    setBalance({ crypto: 1.5, usd: 45000 });
    setTransactions([
      {
        id: "1",
        type: "Deposit",
        amount: 500,
        date: "2023-05-01",
        status: "Completed",
      },
      {
        id: "2",
        type: "Withdrawal",
        amount: 200,
        date: "2023-05-03",
        status: "Pending",
      },
      {
        id: "3",
        type: "Purchase",
        amount: 150,
        date: "2023-05-05",
        status: "Failed",
      },
    ]);

    const fetchCryptoPrices = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 5,
              page: 1,
              sparkline: false,
            },
          }
        );

        const cryptoData = response.data.map((crypto: any) => ({
          id: crypto.id,
          name: crypto.name,
          symbol: crypto.symbol.toUpperCase(),
          current_price: crypto.current_price,
          price_change_percentage_24h: crypto.price_change_percentage_24h,
          market_cap: crypto.market_cap,
          total_volume: crypto.total_volume,
          icon: getIconForCrypto(crypto.symbol),
        }));

        setCryptoPrices(cryptoData);
      } catch (error) {
        console.error("Error fetching crypto prices:", error);
      }
    };

    fetchCryptoPrices();
    const interval = setInterval(fetchCryptoPrices, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getIconForCrypto = (symbol: string) => {
    switch (symbol.toLowerCase()) {
      case "btc":
        return <FaBitcoin className="text-orange-500" />;
      case "eth":
        return <FaEthereum className="text-blue-500" />;
      default:
        return <FaCoins className="text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <FaCheckCircle className="text-green-500" />;
      case "Pending":
        return <FaClock className="text-yellow-500" />;
      case "Failed":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Wallet Information
        </h2>
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <p className="text-sm text-gray-600">Wallet Code</p>
          <p className="text-lg font-mono">{walletCode}</p>
        </div>
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md">
          <div>
            <p className="text-sm text-gray-600">Balance</p>
            <p className="text-2xl font-bold">
              {showBalance ? (
                <>
                  {balance.crypto.toFixed(8)} BTC
                  <span className="text-gray-500 text-lg ml-2">
                    (${balance.usd.toFixed(2)})
                  </span>
                </>
              ) : (
                "****"
              )}
            </p>
          </div>
          <button
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Transaction History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3">Type</th>
                <th className="text-right p-3">Amount</th>
                <th className="text-right p-3">Date</th>
                <th className=" p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-200">
                  <td className="p-3">{transaction.type}</td>
                  <td className="p-3 text-right font-mono">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="p-3 text-right">{transaction.date}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end">
                      {getStatusIcon(transaction.status)}
                      <span className="ml-2">{transaction.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Real-time Cryptocurrency Prices
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3">Name</th>
                <th className="text-right p-3">Price (USD)</th>
                <th className="text-right p-3">24h Change</th>
                <th className="text-right p-3">Market Cap</th>
                <th className="text-right p-3">24h Volume</th>
              </tr>
            </thead>
            <tbody>
              {cryptoPrices.map((crypto) => (
                <tr key={crypto.id} className="border-b border-gray-200">
                  <td className="p-3 flex items-center">
                    {crypto.icon}
                    <span className="ml-2">{crypto.name}</span>
                    <span className="ml-2 text-gray-500 text-sm">
                      {crypto.symbol}
                    </span>
                  </td>
                  <td className="p-3 text-right font-mono">
                    ${crypto.current_price.toFixed(2)}
                  </td>
                  <td
                    className={`p-3 text-right ${
                      crypto.price_change_percentage_24h >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {crypto.price_change_percentage_24h >= 0 ? (
                      <FaArrowUp className="inline mr-1" />
                    ) : (
                      <FaArrowDown className="inline mr-1" />
                    )}
                    {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                  </td>
                  <td className="p-3 text-right font-mono">
                    ${(crypto.market_cap / 1000000).toFixed(2)}M
                  </td>
                  <td className="p-3 text-right font-mono">
                    ${(crypto.total_volume / 1000000).toFixed(2)}M
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Data updated every minute. Last update:{" "}
          {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default WalletContent;
