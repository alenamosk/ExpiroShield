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
      <div>
        <h1 className="title">Your products</h1>
      </div>

      {products.length > 0 ? (
        <VerticalTimeline className="vertical-timeline-custom-line">
          {products.map((product) => (
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
        <p>Loading</p>
      )}
    </>
  );
};

export default Timeline;