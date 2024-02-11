import usersData from "./data/users.json";
import productsData from "./data/products.json";
import categoriesData from "./data/categories.json";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  for (let i = 0; i < usersData.length; i++) {
    const thisUser = usersData[i];
    await prisma.user.create({
      data: {
        email: thisUser.email,
        password: thisUser.password,
      },
    });
  }
  for (let i = 0; i < categoriesData.length; i++) {
    const thisCategory = categoriesData[i];
    await prisma.category.create({
      data: {
        catName: thisCategory.catName,
      },
    });
  }
  for (let i = 0; i < productsData.length; i++) {
    const thisProduct = productsData[i];
    await prisma.product.create({
      data: {
        prName: thisProduct.prName,
        expires: thisProduct.expires,
        opened: thisProduct.opened,
        expiresInDays: thisProduct.expiresInDays,
        imgUrl: thisProduct.imgUrl,
        userId: thisProduct.userId,
        categoryId: thisProduct.categoryId,
        description: thisProduct.description,
        important: thisProduct.important,
      },
    });
  }
};
seed();
