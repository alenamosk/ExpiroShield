import NavBar from "@/components/NavBar";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <NavBar />
      <h1>Home page</h1>

      <p>Description</p>

      <Link href="/register">
        <button>Get started</button>
      </Link>
    </main>
  );
}
