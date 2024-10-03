"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  items: Array<{ label: string; route: string }>;
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const pathname = usePathname();

  return (
    <aside className="bg-gray-200 w-64 p-4">
      <nav>
        <ul>
          {items.map((item, index) => (
            <li key={index} className="mb-2">
              <Link href={item.route}>
                <span
                  className={`text-blue-600 hover:text-blue-800 ${
                    pathname === item.route ? "font-bold" : ""
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
