import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";
import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
import { T } from "./libs/types/common";

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URL as string,
  collection: "sessions",
});

/**  1 - ENTRANSE  **/
const app = express();
app.use(express.static(path.join(__dirname, "public"))); // Middelwere
app.use(express.urlencoded({ extended: true })); // TRADITIONAL API
app.use(express.json());
app.use(morgan(MORGAN_FORMAT));

/**  2 - SESSIONS **/

app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 hafta davomida sessiya saqlanadi, keyin esa avtomatik o'chadi
    },
    store: store,
    resave: true, // trueda belgilangan vaqt orasida qayta kirsak saytga yana vaqti yangilanadi
    saveUninitialized: true,
  }),
);

// app.use(function (req, res, next) {
//   const sessionInstance = req.session as T;
//   res.locals.member = sessionInstance.member;
//   next();
// });

/**  3 - VIEWS **/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/**  4 - ROUTERS **/
app.use("/admin", routerAdmin); // BSSRR uchun
app.use("/", router); // Middleware Disign Pattern REACT

export default app;
