import Link from "next/link";

const LogoLink = () => {
  return (
    <>
      <Link className="home" href="/">
        <img alt="logotype" src="logo-brown.png" className="logoLink"></img>
      </Link>
    </>
  );
};

export default LogoLink;
