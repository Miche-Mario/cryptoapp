"use client";

import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, message, Tooltip } from "antd";
import { UserOutlined, DollarOutlined, CopyOutlined } from "@ant-design/icons";

interface User {
  id: string;
  name: string;
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
  const [amountToAdd, setAmountToAdd] = useState("");
  const [copiedWallet, setCopiedWallet] = useState<string | null>(null);

  useEffect(() => {
    // Fetch users data from API
    // This is a mock implementation
    const mockUsers: User[] = [
      {
        id: "1",
        name: "John Doe",
        walletCode: "ABC123DEF456GHI789JKL012MNO345",
        balance: { crypto: 1.5, usd: 45000 },
        registrationDate: "2023-01-15",
      },
      {
        id: "2",
        name: "Jane Smith",
        walletCode: "PQR678STU901VWX234YZA567BCD890",
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Wallet Code",
      dataIndex: "walletCode",
      key: "walletCode",
      render: (walletCode: string) => (
        <div>
          {walletCode.slice(0, 10)}...
          <Button
            type="link"
            onClick={() => showUserDetails({ walletCode } as User)}
          >
            Voir plus
          </Button>
          <Tooltip title={copiedWallet === walletCode ? "Copié !" : "Copier"}>
            <Button
              icon={<CopyOutlined />}
              onClick={() => copyWalletCode(walletCode)}
              type="text"
            />
          </Tooltip>
        </div>
      ),
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

  const handleAddBalance = () => {
    if (selectedUser && amountToAdd) {
      const amount = parseFloat(amountToAdd);
      if (!isNaN(amount) && amount > 0) {
        // Update user balance
        // In a real application, you would call an API to update the balance
        console.log(
          `Adding $${amount} to user ${selectedUser.name}'s account (ID: ${selectedUser.id})`
        );
        message.success(
          `Successfully added $${amount} to ${selectedUser.name}'s account`
        );
      } else {
        message.error("Please enter a valid positive amount");
      }
    }
    setIsModalVisible(false);
    setAmountToAdd("");
  };

  const copyWalletCode = (walletCode: string) => {
    navigator.clipboard.writeText(walletCode).then(() => {
      setCopiedWallet(walletCode);
      message.success("Wallet code copied to clipboard");
      setTimeout(() => setCopiedWallet(null), 3000);
    });
  };

  return (
    <div>
      <Table columns={columns} dataSource={users} rowKey="id" />
      <Modal
        title="User Details"
        visible={isModalVisible}
        onOk={handleAddBalance}
        onCancel={() => setIsModalVisible(false)}
        okText="Add Balance"
      >
        {selectedUser && (
          <div>
            <p>
              <UserOutlined /> User ID: {selectedUser.id}
            </p>
            <p>Name: {selectedUser.name}</p>
            <p>
              Wallet Code: {selectedUser.walletCode}
              <Tooltip
                title={
                  copiedWallet === selectedUser.walletCode
                    ? "Copié !"
                    : "Copier"
                }
              >
                <Button
                  icon={<CopyOutlined />}
                  onClick={() => copyWalletCode(selectedUser.walletCode)}
                  type="text"
                />
              </Tooltip>
            </p>
            <p>Balance (Crypto): {selectedUser.balance?.crypto.toFixed(8)}</p>
            <p>Balance (USD): ${selectedUser.balance?.usd.toFixed(2)}</p>
            <p>Registration Date: {selectedUser.registrationDate}</p>
            <Input
              prefix={<DollarOutlined />}
              type="number"
              placeholder="Amount to add to user's account"
              value={amountToAdd}
              onChange={(e) => setAmountToAdd(e.target.value)}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserList;
