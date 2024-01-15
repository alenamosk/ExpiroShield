import Image from "next/image";
import NavBar from "@/components/NavBar";
import { Product } from "@/types/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BottleIcon from "@/components/BottleIcon";
import EditIcon from "@/components/EditIcon";
import Link from "next/link";
import DeleteIcon from "@/components/DeleteIcon";

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
        const tokenFromLS = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3001/products/${idFromUrl}`,
          {
            headers: {
              Authorization: "Bearer " + tokenFromLS,
            },
          }
        );
        const data = await response.json();

        setProduct(data);
      }
    };
    fetchData();
  }, [idFromUrl]);

  const handleDelete = async (idFromUrl: number) => {
    if (localStorage.getItem("token")) {
      const tokenFromLS = localStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:3001/products/delete/${idFromUrl}`,
          {
            headers: {
              Authorization: "Bearer " + tokenFromLS,
            },
            method: "DELETE",
          }
        );

        if (response.ok) {
          console.log("Product deleted successfully");
          router.push("/my-products");
        } else {
          console.error("Error deleting product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

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
              <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
                <span
                  className="icon-small"
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                >
                  {product.important ? (
                    <BottleIcon fill="#f97316" stroke="#7c2d12" />
                  ) : (
                    <BottleIcon fill="none" stroke="#7c2d12" />
                  )}
                </span>
                {product.prName}{" "}
                <span
                  className="icon-small"
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                >
                  <Link className="edit" href={`/products/edit/${idFromUrl}`}>
                    <EditIcon fill="none" stroke="#7c2d12" />
                  </Link>
                </span>
                {/* <span
                  className="icon-small"
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                >
                  <Link className="delete" href="/main">
                    <DeleteIcon fill="none" stroke="#7c2d12" />
                  </Link>
                </span> */}
                <button
                  onClick={(e: any) => handleDelete(product?.id)}
                  className="icon-small"
                >
                  <DeleteIcon fill="none" stroke="#7c2d12" />
                </button>
              </h1>
              <div className="uppercase tracking-wide text-sm text-orange-600 font-semibold">
                Expires:{" "}
                {new Date(product.expires).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>

              {/* <div className="uppercase tracking-wide text-sm text-orange-600 font-semibold">
                Opened:{" "}
                {new Date(product.opened).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="uppercase tracking-wide text-sm text-orange-600 font-semibold">
                Expires in days: {product.expiresInDays}
              </div> */}

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
