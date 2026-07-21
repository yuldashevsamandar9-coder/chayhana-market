import express, { Request, Response } from "express";

import shopController from "./controllers/shop.controller";
const routerAdmin = express.Router();

// BSSR uchun foydalanamiz
/**. MARKET uchun * */

routerAdmin.get("/", shopController.goHome);
routerAdmin
  .get("/login", shopController.getLogin)
  .post("/login", shopController.processLogin);
routerAdmin
  .get("/signup", shopController.getSignup)
  .post("/signup", shopController.processSignup);

/**. Product uchun * */
/**. User uchun * */

export default routerAdmin;
