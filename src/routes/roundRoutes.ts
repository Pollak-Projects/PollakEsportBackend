import express from "express";
const Router = express.Router();

import {
  getAllRounds,
  getRoundById,
  createRound,
  updateRound,
  deleteRound,
} from "../controllers/roundController.js";

Router.get("/", getAllRounds);
Router.post("/", createRound);
Router.get("/:id", getRoundById);
Router.delete("/:id", deleteRound);
Router.put("/:id", updateRound);

export default Router;
