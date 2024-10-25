const connect = require("../config/db");

const getAllSeeds = async (req, res) => {
    try {
        const seeds = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `seed`", (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!seeds.length) {
            return res.status(404).json({ message: "Nincsenek elérhető meccsek." });
        }

        return res.json({ message: "meccsek sikeresen lekérve.", data: seeds });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a meccsek lekérése során.", error });
    }
};

const getSeedById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "A mag ID-ja kötelező." });
    }

    try {
        const seed = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `seed` WHERE `id` = ?", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!seed.length) {
            return res.status(404).json({ message: "A megadott meccs nem található." });
        }

        return res.json({ message: "Mec sikeresen lekérve.", data: seed });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a meccs lekérése során.", error });
    }
};

const createSeed = async (req, res) => {
    const { roundId, date = Date.now() } = req.body;

    if (!roundId) {
        return res.status(400).json({ message: "A forduló ID-ja kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("INSERT INTO `seed` (`date`, `roundId`) VALUES (?, ?);", [date, roundId], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        return res.status(201).json({ message: "Meccs sikeresen létrehozva.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a meccs létrehozása során.", error });
    }
};

const updateSeed = async (req, res) => {
    const { id } = req.params;
    const { roundId, date = Date.now() } = req.body;

    if (!id) {
        return res.status(400).json({ message: "A meccs ID-ja kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("UPDATE `seed` SET `date` = ?, `roundId` = ? WHERE `id` = ?", [date, roundId, id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (response.affectedRows === 0) {
            return res.status(404).json({ message: "A megadott meccs nem található." });
        }

        return res.json({ message: "Meccs sikeresen frissítve.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a meccs frissítése során.", error });
    }
};

const deleteSeed = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "A meccs ID-ja kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("DELETE FROM `seed` WHERE `id` = ?", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (response.affectedRows === 0) {
            return res.status(404).json({ message: "A megadott meccs nem található." });
        }

        return res.json({ message: "Meccs sikeresen törölve.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a meccs törlése során.", error });
    }
};

module.exports = {
    getAllSeeds,
    getSeedById,
    createSeed,
    updateSeed,
    deleteSeed
};
