"use client";

import React, { useState } from "react";
import { Table, Select, Button, Modal, Form, Input } from "antd";

// Mock data for transactions
const mockTransactions = [
  {
    id: 1,
    user: "User1",
    type: "Buy",
    amount: 100,
    status: "Pending",
    date: "2023-05-01",
  },
  {
    id: 2,
    user: "User2",
    type: "Sell",
    amount: 50,
    status: "Approved",
    date: "2023-05-02",
  },
  // Add more mock data as needed
];

const TransactionStatusManager: React.FC = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    { title: "Transaction ID", dataIndex: "id", key: "id" },
    { title: "User", dataIndex: "user", key: "user" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any) => (
        <Select
          defaultValue={status}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(record.id, value)}
        >
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="Approved">Approved</Select.Option>
          <Select.Option value="Rejected">Rejected</Select.Option>
        </Select>
      ),
    },
    { title: "Date", dataIndex: "date", key: "date" },
  ];

  const handleStatusChange = (id: number, newStatus: string) => {
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log("New status type:", values.newStatus);
      // Here you would typically send this to your backend
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Table columns={columns} dataSource={transactions} />
      <Button onClick={showModal} type="primary" style={{ marginTop: 16 }}>
        Add New Status Type
      </Button>
      <Modal
        title="Add New Transaction Status"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="newStatus"
            label="New Status"
            rules={[
              { required: true, message: "Please input the new status!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TransactionStatusManager;
