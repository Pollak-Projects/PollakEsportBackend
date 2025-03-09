const connect = require("../config/db");

const getAllRounds = async (req, res) => {
    try {
        const rounds = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `round`", (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!rounds.length) {
            return res.status(404).json({ message: "Nincsenek elérhető fordulók." });
        }

        return res.json({ message: "Fordulók sikeresen lekérve.", data: rounds });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a fordulók lekérése során.", error });
    }
};

const getRoundById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "A forduló ID-ja kötelező." });
    }

    try {
        const round = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `round` WHERE `id` = ?", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!round.length) {
            return res.status(404).json({ message: "A megadott ID-hoz tartozó forduló nem található." });
        }

        return res.json({ message: "Forduló sikeresen lekérve.", data: round });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a forduló lekérése során.", error });
    }
};

const createRound = async (req, res) => {
    const { number, title } = req.body;

    if (!number || !title) {
        return res.status(400).json({ message: "A forduló számának és címének megadása kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("INSERT INTO `round` (`number`, `title`) VALUES (?, ?);", [number, title], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        return res.json({ message: "Forduló sikeresen létrehozva.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a forduló létrehozása során.", error });
    }
};

const updateRound = async (req, res) => {
    const { id } = req.params;
    const { number, title } = req.body;

    if (!id) {
        return res.status(400).json({ message: "A forduló ID-ja kötelező." });
    }

    if (!number || !title) {
        return res.status(400).json({ message: "A forduló számának és címének megadása kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("UPDATE `round` SET `title` = ?, `number` = ? WHERE `id` = ?", [title, number, id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (response.affectedRows === 0) {
            return res.status(404).json({ message: "A megadott ID-hoz tartozó forduló nem található." });
        }

        return res.json({ message: "Forduló sikeresen frissítve.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a forduló frissítése során.", error });
    }
};

const deleteRound = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "A forduló ID-ja kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("DELETE FROM `round` WHERE `id` = ?", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (response.affectedRows === 0) {
            return res.status(404).json({ message: "A megadott ID-hoz tartozó forduló nem található." });
        }

        return res.json({ message: "Forduló sikeresen törölve.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a forduló törlése során.", error });
    }
};

module.exports = {
    getAllRounds,
    getRoundById,
    createRound,
    updateRound,
    deleteRound
};
