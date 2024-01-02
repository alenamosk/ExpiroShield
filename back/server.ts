import cors from "cors";
import express from "express";
import { AuthMiddleware, AuthRequest } from "./auth/middleware";
import { PrismaClient } from "@prisma/client";
import { json } from "express";
import { toToken } from "./auth/jwt";
import { z } from "zod";

const app = express();

app.use(json());
app.use(cors());

const port = 3001;

const prisma = new PrismaClient();

app.get("/products", async (req, res) => {
  const allProducts = await prisma.product.findMany({
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
  res.send(allProducts);
});

app.get("/products/:id", async (req, res) => {
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
  res.send(oneProduct);
});

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

app.get("/main", AuthMiddleware, async (req: AuthRequest, res) => {
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
      id: req.userId,
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

  if (!getProducts) {
    res.status(404).send({
      message: "Products not found",
    });
    return;
  }

  res.send(getProducts);
});

app.listen(port, () => {
  console.log(`⚡ Server listening on port: ${port}`);
});
