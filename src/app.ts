import express, { urlencoded } from "express";
import path from "path";
/**  1 - ENTRANSE  **/
const app = express();
app.use(express.static(path.join(__dirname, "public"))); // Middelwere
app.use(express.urlencoded({ extended: true })); // TRADITIONAL API
app.use(express.json());

/**  2 - SESSIONS **/

/**  3 - VIEWS **/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/**  4 - ROUTERS **/

export default app;
