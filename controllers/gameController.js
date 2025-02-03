const connect = require("../config/db");

const getAllGames = async (req, res) => {
  try {
    const games = await new Promise((resolve, reject) => {
      connect.query("SELECT * FROM `game`", (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    if (!games.length) {
      return res.status(404).json({ message: "Nincs elérhető játék." });
    }

    return res.json({ message: "Játékok sikeresen lekérve.", data: games });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Hiba történt a játékok lekérése során.", error });
  }
};

const getGameById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "A játék ID-ja kötelező." });
  }

  try {
    const game = await new Promise((resolve, reject) => {
      connect.query(
        "SELECT * FROM `game` WHERE `id` = ?",
        [id],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    if (!game.length) {
      return res
        .status(404)
        .json({ message: "Nincs elérhető játék a megadott ID-val." });
    }

    return res.json({ message: "Játék sikeresen lekérve.", data: game });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Hiba történt a játék lekérése során.", error });
  }
};

const createGame = async (req, res) => {
  const { name, playerPerTeam, description, image, startDate, endDate } =
    req.body;

  if (
    !name ||
    !description ||
    !playerPerTeam ||
    !image ||
    !startDate ||
    !endDate
  ) {
    return res.status(400).json({ message: "Minden mező kitöltése kötelező." });
  }

  try {
    const response = await new Promise((resolve, reject) => {
      connect.query(
        "INSERT INTO `game` (`name`, `description`, `playerPerTeam`, `image`, `startDate`, `endDate`) VALUES (?, ?, ?, ?, ?, ?);",
        [name, description, playerPerTeam, image, startDate, endDate],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    return res
      .status(201)
      .json({ message: "Játék sikeresen létrehozva.", data: response });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Hiba történt a játék létrehozása során.", error });
  }
};

const updateGame = async (req, res) => {
  const { id } = req.params;
  const { name, playerPerTeam, description, image, startDate, endDate } =
    req.body;

  if (!name || !description || !playerPerTeam || !startDate || !endDate) {
    return res.status(400).json({ message: "Minden mező kitöltése kötelező." });
  }

  try {
    const query =
      image !== undefined
        ? "UPDATE `game` SET `name` = ?, `description` = ?, `playerPerTeam` = ?, `image` = ?, `startDate` = ?, `endDate` = ? WHERE `game`.`id` = ?"
        : "UPDATE `game` SET `name` = ?, `description` = ?, `playerPerTeam` = ?, `startDate` = ?, `endDate` = ? WHERE `game`.`id` = ?";

    const values =
      image !== undefined
        ? [name, description, playerPerTeam, image, startDate, endDate, id]
        : [name, description, playerPerTeam, startDate, endDate, id];

    const response = await new Promise((resolve, reject) => {
      connect.query(query, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    if (response.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Nincs elérhető játék a megadott ID-val." });
    }

    return res.json({ message: "Játék sikeresen frissítve.", data: response });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Hiba történt a játék frissítése során.", error });
  }
};

const deleteGame = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "A játék ID-ja kötelező." });
  }

  try {
    const response = await new Promise((resolve, reject) => {
      connect.query(
        "DELETE FROM `game` WHERE `game`.`id` = ?",
        [id],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    if (response.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Nincs elérhető játék a megadott ID-val." });
    }

    return res.json({ message: "Játék sikeresen törölve.", data: response });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Hiba történt a játék törlése során.", error });
  }
};

module.exports = {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
};
