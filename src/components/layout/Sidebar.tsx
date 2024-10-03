import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  items: Array<{ label: string; route: string }>;
}

// ... existing code ...
const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const pathname = usePathname();

  return (
    <aside className="bg-gray-800 text-white w-64 p-6 shadow-lg">
      <nav>
        <ul>
          {items.map((item, index) => (
            <li key={index} className="mb-4">
              <Link href={item.route} passHref>
                <span
                  className={`block px-4 py-2 rounded-md transition-colors duration-200 ${
                    pathname === item.route
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
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
// ... existing code ...

export default Sidebar;
