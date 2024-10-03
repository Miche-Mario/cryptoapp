import React from "react";
import dynamic from "next/dynamic";

const WithdrawForm = dynamic(() => import("@/components/user/WithdrawForm"), {
  ssr: false,
  loading: () => <p>Loading withdraw form...</p>,
});

const WithdrawPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-4">Withdraw Funds</h1>
      <WithdrawForm />
    </div>
  );
};

export default WithdrawPage;
