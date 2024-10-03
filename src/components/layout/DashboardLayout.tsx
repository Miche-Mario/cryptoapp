import React, { Suspense } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Loading from "@/app/[locale]/(user)/dashboard/loading";

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarItems: Array<{ label: string; route: string }>;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebarItems,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar items={sidebarItems} />
        <main className="flex-1 overflow-y-auto p-4">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
