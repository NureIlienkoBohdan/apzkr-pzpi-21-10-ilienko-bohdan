import React from "react";
import { Outlet } from "react-router-dom";
import DashboardItem from "../components/DashboardItem";

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <nav className="w-1/4 p-6 bg-gray-800 text-white">
        <ul className="space-y-4">
          <DashboardItem to="/dashboard/users">Users</DashboardItem>
          <DashboardItem to="/dashboard/drone-models">
            Drone Models
          </DashboardItem>
          <DashboardItem to="/dashboard/drones">Drones</DashboardItem>
          <DashboardItem to="/dashboard/job-openings">
            Job Openings
          </DashboardItem>
          <DashboardItem to="/dashboard/drone-usage">Drone Usage</DashboardItem>
        </ul>
      </nav>
      <main className="w-3/4 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
