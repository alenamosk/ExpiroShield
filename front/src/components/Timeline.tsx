import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Product } from "@/types/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShieldCheckIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";
import BottleIcon from "./BottleIcon";
import { isBefore } from "date-fns";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";

const Timeline = () => {
  const [products, setProducts] = useState<Product[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenFromLS = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-products`,
          {
            headers: {
              Authorization: "Bearer " + tokenFromLS,
            },
          }
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  // const archivedItems = products
  //   .filter((product) => isBefore(product.expires, new Date()))
  //   .map((product) => (
  //     <div key={product.id}>
  //       {product.important ? (
  //         <BottleIcon className="h-10" fill="#f97316" stroke="#7c2d12" />
  //       ) : (
  //         <BottleIcon className="h-10" fill="none" stroke="#7c2d12" />
  //       )}
  //       <Link href={`products/${product.id}`}>{product.prName}</Link>
  //       {new Date(product.expires).toLocaleString("en-US", {
  //         year: "numeric",
  //         month: "short",
  //         day: "numeric",
  //       })}
  //     </div>
  //   ));

  return (
    <>
      <div>
        <h1 className="title">Your products</h1>
      </div>

      <div>
        {products.length > 0 ? (
          products
            .filter((product) => isBefore(product.expires, new Date()))
            .map((product) => (
              <div key={product.id}>
                {product.important ? (
                  <BottleIcon
                    className="h-10"
                    fill="#f97316"
                    stroke="#7c2d12"
                  />
                ) : (
                  <BottleIcon className="h-10" fill="none" stroke="#7c2d12" />
                )}
                <Link href={`products/${product.id}`}>{product.prName}</Link>
                {new Date(product.expires).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            ))
        ) : (
          <p>No archived products</p>
        )}
      </div>

      {products.length > 0 ? (
        <VerticalTimeline className="vertical-timeline-custom-line">
          {/* Below are 'archived' */}
          {/* {products
            .filter((product) => isBefore(product.expires, new Date()))
            .map((product) => {
              return (
                <div key={product.id}>
                  {product.important ? (
                    <BottleIcon
                      className="h-10"
                      fill="#f97316"
                      stroke="#7c2d12"
                    />
                  ) : (
                    <BottleIcon className="h-10" fill="none" stroke="#7c2d12" />
                  )}
                  <Link href={`products/${product.id}`}>{product.prName}</Link>
                  {new Date(product.expires).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              );
            })} */}
          {/* Below should be not archived */}
          {products
            .filter((product) => !isBefore(product.expires, new Date()))
            .map((product) => (
              <VerticalTimelineElement
                key={product.id}
                date={new Date(product.expires).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
                dateClassName="date"
                className="vertical-timeline-element"
                iconStyle={{ background: "#ffedd5" }}
                icon={
                  // product.important ? (
                  //   <TooltipProvider>
                  //     <Tooltip>
                  //       <TooltipTrigger>
                  //         <BottleIcon
                  //           className="w-6 h-6 pb-1"
                  //           fill="#f97316"
                  //           stroke="#7c2d12"
                  //         />
                  //       </TooltipTrigger>

                  //       <TooltipContent>
                  //         <p>You have marked this as an important product</p>
                  //       </TooltipContent>
                  //     </Tooltip>
                  //   </TooltipProvider>
                  // ) : (
                  //   <TooltipProvider>
                  //     <Tooltip>
                  //       <TooltipTrigger>
                  //         <BottleIcon
                  //           className="w-6 h-6 pb-1"
                  //           fill="none"
                  //           stroke="#7c2d12"
                  //         />
                  //       </TooltipTrigger>

                  //       <TooltipContent>
                  //         <p>You have marked this as not important product</p>
                  //       </TooltipContent>
                  //     </Tooltip>
                  //   </TooltipProvider>

                  // <BottleIcon
                  //   className="w-10 h-10 pb-1"
                  //   fill="#f97316"
                  //   stroke="#7c2d12"
                  // />
                  product.important ? (
                    <BottleIcon fill="#f97316" stroke="#7c2d12" />
                  ) : (
                    <BottleIcon fill="none" stroke="#7c2d12" />
                  )
                }
              >
                <h3 className="vertical-timeline-element-title">
                  <Link href={`products/${product.id}`}>{product.prName}</Link>
                </h3>
              </VerticalTimelineElement>
            ))}
        </VerticalTimeline>
      ) : (
        <div className="text-center mt-6 mx-14 text-lg  text-gray-500">
          <p>You don{"'"}t have any products to track yet.</p>
          <p>
            Please click {'"'}Add new product{'"'} to get started.
          </p>
        </div>
      )}
    </>
  );
};

export default Timeline;
