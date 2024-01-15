import cors from "cors";
import express from "express";
import { AuthMiddleware, AuthRequest } from "./auth/middleware";
import { PrismaClient } from "@prisma/client";
import { json } from "express";
import { toToken } from "./auth/jwt";
import { z } from "zod";
import { add, compareDesc, isBefore } from "date-fns";

const app = express();

app.use(json());
app.use(cors());

const port = 3001;

const prisma = new PrismaClient();

// app.get("/products", async (req, res) => {
//   const allProducts = await prisma.product.findMany({
//     select: {
//       id: true,
//       prName: true,
//       expires: true,
//       opened: true,
//       expiresInDays: true,
//       imgUrl: true,
//       user: true,
//       userId: true,
//       category: true,
//       categoryId: true,
//       description: true,
//       important: true,
//     },
//   });
//   res.send(allProducts);
// });

app.get("/products/:id", AuthMiddleware, async (req: AuthRequest, res) => {
  if (!req.userId) {
    res.status(401).send({ message: "User not authenticated" });
    return;
  }
  const userIdFromToken = req.userId;
  const idAsNumber = parseInt(req.params.id);

  const oneProduct = await prisma.product.findUnique({
    where: {
      id: idAsNumber,
    },
    select: {
      id: true,
      prName: true,
      expires: true,
      opened: true,
      expiresInDays: true,
      imgUrl: true,
      user: true,
      userId: true,
      category: true,
      categoryId: true,
      description: true,
      important: true,
    },
  });
  if (!oneProduct) {
    res.status(404).send({ message: "Product with that id not found" });
    return;
  }

  if (oneProduct.userId !== userIdFromToken) {
    res.status(403).send({
      message: "Unauthorized: You do not have permission to see this product",
    });
    return;
  }

  if (!oneProduct.opened) {
    oneProduct.expires = oneProduct.expires;
  } else {
    const expiresDateNew = add(new Date(oneProduct.opened), {
      days: oneProduct.expiresInDays,
    });

    const expiresDateDB = new Date(oneProduct.expires);

    const useDate = isBefore(expiresDateNew, expiresDateDB);

    oneProduct.expires = useDate ? expiresDateNew : expiresDateDB;
  }

  res.send(oneProduct);
});

app.patch("/products/edit/:id", async (req, res) => {
  const idAsNumber = parseInt(req.params.id);

  const updateData = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: idAsNumber,
      },
      data: updateData,
    });

    res.send(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.delete(
  "/products/delete/:id",
  AuthMiddleware,
  async (req: AuthRequest, res) => {
    if (!req.userId) {
      res.status(401).send({ message: "User not authenticated" });
      return;
    }
    const userIdFromToken = req.userId;
    const idAsNumber = parseInt(req.params.id);

    try {
      const product = await prisma.product.findUnique({
        where: {
          id: idAsNumber,
        },
      });

      if (!product) {
        res.status(404).send({ message: "Product not found" });
        return;
      }

      if (product.userId !== userIdFromToken) {
        res.status(403).send({
          message:
            "Unauthorized: You do not have permission to delete this product",
        });
        return;
      }

      await prisma.product.delete({
        where: {
          id: idAsNumber,
        },
      });

      res.status(200).send({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
);

app.get("/categories", async (req, res) => {
  const allCategories = await prisma.category.findMany({
    select: {
      id: true,
      catName: true,
      Product: {
        select: {
          id: true,
          prName: true,
          expires: true,
          opened: true,
          expiresInDays: true,
          imgUrl: true,
          user: true,
          userId: true,
          category: true,
          categoryId: true,
          description: true,
          important: true,
        },
      },
    },
  });
  res.send(allCategories);
});

const registerValidator = z
  .object({
    email: z.string().min(5),
    password: z.string().min(6),
  })
  .strict();

app.post("/register", async (req, res) => {
  const requestBody = req.body;

  const parsedBody = registerValidator.safeParse(requestBody);

  if (parsedBody.success) {
    try {
      const newUser = await prisma.user.create({
        data: parsedBody.data,
      });
      res.status(201).send({ message: "User created!" });
    } catch (error) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  } else {
    res.status(400).send(parsedBody.error.flatten());
  }
});

app.post("/login", async (req, res) => {
  const requestBody = req.body;
  if ("email" in requestBody && "password" in requestBody) {
    try {
      const userToLogin = await prisma.user.findUnique({
        where: {
          email: requestBody.email,
        },
      });
      if (userToLogin && userToLogin.password === requestBody.password) {
        const token = toToken({ userId: userToLogin.id });
        res.status(200).send({ token: token });
        return;
      }

      res.status(400).send({ message: "Login failed" });
    } catch (error) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  } else {
    res.status(400).send({ message: "'email' and 'password' are required!" });
  }
});

// app.get("/users", AuthMiddleware, async (req, res) => {
//   const allUsers = await prisma.user.findMany({
//     select: {
//       id: true,
//       email: true,
//     },
//   });
//   res.send(allUsers);
// });

app.get("/profile", AuthMiddleware, async (req: AuthRequest, res) => {
  if (!req.userId) {
    res.status(401).send({ message: "User not authenticated" });
    return;
  }

  const userProfile = await prisma.user.findUnique({
    where: {
      id: req.userId,
    },
    select: {
      email: true,
    },
  });

  if (!userProfile) {
    res.status(404).send({
      message: "User with that id not found",
    });
    return;
  }

  res.send(userProfile);
});

// Call this /products/me
app.get("/my-products", AuthMiddleware, async (req: AuthRequest, res) => {
  if (!req.userId) {
    res.status(401).send({ message: "User not authenticated" });
    return;
  }

  const getUser = await prisma.user.findUnique({
    where: {
      id: req.userId,
    },
    select: {
      email: true,
    },
  });

  if (!getUser) {
    res.status(404).send({
      message: "User with that id not found",
    });
    return;
  }

  const getProducts = await prisma.product.findMany({
    where: {
      userId: req.userId,
    },
    select: {
      id: true,
      prName: true,
      expires: true,
      opened: true,
      expiresInDays: true,
      imgUrl: true,
      category: true,
      description: true,
      important: true,
    },
  });

  if (!getProducts || getProducts.length === 0) {
    res.status(404).send({
      message: "Products not found",
    });
    return;
  }

  const mappedProducts = getProducts.map((product) => {
    // If there is no opened data, use expires
    if (!product.opened) {
      return {
        ...product,
        expires: product.expires,
      };
    }

    const expiresDateNew = add(new Date(product.opened), {
      days: product.expiresInDays,
    });
    const expiresDateDB = new Date(product.expires);

    // Check if opened + expires in days is earlier than expires
    const useDate = isBefore(expiresDateNew, expiresDateDB);

    return {
      ...product,
      expires: useDate ? expiresDateNew : expiresDateDB,
    };
  });

  const sortedProducts = mappedProducts.sort((b, a) =>
    compareDesc(new Date(a.expires), new Date(b.expires))
  );

  res.send(sortedProducts);
});

const productValidator = z.object({
  prName: z.string(),
  expires: z.coerce.date(),
  opened: z.coerce.date(),
  expiresInDays: z.number().positive(), // TODO: remove static number and find the way to keep this number updated!
  imgUrl: z.string(),
  categoryId: z.number().positive(),
  description: z.string(),
  important: z.boolean(),
});

app.post("/add-new-product", AuthMiddleware, async (req: AuthRequest, res) => {
  if (!req.userId) {
    res.status(401).send({ message: "User not authenticated" });
    return;
  }
  const parsedBody = productValidator.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).send(parsedBody.error.flatten());
    return;
  }

  try {
    const newProduct = await prisma.product.create({
      data: {
        user: {
          connect: {
            id: req.userId,
          },
        },
        prName: req.body.prName,
        expires: req.body.expires,
        opened: req.body.opened,
        expiresInDays: req.body.expiresInDays,
        imgUrl: req.body.imgUrl,
        category: {
          connect: {
            id: req.body.categoryId,
          },
        },
        description: req.body.description,
        important: req.body.important,
      },
    });
    res
      .status(201)
      .send({ message: "New product has been created", newProduct });
  } catch (error) {
    res.status(400).send({ message: "Failed to add a wish! " + error });
  }
});

require("dotenv").config();

const crypto = require("crypto");
const uuid = require("uuid");

app.get("/authenticationEndpoint", (req, res) => {
  const token = req.query.token || uuid.v4();
  const expire = req.query.expire || Math.floor(Date.now() / 1000) + 2400;
  const privateAPIKey = process.env.IMAGEKIT_PRIVATE_KEY;

  const signature = crypto
    .createHmac("sha1", privateAPIKey)
    .update(token + expire)
    .digest("hex");

  res.set({
    "Access-Control-Allow-Origin": "*",
  });

  res.status(200).json({
    token,
    expire,
    signature,
  });
});

app.listen(port, () => {
  console.log(`⚡ Server listening on port: ${port}`);
});
