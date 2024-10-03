"use client";
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useParams } from "next/navigation";

const UserDashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const params = useParams();
  const locale = params.locale as string;

  const userSidebarItems = [
    { label: "Wallet", route: `/${locale}/dashboard` },
    { label: "Buy", route: `/${locale}/dashboard/buy` },
    { label: "Withdraw", route: `/${locale}/dashboard/withdraw` },
  ];

  return (
    <DashboardLayout sidebarItems={userSidebarItems}>
      {children}
    </DashboardLayout>
  );
};

export default UserDashboardLayout;
