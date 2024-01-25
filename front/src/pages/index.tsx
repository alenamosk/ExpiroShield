import NavBar from "@/components/NavBar";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ShieldIcon from "@/components/ShieldIcon";
import ProductsIcon from "@/components/ProductsIcon";
import EditIcon from "@/components/EditIcon";
import DeleteIcon from "@/components/DeleteIcon";
import LoginIcon from "@/components/LoginIcon";
import GetStartedButton from "@/components/GetStartedButton";

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

        <div className="col-span-4 text-gray-500 ">
          <div className="col-span-4 relative grid grid-cols-1 gap-8 mt-10 my-10 text-justify md:grid-cols-3 lg:max-w-none lg:grid-cols-5 ">
            {/* <h1>Usage</h1> */}

            {/* <div className="">
              <div className="flex justify-start h-9 p-1 my-3 shrink-0 sm:justify-center">
                <LoginIcon fill="#0f766d" stroke="none" />
                <p className="p-1 font-bold">Create an account </p>
              </div>

              <p className="text-sm">
                Do it in three simple clicks. Input your email, come up with a
                password, and press "confirm."
              </p>
            </div>

            <div className="">
              <div className="flex justify-start h-10 p-1 my-3 shrink-0 sm:justify-center">
                <ShieldIcon fill="#0f766d" stroke="none" />
                <p className="p-1 font-bold">Add product</p>
              </div>

              <p className="text-sm">
                Input details about the product you would like to track. 3 dates
                contribute to the computation of the final expiration date: the
                factory expiration date, the date of product opening, and the
                period after opening ⓘ.
              </p>
            </div>

            <div className="">
              <div className="flex justify-start h-10 p-1 my-3 shrink-0 sm:justify-center">
                <ProductsIcon fill="#0f766d" stroke="none" />
                <p className="p-1 font-bold">Explore the timeline</p>
              </div>

              <p className="text-sm">
                {" "}
                Next to each product, you'll find an icon: a vibrant orange
                color signifies that you've designated the product as important,
                while an unfilled icon indicates that the product is considered
                less significant.
              </p>
            </div>

            <div className="">
              <div className="flex justify-start h-10 p-1 my-3 shrink-0 sm:justify-center">
                <EditIcon fill="none" stroke="#0f766d" />
                <p className="p-1 font-bold">Update product</p>
              </div>

              <p className="text-sm">
                If you've made an error while inputting product details or added
                an item you intend to open at a later time, the editing function
                is available for you.
              </p>
            </div>

            <div className="">
              <div className="flex justify-start h-10 p-1 my-3 shrink-0 sm:justify-center">
                <DeleteIcon fill="none" stroke="#0f766d" />
                <p className="p-1 font-bold">Remove products</p>
              </div>

              <p className="text-sm">
                If you no longer wish to keep a particular product, you can
                easily remove it
              </p>
            </div> */}
          </div>

          {/* <div className="flex justify-center col-span-4 ">
            <Link href="/register">
              <button className="rounded-md bg-orange-900 px-10 sm:px-40 py-2 my-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
                Get started
              </button>
            </Link>
          </div> */}
        </div>

        <GetStartedButton />
      </div>
    </main>
  );
}
