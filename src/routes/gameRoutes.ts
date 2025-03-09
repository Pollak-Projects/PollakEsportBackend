import express from "express";
const Router = express.Router();

import {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
} from "../controllers/gameController.js";

Router.get("/", getAllGames);
Router.post("/", createGame);
Router.get("/:id", getGameById);
Router.delete("/:id", deleteGame);
Router.put("/:id", updateGame);

export default Router;
