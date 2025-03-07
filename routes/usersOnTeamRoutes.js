const express = require("express");
var Router = express.Router();

const {
  getAllUsersOnTeams,
  getUsersOnTeamById,
  deleteUsersOnTeam,
  userJoinByCode,
} = require("../controllers/usersOnTeamController.js");

Router.get("/", getAllUsersOnTeams);

Router.post("/join/:code", userJoinByCode);

Router.get("/:teamid", getUsersOnTeamById);

Router.delete("/", deleteUsersOnTeam);

module.exports = Router;
