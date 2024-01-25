import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const GetStartedButton = () => {
  const router = useRouter();

  const [token, setToken] = useState<null | string>(null);
  useEffect(() => {
    const tokenFromLS = localStorage.getItem("token");
    if (!tokenFromLS) {
      setToken("noToken");
    } else {
      setToken("hasToken");
    }
  }, []);

  if (token === "noToken") {
    return (
      <>
        <div className="flex justify-center col-span-4 ">
          <Link href="/register">
            <button className="rounded-md bg-orange-900 px-10 sm:px-40 py-2 my-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
              Get started
            </button>
          </Link>
        </div>
      </>
    );
  }
  if (token === "hasToken") {
    return (
      <>
        <div className="flex justify-center col-span-4 ">
          <Link href="/my-products">
            <button className="rounded-md bg-orange-900 px-10 sm:px-40 py-2 my-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
              Get started
            </button>
          </Link>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default GetStartedButton;
