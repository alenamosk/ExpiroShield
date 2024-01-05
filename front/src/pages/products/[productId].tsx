import Image from "next/image";
import NavBar from "@/components/NavBar";
import { Product } from "@/types/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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

      {product !== null && product.id > 0 ? (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="md:shrink-0">
              <Image
                className="h-48 w-full object-cover md:h-full md:w-100"
                src={product.imgUrl}
                alt={product.prName}
                width={200}
                height={170}
              />
            </div>
            <div className="p-8">
              <h1 className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                {product.prName}
              </h1>
              <div className="uppercase tracking-wide text-sm text-orange-600 font-semibold">
                Expires: {new Date(product.expires).toLocaleString()}
              </div>
              <div className="uppercase tracking-wide text-sm text-orange-600 font-semibold">
                Opened: {new Date(product.opened).toLocaleString()}
              </div>
              <div className="uppercase tracking-wide text-sm text-orange-600 font-semibold">
                Expires in days: {product.expiresInDays}
              </div>
              <div className="uppercase tracking-wide text-sm text-orange-600 font-semibold">
                Important: {product.important ? "yes" : "no"}
              </div>

              <p className="mt-2 text-slate-500">
                Description: {product.description}
              </p>
              <p className="mt-2 text-slate-500">
                Category: {product.category.catName}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading, or not found...</div>
      )}
    </>
  );
};
export default Product;
