import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URL as string, {}) // bush obyekt keyinchalik malumot qushish uchun.
  .then((data) => {
    console.log(`Mongodb suceccfully`);
    const PORT = process.env.PORT ?? 3007;
  })

  .catch((err) => {
    console.log("Error wrong try agein:", err);
  });
