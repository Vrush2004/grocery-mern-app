import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
dotenv.config();
import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import addressRoutes from "./routes/address.routes.js";
import orderRoutes from "./routes/order.routes.js";

import { connectCloudinary } from "./config/cloudinary.js";

const app = express();

await connectCloudinary();
// allow multiple origins
const allowedOrigins = [
  "https://grocery-mern-app-main-client.onrender.com", // your frontend render URL
  "http://localhost:5173", // for local development (Vite)
];
//middlewares
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow requests like Postman
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Api endpoints
app.use("/images", express.static("uploads"));
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
