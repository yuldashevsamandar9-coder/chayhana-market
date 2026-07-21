import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";

mongoose
  .connect(process.env.MONGO_URL as string, {}) // bush obyekt keyinchalik malumot qushish uchun.
  .then((data) => {
    console.log(`Mongodb suceccfully`);
    const PORT = process.env.PORT ?? 3007;
    app.listen(PORT, function () {
      console.log(`This server running succesfully on port: ${PORT}`);
      console.log(`This server running succesfully on port admin: ${PORT} \n`);
    });
  })

  .catch((err) => {
    console.log("Error wrong try agein:", err);
  });
