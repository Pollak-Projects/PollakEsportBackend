import express from "express";
const Router = express.Router();

import {
  getAllUsersOnTeams,
  getUsersOnTeamById,
  deleteUsersOnTeam,
  userJoinByCode,
} from "../controllers/usersOnTeamController.js";

Router.get("/", getAllUsersOnTeams);
Router.post("/join/:code", userJoinByCode);
Router.get("/:teamid", getUsersOnTeamById);
Router.delete("/", deleteUsersOnTeam);

export default Router;
