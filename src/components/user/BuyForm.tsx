"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaBitcoin,
  FaEthereum,
  FaCoins,
  FaDollarSign,
  FaChevronDown,
} from "react-icons/fa";

interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
}

const BuyForm: React.FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [selectedCrypto, setSelectedCrypto] = useState<string>("");
  const [cryptoList, setCryptoList] = useState<CryptoCurrency[]>([]);
  const [dollarEquivalent, setDollarEquivalent] = useState<number>(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCryptoList = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCryptoList(response.data);
      } catch (error) {
        console.error("Error fetching crypto list:", error);
      }
    };

    fetchCryptoList();
  }, []);

  useEffect(() => {
    if (amount && selectedCrypto) {
      const selectedCryptoData = cryptoList.find(
        (crypto) => crypto.id === selectedCrypto
      );
      if (selectedCryptoData) {
        setDollarEquivalent(
          parseFloat(amount) * selectedCryptoData.current_price
        );
      }
    } else {
      setDollarEquivalent(0);
    }
  }, [amount, selectedCrypto, cryptoList]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Purchase submitted:", {
      amount,
      selectedCrypto,
      dollarEquivalent,
    });
    // Reset form or show confirmation message
  };

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

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Fill in the form to buy
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaDollarSign className="text-gray-400" />
            </div>
            <input
              type="number"
              name="amount"
              id="amount"
              className="focus:ring-indigo-500 py-3 border border-gray-300 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm rounded-md"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">USD</span>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="crypto"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Cryptocurrency
          </label>
          <div className="mt-1 relative">
            <button
              type="button"
              className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedCrypto ? (
                <span className="flex items-center">
                  {getIconForCrypto(
                    cryptoList.find((c) => c.id === selectedCrypto)?.symbol ||
                      ""
                  )}
                  <span className="ml-3">
                    {cryptoList.find((c) => c.id === selectedCrypto)?.name}
                  </span>
                </span>
              ) : (
                <span className="text-gray-500">Select a cryptocurrency</span>
              )}
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FaChevronDown className="text-gray-400" />
              </span>
            </button>
            {isDropdownOpen && (
              <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10">
                <ul className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {cryptoList.map((crypto) => (
                    <li
                      key={crypto.id}
                      className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                      onClick={() => {
                        setSelectedCrypto(crypto.id);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <div className="flex items-center">
                        {getIconForCrypto(crypto.symbol)}
                        <span className="ml-3 block font-normal truncate">
                          {crypto.name}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Purchase Summary
          </h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">You are buying:</span>
            <span className="text-sm font-semibold text-gray-800">
              {amount || "0"}{" "}
              {selectedCrypto
                ? cryptoList
                    .find((c) => c.id === selectedCrypto)
                    ?.symbol.toUpperCase()
                : "coins"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total cost:</span>
            <span className="text-sm font-semibold text-gray-800">
              ${dollarEquivalent.toFixed(2)}
            </span>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Confirm Purchase
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuyForm;
