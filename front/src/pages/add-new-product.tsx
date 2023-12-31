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

const dataFromFormValidator = z.object({
  prName: z.string(),
  expires: z.coerce.date(),
  opened: z.coerce.date(),
  expiresInDays: z.number().positive(),
  imgUrl: z.string(),
  categoryId: z.coerce.number().positive(),
  description: z.string(),
  important: z.boolean(),
});

type DataFromForm = z.infer<typeof dataFromFormValidator>;

const FormText = () => {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);

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
    console.log("Success", res);
  };

  const handleFormSubmit = async (data: DataFromForm) => {
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
          imgUrl: data.imgUrl,
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

  return (
    <main>
      <NavBar />
      <h1>Add a new product</h1>
      <form className="vertical-form" onSubmit={handleSubmit(handleFormSubmit)}>
        <label htmlFor="prName">Name of the product</label>
        <input id="prName" {...register("prName")}></input>
        {errors.prName && <p className="error-msg">{errors.prName.message}</p>}

        <label htmlFor="expires">
          Expiration date indicated on the product
        </label>
        <input type="date" id="expires" {...register("expires")}></input>
        {errors.expires && (
          <p className="error-msg">{errors.expires.message}</p>
        )}

        <label htmlFor="opened">The day you opened the product</label>
        <input type="date" id="opened" {...register("opened")}></input>
        {errors.opened && <p className="error-msg">{errors.opened.message}</p>}

        <label htmlFor="expiresInDays">
          Product expiration date after opening (in days)
        </label>
        <input
          type="number"
          id="expiresInDays"
          {...register("expiresInDays", { valueAsNumber: true })}
          placeholder="3 months = 90 days, 6 months = 180 days"
        ></input>
        {errors.expiresInDays && (
          <p className="error-msg">{errors.expiresInDays.message}</p>
        )}

        <label htmlFor="imgUrl">Upload a photo of the product</label>
        <IKContext
          publicKey={publicKey}
          urlEndpoint={urlEndpoint}
          authenticator={authenticator}
        >
          <IKUpload
            fileName="test-upload.png"
            onError={onError}
            onSuccess={onSuccess}
          />
          {/* <IKUpload fileName={`product_${Date.now()}.jpg`} /> */}
        </IKContext>
        {/* <input type="file" id="imgUrl" {...register("imgUrl")}></input> */}
        {errors.imgUrl && <p className="error-msg">{errors.imgUrl.message}</p>}

        <label htmlFor="categoryId">Choose a category</label>
        <select id="categoryId" {...register("categoryId")}>
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
        ></textarea>
        {errors.description && (
          <p className="error-msg">{errors.description.message}</p>
        )}

        <label htmlFor="important">Is the product important to track?</label>
        <input
          type="checkbox"
          id="important"
          {...register("important")}
        ></input>
        {errors.important && (
          <p className="error-msg">{errors.important.message}</p>
        )}

        <button type="submit" id="submit">
          Submit
        </button>
      </form>
    </main>
  );
};

export default FormText;
