import Link from "next/link";
import { useState, useEffect } from "react";

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
        <div className="primary-top">
          <header className="primary-header">
            <div>
              <Link className="home" href="/">
                <img src="Logo(1).png" className="logo"></img>
              </Link>
            </div>
          </header>

          <nav>
            <ul className="primary-navigation">
              <Link className="login" href="/login">
                Login
              </Link>
              <Link className="register" href="/register">
                Register
              </Link>
            </ul>
          </nav>
        </div>
      </>
    );
  }

  if (token === "hasToken") {
    return (
      <>
        <div className="primary-top">
          <header className="primary-header">
            <div>
              <Link className="home" href="/">
                <img src="Logo(1).png" className="logo"></img>
              </Link>
            </div>
          </header>

          <Link href="/add-new-product">
            <button>Add new product</button>
          </Link>
          <button className="button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </>
    );
  } else {
    return null;
  }
};
export default NavBar;
