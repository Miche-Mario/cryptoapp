import React from "react";
import WalletContent from "@/components/user/WalletContent";

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Wallet Overview</h1>
      <WalletContent />
    </div>
  );
};

export default DashboardPage;
