import NavBar from "@/components/NavBar";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <NavBar />
      <div className="grid grid-cols-4 gap-4 mx-7">
        <div className="col-start-2 col-span-2 border border-black">
          <h1>01 - 4 ExpiroShield</h1>
        </div>

        <div className="col-span-2 border border-black">
          <h2> 02 - 4 Description</h2>
          <p>
            ExpiroShield is a user-friendly application designed to help users
            manage and monitor the expiration dates of various products. This
            app provides a convenient way for users to input, organize, and
            track the expiration dates of items such as groceries, medicines,
            cosmetics, and more.
          </p>
        </div>

        <div className="col-start-3 col-span-2 row-span-3 border border-black">
          <p>04 - 1 There should be Carousel</p>
        </div>

        <div className="col-start-1 col-span-2 row-span-2 border border-black">
          <h1>03 - 2 Features or benefits</h1>
        </div>

        <div className=" col-span-4 border border-black">
          <p>05 - 4</p>
          <Link href="/register">
            <button className="rounded-md bg-teal-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
