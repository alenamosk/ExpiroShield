import Image from "next/image";
import { Product } from "@/types/types";
import { useEffect, useState } from "react";

const Main = () => {
  const [products, setProducts] = useState<Product[] | null>(null);

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
      <h1>Your products</h1>
      <button>add a new product</button>

      {products !== null && products.length > 0 ? (
        <div>
          {products.map((product) => (
            <div key={product.id}>
              <h2>{product.prName}</h2>

              <Image
                className="image"
                src={product.imgUrl}
                alt={product.prName}
                width={200}
                height={170}
              />
              <p>Expires: {new Date(product.expires).toLocaleString()}</p>
              <p>Expires in days: {product.expiresInDays}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading, or not found...</div>
      )}
    </>
  );
};
export default Main;
