import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="position-fixed w-100 top-0 z-3 bg-white bg-opacity-95 shadow-sm">
      <nav className="navbar navbar-expand-lg py-2">
        <div className="container">
          <Link href="/" className="navbar-brand d-flex align-items-center">
            <Image
              src="/gorilla-icon 1.png"
              alt="WCH Logo"
              width={40}
              height={40}
              className="me-2 hover:scale-110 transition-transform duration-300"
            />
            <span className="font-serif text-xl tracking-wide text-emerald-800 hover:text-emerald-600 transition-colors">
              Wildlife Conservation Hub
            </span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto font-sans">
              {["About", "Projects", "Community", "Resources", "Contact"].map(
                (item) => (
                  <li key={item} className="nav-item">
                    <Link
                      href={
                        item === "Community"
                          ? "/community"
                          : `/${item.toLowerCase()}`
                      }
                      className="nav-link px-4 text-gray-700 hover:text-emerald-600 transition-colors relative group"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </li>
                )
              )}
            </ul>
            <ul className="navbar-nav ms-auto font-sans">
              {!session ? (
                <>
                  <li className="nav-item">
                    <Link
                      href="/register"
                      className="nav-link bg-success text-white px-4 py-2 rounded hover:bg-emerald-600 active:bg-emerald-700 transition-colors"
                    >
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/login"
                      className="nav-link bg-success text-white px-4 py-2 rounded hover:bg-emerald-600 active:bg-emerald-700 transition-colors ms-2"
                    >
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button
                    onClick={() => signOut()}
                    className="nav-link bg-success text-white px-4 py-2 rounded hover:bg-emerald-600 active:bg-emerald-700 transition-colors"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
