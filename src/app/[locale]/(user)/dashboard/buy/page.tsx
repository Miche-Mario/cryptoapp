import React from "react";
import dynamic from "next/dynamic";

const BuyForm = dynamic(() => import("@/components/user/BuyForm"), {
  ssr: false,
  loading: () => <p>Loading buy form...</p>,
});

const BuyPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-4">Buy Cryptocurrency</h1>
      <BuyForm />
    </div>
  );
};

export default BuyPage;
