import express from "express";
const Router = express.Router();

import {
  getAllVariants,
  getVariantByName,
  createVariant,
  updateVariant,
  deleteVariant,
} from "../controllers/variantController.js";

Router.get("/", getAllVariants);
Router.post("/", createVariant);
Router.get("/:name", getVariantByName);
Router.delete("/:id", deleteVariant);
Router.put("/:id", updateVariant);

export default Router;
