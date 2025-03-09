import express from "express";
const Router = express.Router();

import {
  getAllGameVariants,
  getGameVariantByGameId,
  createGameVariant,
  deleteGameVariant,
} from "../controllers/gameVariantsController.js";

Router.get("/", getAllGameVariants);
Router.post("/", createGameVariant);
Router.get("/:gameid", getGameVariantByGameId);
Router.delete("/", deleteGameVariant);

export default Router;
