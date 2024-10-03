import React from "react";
import dynamic from "next/dynamic";

const TransactionStatusManager = dynamic(
  () => import("@/components/admin/TransactionStatusManager"),
  {
    ssr: false,
    loading: () => <p>Loading transaction status manager...</p>,
  }
);

const TransactionStatusPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Transaction Status</h1>
      <TransactionStatusManager />
    </div>
  );
};

export default TransactionStatusPage;
