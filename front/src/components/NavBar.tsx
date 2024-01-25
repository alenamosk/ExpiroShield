import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import ProductsIcon from "./ProductsIcon";
import ShieldIcon from "./ShieldIcon";

const NavBar = () => {
  const router = useRouter();

  const [token, setToken] = useState<boolean>(false);
  useEffect(() => {
    console.log("Hello from navbar");
    const tokenFromLS = localStorage.getItem("token");
    if (tokenFromLS) {
      setToken(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(false);
    router.push("/");
  };

  if (!token) {
    return (
      <>
        <div className="mx-5 my-5 sm:mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex space-x-4 sm:mr-6">
              <Link href="/">
                <img
                  className="h-10 w-auto sm:h-10 mx-4"
                  src="/logo-brown.png"
                  alt="logo"
                />
              </Link>
            </div>

            <div className="flex ">
              <div className="sm:ml-6 sm:block pxl-3">
                <div className="flex space-x-4">
                  <Link
                    href="/login"
                    className="text-orange-600 hover:bg-orange-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Login
                  </Link>
                </div>
              </div>

              <div className="sm:ml-6 sm:block px-2">
                <div className="flex space-x-4">
                  <Link
                    href="/register"
                    className="text-orange-600 hover:bg-orange-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (token) {
    return (
      <>
        <div className="mx-5 my-5 sm:mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex space-x-4 sm:mr-6">
              <Link href="/">
                <img
                  className="h-10 w-auto sm:h-10 mx-4"
                  src="/logo-brown.png"
                  alt="logo"
                />
              </Link>
            </div>

            <div className="flex ">
              <div className="sm:ml-6 sm:block pxl-3">
                <div className="flex space-x-4">
                  <Link
                    href="/add-new-product"
                    className="text-orange-900 hover:bg-orange-100 sm:hover:bg-teal-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    <div className="flex h-7 sm:hidden">
                      <ShieldIcon fill="#7c2d12" stroke="none" />
                    </div>
                    <span className="hidden sm:inline">Add new product</span>
                  </Link>
                </div>
              </div>

              <div className="sm:ml-6 sm:block px-2">
                <div className="flex space-x-4">
                  <Link
                    href="/my-products"
                    className="text-orange-900 hover:bg-orange-100 sm:hover:bg-teal-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    <div className="flex h-7 sm:hidden ">
                      <ProductsIcon fill="#7c2d12" stroke="none" />
                    </div>
                    <span className="hidden sm:inline">My products page</span>
                  </Link>
                </div>
              </div>

              <div className="flex space-x-4 h-8 m-1 sm:h-9 sm:m-0 sm:ml-6">
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
