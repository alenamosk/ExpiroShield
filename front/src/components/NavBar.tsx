import Link from "next/link";
import { useState, useEffect } from "react";
import ProductsIcon from "./ProductsIcon";
import ShieldIcon from "./ShieldIcon";

const NavBar = () => {
  const [token, setToken] = useState<null | string>(null);
  useEffect(() => {
    const tokenFromLS = localStorage.getItem("token");
    if (!tokenFromLS) {
      setToken("noToken");
    } else {
      setToken("hasToken");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    location.reload();
  };

  if (token === "noToken") {
    return (
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <Link className="flex flex-shrink-0 items-center" href="/">
                <img src="Logo(1).png " className="logo"></img>
              </Link>
            </div>

            <div className="flex space-x-4">
              <a
                href="/login"
                className="text-orange-600 hover:bg-orange-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                Login
              </a>
            </div>

            <div className="flex space-x-4">
              <a
                href="/register"
                className="text-orange-600 hover:bg-orange-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (token === "hasToken") {
    return (
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex space-x-4 sm:mr-6">
              <a href="/">
                <img
                  className="h-8 w-auto sm:h-10 mx-4"
                  src="Logo(1).png"
                  alt="logo"
                />
              </a>
            </div>

            <div className="flex">
              <div className="sm:ml-6 sm:block ml-auto">
                <div className="flex space-x-4">
                  <a
                    href="/add-new-product"
                    className="text-orange-900 hover:bg-orange-50 sm:hover:bg-teal-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    <div className="flex h-8 sm:hidden">
                      <ShieldIcon fill="#7c2d12" stroke="none" />
                    </div>
                    <span className="hidden sm:inline">Add new product</span>
                  </a>
                </div>
              </div>

              <div className="sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <a
                    href="/main"
                    className="text-orange-900 hover:bg-orange-50 sm:hover:bg-teal-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    <div className="flex h-8 sm:hidden">
                      <ProductsIcon fill="#7c2d12" stroke="none" />
                    </div>
                    <span className="hidden sm:inline">My products page</span>
                  </a>
                </div>
              </div>

              <div className="flex space-x-4 sm:ml-6">
                <button
                  className=" bg-orange-700 text-white rounded-md px-3 py-2 text-sm font-medium"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};
export default NavBar;
