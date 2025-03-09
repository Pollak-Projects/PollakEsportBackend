import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import teamRoutes from "./src/routes/teamRoutes";
import gameRoutes from "./src/routes/gameRoutes";
import roundRoutes from "./src/routes/roundRoutes";
import variantRoutes from "./src/routes/variantRoutes";
import typeRoutes from "./src/routes/typeRoutes";
import seedRoutes from "./src/routes/seedRoutes";
import usersOnTeamRoutes from "./src/routes/usersOnTeamRoutes";
import roundsOnGameRoutes from "./src/routes/roundsOnGameRoutes";
import gameVariantsRoutes from "./src/routes/gameVariantsRoutes";
import teamsOnSeedRoutes from "./src/routes/teamsOnSeedRoutes";
import mixedRoutes from "./src/routes/mixedRoutes";

// import { authMiddleware } from "./middlewares/authHandler";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/team", teamRoutes);
app.use("/game", gameRoutes);
app.use("/round", roundRoutes);
app.use("/variant", variantRoutes);
app.use("/type", typeRoutes);
app.use("/seed", seedRoutes);
app.use("/usersonteam", usersOnTeamRoutes);
app.use("/roundsongame", roundsOnGameRoutes);
app.use("/gamevariants", gameVariantsRoutes);
app.use("/teamsonseed", teamsOnSeedRoutes);
app.use("/mixed", mixedRoutes);

const PORT = process.env.PORT || 8181;

app.get("/", (req, res) => {
  res.send("Welcome to the game server!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
