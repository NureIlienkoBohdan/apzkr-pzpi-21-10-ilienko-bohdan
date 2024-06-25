import React from "react";
import { NavLink } from "react-router-dom";

interface DashboardItemProps {
  to: string;
  children: React.ReactNode;
}

const DashboardItem: React.FC<DashboardItemProps> = ({ to, children }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? "block px-4 py-2 rounded bg-blue-500 text-white"
            : "block px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors"
        }
      >
        {children}
      </NavLink>
    </li>
  );
};

export default DashboardItem;
