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
const users_json_1 = __importDefault(require("./data/users.json"));
const products_json_1 = __importDefault(require("./data/products.json"));
const categories_json_1 = __importDefault(require("./data/categories.json"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < users_json_1.default.length; i++) {
        const thisUser = users_json_1.default[i];
        yield prisma.user.create({
            data: thisUser,
        });
    }
    for (let i = 0; i < categories_json_1.default.length; i++) {
        const thisCategory = categories_json_1.default[i];
        yield prisma.category.create({
            data: thisCategory,
        });
    }
    for (let i = 0; i < products_json_1.default.length; i++) {
        const thisProduct = products_json_1.default[i];
        yield prisma.product.create({
            data: thisProduct,
        });
    }
});
seed();
