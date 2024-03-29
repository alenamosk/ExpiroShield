import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";
import { Category, Product, ProductFromApi } from "@/types/types";
import { useEffect, useState } from "react";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import Image from "next/image";

const dataFromFormValidator = z.object({
  prName: z.string(),
  expires: z.coerce.date().or(z.string()),
  opened: z.coerce.date().or(z.string()),
  expiresInDays: z.number().positive(),
  categoryId: z.coerce.number().positive().or(z.string()),
  description: z.string(),
  important: z.boolean(),
});

type DataFromForm = z.infer<typeof dataFromFormValidator>;

const EditProductById = () => {
  const router = useRouter();

  const idFromUrl = router.query.productId;

  const [categories, setCategories] = useState<Category[]>([]);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductFromApi | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<DataFromForm>({
    resolver: zodResolver(dataFromFormValidator),
  });
  const formState = getValues();
  console.log(formState);

  useEffect(() => {
    const fetchCategories = async () => {
      console.log("FETCH CATEGORIES");
      try {
        const categoriesResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );

        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
        setValue("categoryId", "1");
        watch("categoryId");
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProductById = async () => {
      if (idFromUrl === undefined) {
        return;
      }
      if (localStorage.getItem("token")) {
        try {
          const tokenFromLS = localStorage.getItem("token");
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/products/${idFromUrl}`,
            {
              headers: {
                Authorization: "Bearer " + tokenFromLS,
              },
            }
          );
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      }
    };

    fetchCategories();
    fetchProductById();
  }, [idFromUrl, setValue, watch]);

  useEffect(() => {
    if (product && categories.length > 0) {
      const expiresDate = new Date(product.expires);
      const formattedExpiresDate = product.expires
        ? expiresDate.toISOString().split("T")[0]
        : "";

      const openedDate = new Date(product.opened);
      const formattedOpenedDate = product.opened
        ? openedDate.toISOString().split("T")[0]
        : "";

      setValue("prName", product.prName);
      setValue("expires", formattedExpiresDate);
      setValue("opened", formattedOpenedDate);
      setValue("expiresInDays", product.expiresInDays);
      setValue("categoryId", product.categoryId, { shouldValidate: true });
      setValue("description", product.description);
      setValue("important", product.important);

      // Set image url
      setImgUrl(product.imgUrl);
    }
  }, [product, categories, setValue]);

  const category = watch("categoryId");
  console.log("Watched category", category);

  const publicKey = "public_E4sa9jl7zQRsEY6MhOvBe7OV2J4=";
  const urlEndpoint = "https://ik.imagekit.io/rhnxhgxw2";
  const authenticator = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/authenticationEndpoint`
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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/edit/${idFromUrl}`,
        {
          method: "PATCH",
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
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("Product edited successfully:", jsonResponse);
        const id = jsonResponse.updatedProduct.id;
        router.push(`/products/${id}?updated=true`);
      } else {
        console.log("Product edition failed:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while logging in:", error);
    }
  };

  return (
    <main>
      <NavBar />

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl ">
        {/* <div className="flex"> */}
        <form
          className="flex flex-col p-8 space-y-2"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <h1 className="title">Edit the product</h1>
          <label htmlFor="prName">Name of the product</label>
          <input
            id="prName"
            {...register("prName")}
            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-orange-600 sm:text-sm sm:leading-6"
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
            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-orange-600 sm:text-sm sm:leading-6"
          ></input>
          {errors.expires && (
            <p className="error-msg">{errors.expires.message}</p>
          )}

          <label htmlFor="opened">The day you opened the product</label>
          <input
            type="date"
            id="opened"
            {...register("opened")}
            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-orange-600 sm:text-sm sm:leading-6"
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
            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-orange-600 sm:text-sm sm:leading-6"
          ></input>

          {errors.expiresInDays && (
            <p className="error-msg">{errors.expiresInDays.message}</p>
          )}

          <label htmlFor="imgUrl">Upload a photo of the product</label>
          {imgUrl && (
            <div className="flex items-start">
              <Image src={imgUrl} width={100} height={100} alt="product" />
              <button
                className="rounded-md bg-orange-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                onClick={() => {
                  setImgUrl(null);
                }}
              >
                X
              </button>
            </div>
          )}

          {!imgUrl && (
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
          )}

          <label htmlFor="categoryId">Choose a category</label>
          <select
            id="categoryId"
            {...register("categoryId")}
            // defaultValue={"placeholder"}
            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-orange-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          ></textarea>
          {errors.description && (
            <p className="error-msg">{errors.description.message}</p>
          )}

          <label htmlFor="important">Is the product important to track?</label>
          <input
            type="checkbox"
            id="important"
            {...register("important")}
            className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600 accent-orange-600"
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

export default EditProductById;
