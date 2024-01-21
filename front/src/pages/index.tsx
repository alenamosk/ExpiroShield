import NavBar from "@/components/NavBar";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MagnifyingGlassIcon from "@/components/MagnifyingGlass";
import TagIcon from "@/components/TagIcon";
import ComputerIcon from "@/components/ComputerIcon";
import ShieldIcon from "@/components/ShieldIcon";
import ProductsIcon from "@/components/ProductsIcon";
import EditIcon from "@/components/EditIcon";
import DeleteIcon from "@/components/DeleteIcon";
import LoginIcon from "@/components/LoginIcon";

export default function Home() {
  return (
    <main>
      <NavBar />
      <div className="grid grid-cols-4 gap-4 my-10 mx-7 sm:mx-auto  max-w-7xl px-2 sm:px-6 lg:px-8">
        {/* <div className="col-start-2 col-span-2 border border-black">
          <h1>01 - 4 ExpiroShield</h1>
        </div> */}

        <div className="col-span-4  sm:col-span-2">
          <h2 className="text-5xl font-bold tracking-tight text-teal-700 sm:text-5xl">
            Stay Fresh, Stay Informed:
          </h2>
          <h2 className="text-xl font-bold tracking-tight text-teal-700 sm:text-2xl">
            ExpiroShield - Your Expiry Date Guardian
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-500 text-justify">
            ExpiroShield is an application designed to help users manage and
            monitor the expiration dates of various products. This app provides
            a convenient way for users to input and track the expiration dates
            of items such as groceries, medicines, cosmetics, and more.
          </p>
        </div>

        <div className="col-start-1 col-span-4 sm:col-start-3 sm:col-span-2 row-span-3 ">
          <div className="flex items-center justify-center">
            <Carousel className="mx-3 my-3 w-3/5 ">
              <CarouselContent className="">
                <CarouselItem className="flex items-center justify-center">
                  <img
                    className="h-96 w-auto 	object-contain sm:h-96 md:h-96 mx-4 "
                    src="/01-addNewProduct.png"
                    alt="logo"
                  />
                </CarouselItem>
                <CarouselItem className="flex items-center justify-center">
                  <img
                    className="h-96 w-auto 	object-contain sm:h-96 md:h-96 mx-4"
                    src="/02-timeline.png"
                    alt="logo"
                  />
                </CarouselItem>
                <CarouselItem className="flex items-center justify-center">
                  <img
                    className="h-96 w-auto 	object-contain sm:h-96 md:h-96 mx-4"
                    src="/03-productId.png"
                    alt="logo"
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>

        <div className="col-start-1 col-span-4 mt-10 sm:col-span-2 row-span-2 ">
          {/* <h1 className=" text-xl font-bold tracking-tight text-orange-700 sm:text-2xl">
            Features
          </h1> */}

          <h2 className="mt-3 text-lg font-bold  text-gray-500 tracking-tight sm:text-2xl">
            Accuracy in tracking
          </h2>
          <p className="text-lg leading-8 text-gray-500 text-justify">
            It has an algorithm which calculate precise expiration dates based
            on product information and date when you opened a product.
          </p>

          {/* <span className="flex h-7 border border-black">
            <ComputerIcon fill="none" stroke="#7c2d12" />
          </span> */}
          <h2 className="mt-3 text-lg font-bold  text-gray-500 tracking-tight sm:text-2xl">
            Intuitive Interface
          </h2>
          <p className="text-lg leading-8 text-gray-500 text-justify">
            The app has a user-friendly interface that allows users to easily
            add, edit, and remove products.
          </p>

          <h2 className="mt-3 text-lg font-bold  text-gray-500 tracking-tight sm:text-2xl">
            Product Categorization
          </h2>
          <p className="text-lg leading-8 text-gray-500 text-justify">
            Products can be categorized based on types, such as food,beverages,
            medications, etc.
          </p>
        </div>

        <div className="col-span-4 border border-black">
          <h1>Usage</h1>
          <p>
            <div className="flex h-7">
              <LoginIcon fill="#7c2d12" stroke="none" />
            </div>
            Create an account or login
          </p>
          <p>
            <div className="flex h-7">
              <ShieldIcon fill="#7c2d12" stroke="none" />
            </div>
            Add product: input details about the product you want to track,
            including the name, factory expiration date, the day you opened the
            product, product expiration date after opening, category,
            discription and importance
          </p>
          <p>
            <div className="flex h-7 ">
              <ProductsIcon fill="#7c2d12" stroke="none" />
            </div>
            Explore the timeline
          </p>
          <p>
            <div className="flex h-7 ">
              <EditIcon fill="none" stroke="#7c2d12" />
            </div>
            Update and{" "}
            <div className="flex h-7 ">
              <DeleteIcon fill="none" stroke="#7c2d12" />
            </div>
            remove products
          </p>
          <p></p>
        </div>

        <div className="col-span-4 border border-black">
          <p>05 - 4</p>
          <Link href="/register">
            <button className="rounded-md bg-orange-900 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
