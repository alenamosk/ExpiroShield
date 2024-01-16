import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";
import { Category } from "@/types/types";
import { useEffect, useState } from "react";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import Product from "./products/[productId]";
import { error } from "console";
import Image from "next/image";

const dataFromFormValidator = z.object({
  prName: z.string(),
  expires: z.coerce.date(),
  opened: z.coerce.date(),
  expiresInDays: z.number().positive(),
  // imgUrl: z.string(),
  categoryId: z.coerce.number().positive(),
  description: z.string(),
  important: z.boolean(),
});

type DataFromForm = z.infer<typeof dataFromFormValidator>;

const FormText = () => {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataFromForm>({
    resolver: zodResolver(dataFromFormValidator),
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await fetch(
          "http://127.0.0.1:3001/categories"
        );

        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const publicKey = "public_E4sa9jl7zQRsEY6MhOvBe7OV2J4=";
  const urlEndpoint = "https://ik.imagekit.io/rhnxhgxw2";
  const authenticator = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/authenticationEndpoint"
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      console.error("Authentication request failed:", error);
    }
  };

  const onError = (err: any) => {
    console.log("Error", err);
  };

  const onSuccess = (res: any) => {
    setImgUrl(res.url);
    console.log("Success", res);
  };

  const handleFormSubmit = async (data: DataFromForm) => {
    if (imgUrl === null) {
      console.log("Img url was not send");
      return;
    }
    try {
      const tokenFromLS = localStorage.getItem("token");

      const response = await fetch("http://localhost:3001/add-new-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokenFromLS,
        },
        body: JSON.stringify({
          prName: data.prName,
          expires: data.expires,
          opened: data.opened,
          expiresInDays: data.expiresInDays,
          imgUrl: imgUrl,
          categoryId: data.categoryId,
          description: data.description,
          important: data.important,
        }),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("Product added successfully:", jsonResponse);
        const id = jsonResponse.newProduct.id;
        router.push(`/products/${id}`);
      } else {
        console.log("Product addition failed:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while logging in:", error);
    }
  };

  // console.log(errors);

  return (
    <main>
      <NavBar />

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        {/* <div className="flex"> */}
        <form
          className="flex flex-col p-8 space-y-2"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <h1 className="title">Add a new product</h1>
          <label htmlFor="prName">Name of the product</label>
          <input
            id="prName"
            {...register("prName")}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          ></input>
          {errors.prName && (
            <p className="error-msg">{errors.prName.message}</p>
          )}

          <label htmlFor="expires">
            Expiration date indicated on the product
          </label>
          <input
            type="date"
            min="2010-12-31"
            max="2030-12-31"
            id="expires"
            {...register("expires")}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          ></input>
          {errors.expires && (
            <p className="error-msg">{errors.expires.message}</p>
          )}

          <label htmlFor="opened">The day you opened the product</label>
          <input
            type="date"
            id="opened"
            {...register("opened")}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          ></input>
          {errors.opened && (
            <p className="error-msg">{errors.opened.message}</p>
          )}

          <label htmlFor="expiresInDays">
            Product expiration date after opening (in days)
          </label>
          <input
            type="number"
            min="2010-12-31"
            max="2030-12-31"
            id="expiresInDays"
            {...register("expiresInDays", { valueAsNumber: true })}
            placeholder="3 months = 90 days, 6 months = 180 days"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          ></input>

          {errors.expiresInDays && (
            <p className="error-msg">{errors.expiresInDays.message}</p>
          )}

          <label htmlFor="imgUrl">Upload a photo of the product</label>
          {imgUrl && (
            <div>
              <Image src={imgUrl} width={100} height={100} alt="product" />
              <button
                onClick={() => {
                  setImgUrl(null);
                }}
              >
                Remove
              </button>
            </div>
          )}
          <IKContext
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={authenticator}
          >
            <IKUpload
              fileName="product_"
              onError={onError}
              onSuccess={onSuccess}
            />
          </IKContext>

          <label htmlFor="categoryId">Choose a category</label>
          <select
            id="categoryId"
            {...register("categoryId")}
            defaultValue={"placeholder"}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            <option value={"placeholder"}>Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.catName}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="error-msg">{errors.categoryId.message}</p>
          )}

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register("description")}
            placeholder="May include instructions, ingredients, storage conditions and everything that is important for you about the product"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          ></textarea>
          {errors.description && (
            <p className="error-msg">{errors.description.message}</p>
          )}

          <label htmlFor="important">Is the product important to track?</label>
          <input
            type="checkbox"
            id="important"
            {...register("important")}
            className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
          ></input>
          {errors.important && (
            <p className="error-msg">{errors.important.message}</p>
          )}

          <button
            type="submit"
            id="submit"
            className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            Submit
          </button>
        </form>
        <div>
          {/* <Image src="/cream.JPG" width={100} height={200} alt="cream" /> */}
          {/* "h-48 w-full object-cover md:h-full md:w-100" */}
          {/* <img
              className="h-full w-full object-cover md:h-full "
              src="cream.JPG"
              alt="Logo"
            /> */}
        </div>
      </div>
      {/* </div> */}
    </main>
  );
};

export default FormText;
