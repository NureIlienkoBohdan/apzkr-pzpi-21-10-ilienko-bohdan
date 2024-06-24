import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import LandingPage from "../views/LandingPage";
import About from "../views/About";
import Dashboard from "../views/Dashboard";
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";
import Profile from "../views/Profile";
import JobApplicationForm from "../views/JobApplicationForm";
import JobApplicationList from "../views/JobApplicationList";
import UserTable from "../views/UserTable";
import DroneModelsTable from "../views/DroneModelsTable";
import JobOpeningTable from "../views/JobOpeningTable";
import DroneTable from "../views/DroneTable";
import DroneUsageTable from "../views/DroneUsageTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "users",
            element: <UserTable />,
          },
          {
            path: "drone-models",
            element: <DroneModelsTable />,
          },
          {
            path: "drones",
            element: <DroneTable />,
          },
          {
            path: "job-openings",
            element: <JobOpeningTable />,
          },
          {
            path: "drone-usage",
            element: <DroneUsageTable />,
          },
        ],
      },
      {
        path: "collaborate",
        element: <JobApplicationForm />,
      },
      {
        path: "applications",
        element: <JobApplicationList />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

export const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
