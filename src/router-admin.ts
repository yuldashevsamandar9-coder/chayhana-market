import express, { Request, Response } from "express";

import shopController from "./controllers/shop.controller";
import productController from "./controllers/product.controller";
import makeUploader from "./libs/utils/uploader";
const routerAdmin = express.Router();

// BSSR uchun foydalanamiz

/**. MARKET uchun * */

routerAdmin.get("/", shopController.goHome);
routerAdmin
  .get("/login", shopController.getLogin)
  .post("/login", shopController.processLogin);
routerAdmin.get("/signup", shopController.getSignup).post(
  "/signup",
  makeUploader("members").single("memberImage"), // req.file
  shopController.processSignup,
);
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
  makeUploader("products").array("productImages", 5), // argument
  productController.createNewProduct,
);
routerAdmin.post(
  "/product/:id",
  shopController.verifyShop,
  productController.updateChosenProduct,
);
/**. User uchun * */

routerAdmin.get(
  "/user/all",
  shopController.verifyShop,
  shopController.getUsers,
);
routerAdmin.post(
  "/user/edit",
  shopController.verifyShop, // authenticate
  shopController.updateChosenUser,
);

export default routerAdmin;
