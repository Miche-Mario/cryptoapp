"use client";

import React, { useState } from "react";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;
}

const WalletContent: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);
  const walletCode = "ABC123DEF456GHI789"; // This should be fetched from an API in a real application
  const balance = 1000.5; // This should be fetched from an API in a real application

  const transactions: Transaction[] = [
    { id: "1", type: "Deposit", amount: 500, date: "2023-05-01" },
    { id: "2", type: "Withdrawal", amount: 200, date: "2023-05-03" },
    { id: "3", type: "Purchase", amount: 150, date: "2023-05-05" },
  ];

  return (
    <div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-bold mb-4">Wallet Information</h2>
        <p>
          <strong>Wallet Code:</strong> {walletCode}
        </p>
        <div className="flex items-center mt-2">
          <strong>Balance:</strong>
          <button
            className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? "Hide" : "Show"}
          </button>
          <span className="ml-2">
            {showBalance ? `$${balance.toFixed(2)}` : "****"}
          </span>
        </div>
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-xl font-bold mb-4">Transaction History</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Type</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.type}</td>
                <td>${transaction.amount.toFixed(2)}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WalletContent;
