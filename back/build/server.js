"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const middleware_1 = require("./auth/middleware");
const client_1 = require("@prisma/client");
const express_2 = require("express");
const jwt_1 = require("./auth/jwt");
const zod_1 = require("zod");
const date_fns_1 = require("date-fns");
const app = (0, express_1.default)();
app.use((0, express_2.json)());
app.use((0, cors_1.default)());
const port = 3001;
const prisma = new client_1.PrismaClient();
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
app.get("/products/:id", middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.userId) {
        res.status(401).send({ message: "User not authenticated" });
        return;
    }
    const userIdFromToken = req.userId;
    const idAsNumber = parseInt(req.params.id);
    const oneProduct = yield prisma.product.findUnique({
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
    }
    else {
        const expiresDateNew = (0, date_fns_1.add)(new Date(oneProduct.opened), {
            days: oneProduct.expiresInDays,
        });
        const expiresDateDB = new Date(oneProduct.expires);
        const useDate = (0, date_fns_1.isBefore)(expiresDateNew, expiresDateDB);
        oneProduct.expires = useDate ? expiresDateNew : expiresDateDB;
    }
    res.send(oneProduct);
}));
// app.patch("/products/edit/:id", async (req, res) => {
//   const idAsNumber = parseInt(req.params.id);
//   const updateData = req.body;
//   try {
//     const updatedProduct = await prisma.product.update({
//       where: {
//         id: idAsNumber,
//       },
//       data: updateData,
//     });
//     res.send(updatedProduct);
//   } catch (error) {
//     console.error("Error updating product:", error);
//     res.status(500).send({ message: "Internal server error" });
//   }
// });
app.patch("/products/edit/:id", middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.userId) {
        res.status(401).send({ message: "User not authenticated" });
        return;
    }
    const userIdFromToken = req.userId;
    const idAsNumber = parseInt(req.params.id);
    try {
        const product = yield prisma.product.findUnique({
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
                message: "Unauthorized: You do not have permission to update this product",
            });
            return;
        }
        try {
            const updatedProduct = yield prisma.product.update({
                where: {
                    id: idAsNumber,
                },
                data: {
                    prName: req.body.prName,
                    expires: req.body.expires,
                    opened: req.body.opened,
                    expiresInDays: req.body.expiresInDays,
                    description: req.body.description,
                    important: req.body.important,
                },
            });
            res
                .status(201)
                .send({ message: "New product has been updated", updatedProduct });
        }
        catch (error) {
            res
                .status(400)
                .send({ message: "Failed to update a product! " + error });
        }
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
}));
app.delete("/products/delete/:id", middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.userId) {
        res.status(401).send({ message: "User not authenticated" });
        return;
    }
    const userIdFromToken = req.userId;
    const idAsNumber = parseInt(req.params.id);
    try {
        const product = yield prisma.product.findUnique({
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
                message: "Unauthorized: You do not have permission to delete this product",
            });
            return;
        }
        yield prisma.product.delete({
            where: {
                id: idAsNumber,
            },
        });
        res.status(200).send({ message: "Product deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send({ message: "Internal server error" });
    }
}));
app.get("/categories", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allCategories = yield prisma.category.findMany({
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
}));
const registerValidator = zod_1.z
    .object({
    email: zod_1.z.string().min(5),
    password: zod_1.z.string().min(6),
})
    .strict();
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestBody = req.body;
    const parsedBody = registerValidator.safeParse(requestBody);
    if (parsedBody.success) {
        try {
            const newUser = yield prisma.user.create({
                data: parsedBody.data,
            });
            res.status(201).send({ message: "User created!" });
        }
        catch (error) {
            res.status(500).send({ message: "Something went wrong!" });
        }
    }
    else {
        res.status(400).send(parsedBody.error.flatten());
    }
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestBody = req.body;
    if ("email" in requestBody && "password" in requestBody) {
        try {
            const userToLogin = yield prisma.user.findUnique({
                where: {
                    email: requestBody.email,
                },
            });
            if (userToLogin && userToLogin.password === requestBody.password) {
                const token = (0, jwt_1.toToken)({ userId: userToLogin.id });
                res.status(200).send({ token: token });
                return;
            }
            res.status(400).send({ message: "Login failed" });
        }
        catch (error) {
            res.status(500).send({ message: "Something went wrong!" });
        }
    }
    else {
        res.status(400).send({ message: "'email' and 'password' are required!" });
    }
}));
// app.get("/users", AuthMiddleware, async (req, res) => {
//   const allUsers = await prisma.user.findMany({
//     select: {
//       id: true,
//       email: true,
//     },
//   });
//   res.send(allUsers);
// });
app.get("/profile", middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.userId) {
        res.status(401).send({ message: "User not authenticated" });
        return;
    }
    const userProfile = yield prisma.user.findUnique({
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
}));
// Call this /products/me
app.get("/my-products", middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.userId) {
        res.status(401).send({ message: "User not authenticated" });
        return;
    }
    const getUser = yield prisma.user.findUnique({
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
    const getProducts = yield prisma.product.findMany({
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
            return Object.assign(Object.assign({}, product), { expires: product.expires });
        }
        const expiresDateNew = (0, date_fns_1.add)(new Date(product.opened), {
            days: product.expiresInDays,
        });
        const expiresDateDB = new Date(product.expires);
        // Check if opened + expires in days is earlier than expires
        const useDate = (0, date_fns_1.isBefore)(expiresDateNew, expiresDateDB);
        return Object.assign(Object.assign({}, product), { expires: useDate ? expiresDateNew : expiresDateDB });
    });
    const sortedProducts = mappedProducts.sort((b, a) => (0, date_fns_1.compareDesc)(new Date(a.expires), new Date(b.expires)));
    res.send(sortedProducts);
}));
const productValidator = zod_1.z.object({
    prName: zod_1.z.string(),
    expires: zod_1.z.coerce.date(),
    opened: zod_1.z.coerce.date(),
    expiresInDays: zod_1.z.number().positive(), // TODO: remove static number and find the way to keep this number updated!
    imgUrl: zod_1.z.string(),
    categoryId: zod_1.z.number().positive(),
    description: zod_1.z.string(),
    important: zod_1.z.boolean(),
});
app.post("/add-new-product", middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const newProduct = yield prisma.product.create({
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
    }
    catch (error) {
        res.status(400).send({ message: "Failed to add a product! " + error });
    }
}));
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
