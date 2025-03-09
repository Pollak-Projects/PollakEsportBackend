import express from "express";
const Router = express.Router();

import {
  getAllTypes,
  getTypeByType,
  createType,
  updateType,
  deleteType,
} from "../controllers/typeController.js";

Router.get("/", getAllTypes);
Router.post("/", createType);
Router.get("/:type", getTypeByType);
Router.delete("/:id", deleteType);
Router.put("/:id", updateType);

export default Router;
