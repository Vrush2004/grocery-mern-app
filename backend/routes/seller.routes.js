import express from "express";
import {
  sellercCheckAuth,
  sellerLogin,
  sellerLogout,
} from "../controller/seller.controller.js";
import { authSeller } from "../middlewares/authSeller.js";
const sellerRouter = express.Router();

sellerRouter.post("/login", sellerLogin);
sellerRouter.get("/is-auth", authSeller, sellercCheckAuth);
sellerRouter.get("/logout", authSeller, sellerLogout);

export default sellerRouter;
