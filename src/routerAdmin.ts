import express, { Request, Response } from "express";

import shopController from "./controllers/shop.controller";
const routerAdmin = express.Router();

// BSSR uchun foydalanamiz

routerAdmin.get("/", shopController.goHome);

routerAdmin.get("/login", shopController.goLogin);

routerAdmin.get("/signup", shopController.goSignup);

export default routerAdmin;
