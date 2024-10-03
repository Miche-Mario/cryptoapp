import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <Link href="/dashboard">
          <span className="text-xl font-bold">Crypto Exchange</span>
        </Link>
        <div>
          <Link href="/logout">
            <span className="cursor-pointer">Logout</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
