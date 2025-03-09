import express from "express";
const Router = express.Router();

import {
  getAllGamesForCards,
  getDataForBrackets,
  getTeamsWithUsers,
  updateScores,
} from "../controllers/mixedController.js";

Router.get("/gamesforcards", getAllGamesForCards);
Router.get("/dataforbrackets/:gameid", getDataForBrackets);
Router.get("/teams/:teamid", getTeamsWithUsers);
Router.post("/scores/", updateScores);

export default Router;
