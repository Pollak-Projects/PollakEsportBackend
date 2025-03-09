import express from "express";
const Router = express.Router();

import {
  getAllRoundsOnGames,
  getRoundOnGameById,
  createRoundsOnGame,
  deleteRoundsOnGame,
} from "../controllers/roundsOnGameController.js";

Router.get("/", getAllRoundsOnGames);
Router.post("/", createRoundsOnGame);
Router.get("/:gameid", getRoundOnGameById);
Router.delete("/", deleteRoundsOnGame);

export default Router;
