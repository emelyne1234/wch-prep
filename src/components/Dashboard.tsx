import React, { useState } from "react";

import {
  FiHome,
  FiFileText,
  FiUsers,
  FiBriefcase,
  FiMail,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import Logo_1 from "../assets/ba_logo.png";
import { FaRegCircleUser } from "react-icons/fa6";
import Link from "next/link";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  const menuItems = [
    { path: "/admin", icon: <FiHome />, label: "Dashboard" },
    { path: "/admin/articles", icon: <FiFileText />, label: "Articles" },
    {
      path: "/admin/partnerships",
      icon: <FiUsers />,
      label: "Partnerships",
    },
    {
      path: "/admin/internships",
      icon: <FiBriefcase />,
      label: "Internships",
    },
    { path: "/admin/messages", icon: <FiMail />, label: "Messages" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`bg-white w-64 min-h-screen py-4 justify-between flex flex-col items-center  ${
          isSidebarOpen ? "" : "-ml-64"
        }`}
      >
        <div className="w-full flex flex-col items-center">
          <div className="Logo w-[122px]  text-center ">
            <Link href="/">
              {/* <Image src={Logo_1} alt="logo" width={122} height={122} /> */}
            </Link>
          </div>
          <nav className="mt-8 gap-3 flex flex-col">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center text-sm px-3 py-2 rounded text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                  location.pathname === item.path
                    ? "bg-blue-50 !text-blue-600"
                    : ""
                }`}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <button className="flex items-center justify-center px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 w-full mt-8">
          <FiLogOut className="text-xl mr-3" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex items-center space-x-3 cursor-pointer">
              <FaRegCircleUser className="text-2xl text-slate-700" />
              <span className="text-sm text-slate-700">Admin User</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {/* <Outlet /> */}ss
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;