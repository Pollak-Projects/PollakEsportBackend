import express from "express";
const Router = express.Router();

import {
  getAllTeamsOnSeed,
  getTeamsOnSeedById,
  createTeamsOnSeed,
  deleteTeamsOnSeed,
} from "../controllers/teamsOnSeedController.js";

Router.get("/", getAllTeamsOnSeed);
Router.post("/", createTeamsOnSeed);
Router.get("/:seedid", getTeamsOnSeedById);
Router.delete("/", deleteTeamsOnSeed);

export default Router;
