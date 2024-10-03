"use client";
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useParams } from "next/navigation";

const AdminDashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const params = useParams();
  const locale = params.locale as string;

  const adminSidebarItems = [
    { label: "User List", route: `/${locale}/admindashboard` },
    {
      label: "Transaction Status",
      route: `/${locale}/admindashboard/transaction-status`,
    },
  ];

  return (
    <DashboardLayout sidebarItems={adminSidebarItems}>
      {children}
    </DashboardLayout>
  );
};

export default AdminDashboardLayout;
