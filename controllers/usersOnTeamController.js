const connect = require("../config/db");
require("dotenv").config();

const getAllUsersOnTeams = async (req, res) => {
  try {
    const usersonteam = await new Promise((resolve, reject) => {
      connect.query("SELECT * FROM `usersonteam`", (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    if (!usersonteam.length) {
      return res
        .status(404)
        .json({ message: "Nincsenek elérhető felhasználók a csapatokban." });
    }

    return res.json({
      message: "Felhasználók sikeresen lekérve a csapatokban.",
      data: usersonteam,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Hiba történt a felhasználók lekérése során.", error });
  }
};

const getUsersOnTeamById = async (req, res) => {
  const { teamid } = req.params;

  if (!teamid) {
    return res.status(400).json({ message: "A csapat ID megadása kötelező." });
  }

  try {
    const usersonteam = await new Promise((resolve, reject) => {
      connect.query(
        "SELECT * FROM `usersonteam` WHERE `teamId` = ?",
        [teamid],
        async (err, result) => {
          if (err) reject(err);
          else {
            const users = [];
            await result.map(async (usersonteam) => {
              const data = await fetch(
                `https://auth.pollak.info/user/get/${usersonteam.userId}`,
                {
                  method: "GET",
                  headers: {
                    "x-api-key": process.env.API_KEY,
                    "Content-Type": "application/json",
                  },
                }
              );
              users.push(await data.json());
            });
            resolve(users);
          }
        }
      );
    });
    console.log(usersonteam);

    if (!users.length) {
      return res
        .status(404)
        .json({ message: "A megadott csapatban nincsenek felhasználók." });
    }

    return res.json({
      message: "Felhasználók sikeresen lekérve a csapatban.",
      data: usersonteam,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hiba történt a csapat felhasználóinak lekérése során.",
      error,
    });
  }
};

const createUsersOnTeam = async (req, res) => {
  const { teamId, userId } = req.body;

  if (!teamId || !userId) {
    return res
      .status(400)
      .json({ message: "A csapat ID és a felhasználó ID megadása kötelező." });
  }

  try {
    const response = await new Promise((resolve, reject) => {
      connect.query(
        "INSERT INTO `usersonteam` (`teamId`, `userId`) VALUES (?, ?);",
        [teamId, userId],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    return res.json({
      message: "Felhasználó sikeresen hozzáadva a csapathoz.",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hiba történt a felhasználó csapathoz adása során.",
      error,
    });
  }
};

const deleteUsersOnTeam = async (req, res) => {
  const { teamId, userId } = req.body;

  if (!teamId || !userId) {
    return res
      .status(400)
      .json({ message: "A csapat ID és a felhasználó ID megadása kötelező." });
  }

  try {
    const response = await new Promise((resolve, reject) => {
      connect.query(
        "DELETE FROM `usersonteam` WHERE `usersonteam`.`teamId` = ? AND `usersonteam`.`userId` = ?",
        [teamId, userId],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    if (response.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "A megadott csapatban a felhasználó nem található." });
    }

    return res.json({
      message: "Felhasználó sikeresen eltávolítva a csapatból.",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hiba történt a felhasználó csapatból való eltávolítása során.",
      error,
    });
  }
};

const userJoinByCode = async (req, res) => {
  const inviteCode = req.params.code;
  const userId = req.body.userId || 1;

  if (!inviteCode || !userId) {
    return res.status(400).json({ message: "Minden adat megadása kötelező." });
  }

  try {
    const team = await new Promise((resolve, reject) => {
      connect.query(
        "SELECT `id` FROM team WHERE inviteCode = ?",
        [inviteCode],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    if (!team.length) {
      return res
        .status(404)
        .json({ message: "A megadott invite kód nem található." });
    }

    const user = await new Promise((resolve, reject) => {
      connect.query(
        "SELECT * FROM users WHERE id = ?",
        [userId],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    if (!user.length) {
      return res
        .status(404)
        .json({ message: "A megadott felhasználó nem található." });
    }

    const response = await new Promise((resolve, reject) => {
      connect.query(
        "INSERT INTO `usersonteam` (`teamId`, `userId`) VALUES (?, ?);",
        [team[0].id, userId],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    return res.json({
      message: "Felhasználó sikeresen hozzáadva a csapathoz.",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hiba történt a felhasználó csapathoz adása során.",
      error,
    });
  }
};

module.exports = {
  getAllUsersOnTeams,
  getUsersOnTeamById,
  createUsersOnTeam,
  deleteUsersOnTeam,
  userJoinByCode,
};
