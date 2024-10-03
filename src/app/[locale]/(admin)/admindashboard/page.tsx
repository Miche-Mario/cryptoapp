import React from "react";
import dynamic from "next/dynamic";

const UserList = dynamic(() => import("@/components/admin/UserList"), {
  ssr: false,
  loading: () => <p>Loading user list...</p>,
});

const AdminDashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <UserList />
    </div>
  );
};

export default AdminDashboardPage;
