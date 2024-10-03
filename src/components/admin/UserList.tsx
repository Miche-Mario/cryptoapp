"use client";

import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface User {
  id: string;
  walletCode: string;
  balance: {
    crypto: number;
    usd: number;
  };
  registrationDate: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [balanceChange, setBalanceChange] = useState("");

  useEffect(() => {
    // Fetch users data from API
    // This is a mock implementation
    const mockUsers: User[] = [
      {
        id: "1",
        walletCode: "ABC123DEF456GHI789",
        balance: { crypto: 1.5, usd: 45000 },
        registrationDate: "2023-01-15",
      },
      {
        id: "2",
        walletCode: "JKL012MNO345PQR678",
        balance: { crypto: 0.75, usd: 22500 },
        registrationDate: "2023-02-20",
      },
    ];
    setUsers(mockUsers);
  }, []);

  const columns = [
    {
      title: "User ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Wallet Code",
      dataIndex: "walletCode",
      key: "walletCode",
    },
    {
      title: "Balance (Crypto)",
      dataIndex: ["balance", "crypto"],
      key: "balanceCrypto",
      render: (crypto: number) => crypto.toFixed(8),
    },
    {
      title: "Balance (USD)",
      dataIndex: ["balance", "usd"],
      key: "balanceUsd",
      render: (usd: number) => `$${usd.toFixed(2)}`,
    },
    {
      title: "Registration Date",
      dataIndex: "registrationDate",
      key: "registrationDate",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: User) => (
        <Button onClick={() => showUserDetails(record)}>View Details</Button>
      ),
    },
  ];

  const showUserDetails = (user: User) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleBalanceChange = () => {
    if (selectedUser && balanceChange) {
      const change = parseFloat(balanceChange);
      if (!isNaN(change)) {
        // Update user balance
        // In a real application, you would call an API to update the balance
        console.log(
          `Updating balance for user ${selectedUser.id} by ${change}`
        );
      }
    }
    setIsModalVisible(false);
    setBalanceChange("");
  };

  return (
    <div>
      <Table columns={columns} dataSource={users} rowKey="id" />
      <Modal
        title="User Details"
        visible={isModalVisible}
        onOk={handleBalanceChange}
        onCancel={() => setIsModalVisible(false)}
      >
        {selectedUser && (
          <div>
            <p>
              <UserOutlined /> User ID: {selectedUser.id}
            </p>
            <p>Wallet Code: {selectedUser.walletCode}</p>
            <p>Balance (Crypto): {selectedUser.balance.crypto.toFixed(8)}</p>
            <p>Balance (USD): ${selectedUser.balance.usd.toFixed(2)}</p>
            <p>Registration Date: {selectedUser.registrationDate}</p>
            <Input
              type="number"
              placeholder="Change balance"
              value={balanceChange}
              onChange={(e) => setBalanceChange(e.target.value)}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserList;
