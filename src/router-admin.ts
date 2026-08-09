import express, { Request, Response } from "express";

import shopController from "./controllers/shop.controller";
import productController from "./controllers/product.controller";
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
routerAdmin.get("/logout", shopController.logout);

/**. Product uchun * */

routerAdmin.get(
  "/product/all",
  shopController.verifyShop,
  productController.getAllProducts,
);
routerAdmin.post(
  "/product/create",
  shopController.verifyShop,
  productController.createNewProduct,
);
routerAdmin.post(
  "/product/:id",
  shopController.verifyShop,
  productController.updateChosenProduct,
);
/**. User uchun * */

export default routerAdmin;
