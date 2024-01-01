import cors from "cors";
import express from "express";
import { PrismaClient } from "@prisma/client";
import { json } from "express";

const app = express();

app.use(json());
app.use(cors());

const port = 3001;

const prisma = new PrismaClient();

app.get("/users", async (req, res) => {
  const allUsers = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      password: true,
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
  res.send(allUsers);
});

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

app.get("/product/:id", async (req, res) => {
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

app.listen(port, () => {
  console.log(`⚡ Server listening on port: ${port}`);
});
