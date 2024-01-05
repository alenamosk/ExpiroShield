import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Product } from "@/types/types";
import NavBar from "@/components/NavBar";
import Image from "next/image";

const Product = () => {
  const router = useRouter();

  const idFromUrl = router.query.productId;
  console.log(idFromUrl);

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (idFromUrl === undefined) {
        return;
      }
      if (localStorage.getItem("token")) {
        const response = await fetch(
          `http://localhost:3001/products/${idFromUrl}`
        );
        const data = await response.json();

        setProduct(data);
      }
    };
    fetchData();
  }, [idFromUrl]);

  return (
    <>
      <NavBar />
      <h1>Detail page for the {product?.prName}</h1>

      {product !== null && product.id > 0 ? (
        <div>
          <p>Product name: {product.prName}</p>

          <Image
            className="image"
            src={product.imgUrl}
            alt={product.prName}
            width={200}
            height={170}
          />
          <p>Expires: {new Date(product.expires).toLocaleString()}</p>
          <p>Opened: {new Date(product.opened).toLocaleString()}</p>
          <p>Expires in days: {product.expiresInDays}</p>

          <p>Category: {product.category.catName}</p>
          <p>Description: {product.description}</p>
          <p>Impportant: {product.important ? "yes" : "no"}</p>
        </div>
      ) : (
        <div>Loading, or not found...</div>
      )}
    </>
  );
};
export default Product;
