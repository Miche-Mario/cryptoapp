"use client";

import React, { useState, useEffect } from "react";
import { Table, Select, Input, Button } from "antd";

const { Option } = Select;

interface Transaction {
  id: string;
  user: string;
  type: string;
  amount: number;
  status: string;
  date: string;
}

const TransactionStatusManager: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    // Fetch transactions data from API
    // This is a mock implementation
    const mockTransactions: Transaction[] = [
      {
        id: "1",
        user: "User1",
        type: "Buy",
        amount: 1000,
        status: "Pending",
        date: "2023-05-01",
      },
      {
        id: "2",
        user: "User2",
        type: "Sell",
        amount: 500,
        status: "Approved",
        date: "2023-05-02",
      },
    ];
    setTransactions(mockTransactions);
  }, []);

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: Transaction) => (
        <Select
          defaultValue={status}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(record.id, value)}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Approved">Approved</Option>
          <Option value="Rejected">Rejected</Option>
        </Select>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  const handleStatusChange = (id: string, newStatus: string) => {
    // Update transaction status
    // In a real application, you would call an API to update the status
    console.log(`Updating status for transaction ${id} to ${newStatus}`);
  };

  const handleNewStatusCreation = () => {
    if (newStatus) {
      // Create new status
      // In a real application, you would call an API to create the new status
      console.log(`Creating new status: ${newStatus}`);
      setNewStatus("");
    }
  };

  return (
    <div>
      <Table columns={columns} dataSource={transactions} rowKey="id" />
      <div className="mt-4">
        <Input
          placeholder="New status type"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          style={{ width: 200 }}
        />
        <Button onClick={handleNewStatusCreation} className="ml-2">
          Create New Status
        </Button>
      </div>
    </div>
  );
};

export default TransactionStatusManager;
