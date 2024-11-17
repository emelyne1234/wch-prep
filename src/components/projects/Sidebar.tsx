"use client";
import {
  House,
  ChartLine,
  Users,
  Gear,
  SignOut,
  List,
  X,
  AlignLeft,
  ArrowLeft,
  ArrowRight,
  Pencil,
  ArrowElbowRight,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setIsCollapsed(true);
  }, [pathname]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      if (!isCollapsed && sidebar && !sidebar.contains(event.target as Node)) {
        setIsCollapsed(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCollapsed, pathname]);

  const menuItems = [
    { title: "Dashboard", icon: <House weight="fill" />, path: "/projects" },
    {
      title: "Create",
      icon: <Pencil weight="fill" />,
      path: "/projects/create",
    },
    {
      title: "Join",
      icon: <ArrowElbowRight weight="fill" />,
      path: "/projects/join",
    },
    // { title: 'Settings', icon: <Gear weight="fill" />, path: '/settings' },
    {
      title: "Monitor",
      icon: <ChartLine weight="fill" />,
      path: "/projects/monitor",
    },
  ];

  const isPathActive = (path: string) => {
    return usePathname() === path;
  };

  return (
    <>
      <div
        id="sidebar"
        className={`min-h-screen bg-gray-800 text-white transition-all duration-300 fixed top-14 lg:top-20 z-50 ${
          isCollapsed ? "-left-28 lg:-left-2" : "w-64"
        }`}>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-10 top-4 p-2 bg-gray-800 rounded-r-lg hover:bg-gray-700 md:hidden">
          {isCollapsed ? (
            <ArrowRight size={24} />
          ) : (
            <ArrowLeft size={24} className="hover:text-red-500" />
          )}
        </button>

        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!isCollapsed && <h1 className="text-xl font-bold">Dashboard</h1>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:block p-2 rounded-lg hover:bg-gray-700">
            {isCollapsed ? (
              <ArrowRight size={24} />
            ) : (
              <ArrowLeft size={24} className="hover:text-red-500" />
            )}
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-colors ${
                    isPathActive(item.path) ? "bg-blue-700 animate-pulse " : ""
                  }`}>
                  <span className="text-xl">{item.icon}</span>
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <button className="flex items-center gap-4 w-full p-3 rounded-lg transition-colors">
            <SignOut size={24} weight="bold" className="hover:text-red-500" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
