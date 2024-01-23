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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jwt_1 = require("./jwt");
const AuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const headers = req.headers;
    if (headers["authorization"] &&
        headers["authorization"].split(" ")[0] === "Bearer" &&
        headers["authorization"].split(" ")[1]) {
        const token = headers["authorization"].split(" ")[1];
        try {
            const data = (0, jwt_1.toData)(token);
            req.userId = data.userId;
            next();
        }
        catch (e) {
            res.status(401).send({ message: "Token missing or invalid" });
            return;
        }
    }
    else {
        res.status(401).send({
            message: "Token missing or invalid",
        });
        return;
    }
});
exports.AuthMiddleware = AuthMiddleware;
