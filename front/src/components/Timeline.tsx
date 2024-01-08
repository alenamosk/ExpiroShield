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

const Timeline = () => {
  const [products, setProducts] = useState<Product[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenFromLS = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/main", {
          headers: {
            Authorization: "Bearer " + tokenFromLS,
          },
        });
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
      <h1 className="title">Your products</h1>

      {products.length > 0 ? (
        <VerticalTimeline>
          {products.map((product) => (
            <VerticalTimelineElement
              key={product.id}
              date={new Date(product.expires).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
              dateClassName="date"
              icon={
                product.important ? (
                  <BottleIcon fill="red" stroke="white" />
                ) : (
                  <BottleIcon fill="none" stroke="black" />
                )
              }
            >
              <h3 className="vertical-timeline-element-title">
                <Link href={`products/${product.id}`}>{product.prName}</Link>
              </h3>
              <div className="image-container"></div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default Timeline;
