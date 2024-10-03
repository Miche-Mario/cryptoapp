"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaDollarSign, FaExclamationTriangle } from "react-icons/fa";

interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
}

const WithdrawForm: React.FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [cryptoEquivalent, setCryptoEquivalent] = useState<number>(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [cryptoData, setCryptoData] = useState<CryptoCurrency | null>(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              ids: "bitcoin", // We're using Bitcoin for this example
              order: "market_cap_desc",
              per_page: 1,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCryptoData(response.data[0]);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchCryptoData();
  }, []);

  useEffect(() => {
    if (amount && cryptoData) {
      setCryptoEquivalent(parseFloat(amount) / cryptoData.current_price);
    } else {
      setCryptoEquivalent(0);
    }
  }, [amount, cryptoData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const confirmWithdrawal = () => {
    // Here you would typically send the withdrawal request to your backend
    console.log("Withdrawal confirmed:", { amount, cryptoEquivalent });
    // Reset form and close confirmation modal
    setAmount("");
    setShowConfirmation(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Withdraw Funds</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Withdrawal Amount (USD)
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

        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm text-gray-600">
            Cryptocurrency Equivalent:
            <span className="font-semibold ml-2">
              {cryptoEquivalent.toFixed(8)} {cryptoData?.symbol.toUpperCase()}
            </span>
          </p>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Request Withdrawal
          </button>
        </div>
      </form>

      {showConfirmation && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                <FaExclamationTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Confirm Withdrawal
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to withdraw ${amount}?
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-indigo-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={confirmWithdrawal}
                >
                  Confirm
                </button>
                <button
                  id="cancel-btn"
                  className="mt-3 px-4 py-2 bg-white text-base font-medium rounded-md w-full shadow-sm border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawForm;
