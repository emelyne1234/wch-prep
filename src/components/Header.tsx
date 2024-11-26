"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Drawers } from "../components/Drawers";

const Header = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-30 bg-white bg-opacity-95 shadow-sm">
        <div className="max-w-[90vw] mx-auto flex items-center justify-between py-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/gorilla-icon 1.png"
              alt="WCH Logo"
              width={40}
              height={40}
              className="mr-2 hover:scale-110 transition-transform duration-300"
            />
            <span className="font-serif text-xl tracking-wide text-emerald-800 hover:text-emerald-600 transition-colors hidden md:block">
              Wildlife Conservation Hub
            </span>
          </Link>

          <button
            className="lg:hidden p-2 rounded-md"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <div className="w-6 h-6 flex flex-col justify-between items-center">
              <span
                className={`block w-6 h-0.5 bg-gray-600 transform transition duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2.5' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-gray-600 transition duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-gray-600 transform transition duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''
                }`}
              />
            </div>
          </button>

          <div
            className={`${
              isMenuOpen ? 'flexn items-center flex-col' : 'hidden'
            } lg:flex lg:items-center  lg:w-auto absolute lg:relative top-full left-0 w-full bg-white lg:bg-transparent`}
          >
            <ul className="flex px-4 flex-col lg:flex-row lg:space-x-8 space-y-4 lg:space-y-0 py-3 lg:p-0 font-sans">
              {["Explore", "Projects", "Community", "Resources", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={
                        item === "Community"
                          ? "/community"
                          : `/${item.toLowerCase()}`
                      }
                      className="text-gray-700 hover:text-emerald-600 transition-colors relative group block gap-2 border-b border-gray-200 pb-2 lg:border-b-0"
                      onClick={() => setIsMenuOpen(false)} 
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </li>
                )
              )}
            </ul>

            <div className="flex flex-col px-4 gap-2 lg:flex-row lg:items-center lg:ml-8 space--4 lg:space-y-0 lg:space-x-4  lg:p-0">
              {!session ? (
                <>
                  <Link
                    href="/register"
                    className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 active:bg-emerald-700 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                  <Link
                    href="/login"
                    className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 active:bg-emerald-700 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/profile"
                    className="bg-emerald-500 text-white px-4 py-2 rounded transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </>
              ) : (
                <div className="cursor-pointer">
                <Drawers
                onClickDrawer= {  <Image src={session.user?.image} alt="User Avatar" width={30} height={30} className="rounded-full" />}
                />
                </div>
              )}
            </div>
          </div>
        </div>
    </header>
  );
};

export default Header;