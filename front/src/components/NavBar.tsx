import Link from "next/link";

const NavBar = () => {
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
};
export default NavBar;
