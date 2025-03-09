const connect = require("../config/db");

const getAllRoundsOnGames = async (req, res) => {
    try {
        const roundsongame = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `roundsongame`", (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!roundsongame.length) {
            return res.status(404).json({ message: "Nincsenek elérhető fordulók a játékokban." });
        }

        return res.json({ message: "Fordulók a játékokban sikeresen lekérve.", data: roundsongame });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a fordulók lekérése során.", error });
    }
};

const getRoundOnGameById = async (req, res) => {
    const { gameid } = req.params;

    if (!gameid) {
        return res.status(400).json({ message: "A játék ID-ja kötelező." });
    }

    try {
        const roundongame = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `roundsongame` WHERE `gameId` = ?", [gameid], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!roundongame.length) {
            return res.status(404).json({ message: "A megadott játékhoz tartozó forduló nem található." });
        }

        return res.json({ message: "Forduló a játékhoz sikeresen lekérve.", data: roundongame });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a forduló lekérése során.", error });
    }
};

const createRoundsOnGame = async (req, res) => {
    const { roundId, gameId } = req.body;

    if (!roundId || !gameId) {
        return res.status(400).json({ message: "A forduló és a játék ID-jának megadása kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("INSERT INTO `roundsongame` (`roundId`, `gameId`) VALUES (?, ?);", [roundId, gameId], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        return res.json({ message: "Forduló sikeresen létrehozva a játékhoz.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a forduló létrehozása során.", error });
    }
};

const deleteRoundsOnGame = async (req, res) => {
    const { roundId, gameId } = req.body;

    if (!roundId || !gameId) {
        return res.status(400).json({ message: "A forduló és a játék ID-jának megadása kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("DELETE FROM `roundsongame` WHERE `roundId` = ? AND `gameId` = ?", [roundId, gameId], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (response.affectedRows === 0) {
            return res.status(404).json({ message: "A megadott ID-hoz tartozó forduló nem található a játékban." });
        }

        return res.json({ message: "Forduló sikeresen törölve a játékból.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a forduló törlése során.", error });
    }
};

module.exports = {
    getAllRoundsOnGames,
    getRoundOnGameById,
    createRoundsOnGame,
    deleteRoundsOnGame
};
