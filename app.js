const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const { checkSessionMiddleware }= require("./middlewares/sessionHandler");
const { checkTokenMiddleware } = require("./middlewares/tokenHandler");
const { login, register, logout } = require("./controllers/authController") 

const userRoutes = require("./routes/userRoutes");
const teamRoutes = require("./routes/teamRoutes");
const gameRoutes = require("./routes/gameRoutes");
const roundRoutes = require("./routes/roundRoutes");
const variantRoutes = require("./routes/variantRoutes");
const typeRoutes = require("./routes/typeRoutes");
const seedRoutes = require("./routes/seedRoutes");
const usersOnTeamRoutes = require("./routes/usersOnTeamRoutes");
const roundsOnGameRoutes = require("./routes/roundsOnGameRoutes");
const gameVariantsRoutes = require("./routes/gameVariantsRoutes");
const teamsOnSeedRoutes = require("./routes/teamsOnSeedRoutes");
const mixedRoutes = require("./routes/mixedRoutes");

dotenv.config();
const app = express();

app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/team', teamRoutes);
app.use('/game', gameRoutes);
app.use('/round', roundRoutes);
app.use('/variant', variantRoutes);
app.use('/type', typeRoutes);
app.use('/seed', seedRoutes);
app.use('/usersonteam', usersOnTeamRoutes);
app.use('/roundsongame', roundsOnGameRoutes);
app.use('/gamevariants', gameVariantsRoutes);
app.use('/mixed', mixedRoutes)

//session
//app.use(checkSessionMiddleware)
//app.use(checkTokenMiddleware)
//app.post("/register", register);
//app.post("/login", login);
//app.post("/logout", logout)

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`Server is running at http://localhost:${PORT}`);
});