import "react-vertical-timeline-component/style.min.css";
import BottleIcon from "./BottleIcon";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Product } from "@/types/types";
import { differenceInDays, isBefore } from "date-fns";
import { useEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

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

  return (
    <>
      <div>
        <h1 className="title">Your products</h1>
      </div>

      <div>
        <Accordion
          type="single"
          collapsible
          className="max-w-md mx-10  sm:mx-auto mt-7 mb-10 md:max-w-2xl border border-teal-600 px-3 rounded-xl "
        >
          <AccordionItem value="item-1" className="">
            <AccordionTrigger className="text-orange-600">
              About to expire
            </AccordionTrigger>
            <AccordionContent className="divide-y">
              {products.length > 0 ? (
                products
                  .filter((product) => {
                    const dayDifference = differenceInDays(
                      product.expires,
                      new Date()
                    );
                    return dayDifference < 7;
                  })
                  .filter((product) => !isBefore(product.expires, new Date()))
                  .map((product) => (
                    <div
                      className="flex text-xs md:text-base "
                      key={product.id}
                    >
                      {product.important ? (
                        <BottleIcon
                          className="h-6"
                          fill="#f97316"
                          stroke="#7c2d12"
                        />
                      ) : (
                        <BottleIcon
                          className="h-6"
                          fill="none"
                          stroke="#7c2d12"
                        />
                      )}
                      <p className="text-orange-400 px-2">
                        {new Date(product.expires).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <Link
                        className="text-orange-900 pr-2"
                        href={`products/${product.id}`}
                      >
                        {product.prName}
                      </Link>
                    </div>
                  ))
              ) : (
                <p>No products that about to expire</p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {products.length > 0 ? (
        <VerticalTimeline className="vertical-timeline-custom-line">
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

      <div>
        <Accordion
          type="single"
          collapsible
          className="max-w-md mx-10  sm:mx-auto my-10 md:max-w-2xl border border-zinc-400 px-3 rounded-xl "
        >
          <AccordionItem value="item-1" className="">
            <AccordionTrigger className="text-zinc-400">
              Archive
            </AccordionTrigger>
            <AccordionContent className="divide-y">
              {products.length > 0 ? (
                products
                  .filter((product) => isBefore(product.expires, new Date()))
                  .map((product) => (
                    <div
                      className="flex text-xs md:text-base "
                      key={product.id}
                    >
                      {product.important ? (
                        <BottleIcon
                          className="h-6"
                          fill="#f97316"
                          stroke="#7c2d12"
                        />
                      ) : (
                        <BottleIcon
                          className="h-6"
                          fill="none"
                          stroke="#7c2d12"
                        />
                      )}
                      <p className="text-zinc-500 px-2">
                        {new Date(product.expires).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <Link
                        className="text-zinc-500 pr-2"
                        href={`products/${product.id}`}
                      >
                        {product.prName}
                      </Link>
                    </div>
                  ))
              ) : (
                <p>No archived products</p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default Timeline;
