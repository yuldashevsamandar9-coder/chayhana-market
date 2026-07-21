import express, { urlencoded } from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./routerAdmin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";
/**  1 - ENTRANSE  **/
const app = express();
app.use(express.static(path.join(__dirname, "public"))); // Middelwere
app.use(express.urlencoded({ extended: true })); // TRADITIONAL API
app.use(express.json());
app.use(morgan(MORGAN_FORMAT));

/**  2 - SESSIONS **/

/**  3 - VIEWS **/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/**  4 - ROUTERS **/
app.use("/admin", routerAdmin); // BSSRR uchun
app.use("/", router); // Middleware Disign Pattern REACT

export default app;
