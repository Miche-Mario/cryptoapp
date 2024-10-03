import React from "react";
import dynamic from "next/dynamic";

const WalletContent = dynamic(() => import("@/components/user/WalletContent"), {
  ssr: false,
  loading: () => <p>Loading wallet content...</p>,
});

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Wallet Overview</h1>
      <WalletContent />
    </div>
  );
};

export default DashboardPage;
