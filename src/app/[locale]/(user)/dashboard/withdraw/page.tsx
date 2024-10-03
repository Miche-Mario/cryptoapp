import React from "react";
import WithdrawForm from "@/components/user/WithdrawForm";

const WithdrawPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Withdraw Funds</h1>
      <WithdrawForm />
    </div>
  );
};

export default WithdrawPage;
