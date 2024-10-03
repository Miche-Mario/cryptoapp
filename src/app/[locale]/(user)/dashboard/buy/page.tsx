import React from "react";
import BuyForm from "@/components/user/BuyForm";

const BuyPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Buy Cryptocurrency</h1>
      <BuyForm />
    </div>
  );
};

export default BuyPage;
