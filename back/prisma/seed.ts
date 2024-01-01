import usersData from "./data/users.json";
import productsData from "./data/products.json";
import categoriesData from "./data/categories.json";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  for (let i = 0; i < usersData.length; i++) {
    const thisUser = usersData[i];
    await prisma.user.create({
      data: thisUser,
    });
  }
  for (let i = 0; i < categoriesData.length; i++) {
    const thisCategory = categoriesData[i];
    await prisma.category.create({
      data: thisCategory,
    });
  }
  for (let i = 0; i < productsData.length; i++) {
    const thisProduct = productsData[i];
    await prisma.product.create({
      data: thisProduct,
    });
  }
};
seed();
