import express from "express";
const Router = express.Router();

import {
  getAllSeeds,
  getSeedById,
  createSeed,
  updateSeed,
  deleteSeed,
} from "../controllers/seedController.js";

Router.get("/", getAllSeeds);
Router.post("/", createSeed);
Router.get("/:id", getSeedById);
Router.delete("/:id", deleteSeed);
Router.put("/:id", updateSeed);

export default Router;
