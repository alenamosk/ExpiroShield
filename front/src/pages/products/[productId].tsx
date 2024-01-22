import Image from "next/image";
import NavBar from "@/components/NavBar";
import { Product } from "@/types/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BottleIcon from "@/components/BottleIcon";
import EditIcon from "@/components/EditIcon";
import Link from "next/link";
import DeleteIcon from "@/components/DeleteIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
                  {/* {product.important ? "IMPORTANT" : "NOT IMPORTANT"} */}
                  {product.important ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <BottleIcon
                            className="w-6 h-6 pb-1"
                            fill="#f97316"
                            stroke="#7c2d12"
                          />
                        </TooltipTrigger>

                        <TooltipContent>
                          <p>You have marked this as an important product</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <BottleIcon
                            className="w-6 h-6 pb-1"
                            fill="none"
                            stroke="#7c2d12"
                          />
                        </TooltipTrigger>

                        <TooltipContent>
                          <p>You have marked this as not important product</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    // <BottleIcon fill="#f97316" stroke="#7c2d12" />
                    // <BottleIcon fill="none" stroke="#7c2d12" />
                  )}
                </span>
                {product.prName}{" "}
                <span
                  className="icon-small"
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                >
                  <Link className="edit" href={`/edit/${idFromUrl}`}>
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
                <Dialog>
                  <span
                    className="icon-small"
                    style={{
                      display: "inline-block",
                      verticalAlign: "middle",
                    }}
                  >
                    <DialogTrigger asChild>
                      <button
                        // onClick={(e: any) => handleDelete(product?.id)}
                        className="icon-small"
                      >
                        <DeleteIcon fill="none" stroke="#7c2d12" />
                      </button>
                    </DialogTrigger>
                  </span>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Are you absolutely sure you want to delete the product?
                      </DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your product.
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                      <Button
                        className="bg-orange-600  text-white  hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                        onClick={(e: any) => handleDelete(product?.id)}
                        type="submit"
                      >
                        Delete
                      </Button>

                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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

              <p className="mt-2 text-slate-500 text-justify ">
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
