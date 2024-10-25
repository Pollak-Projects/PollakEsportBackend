const connect = require("../config/db");

const getAllTypes = async (req, res) => {
    try {
        const types = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `matchtype`", (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!types.length) {
            return res.status(404).json({ message: "Nincsenek elérhető típusk." });
        }

        return res.json({ message: "Típusok sikeresen lekérve.", data: types });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a típusk lekérése során.", error });
    }
};

const getTypeByType = async (req, res) => {
    const { type } = req.params;

    if (!type) {
        return res.status(400).json({ message: "A típus megadása kötelező." });
    }

    try {
        const types = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `matchtype` WHERE `type` = ?", [type], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!types.length) {
            return res.status(404).json({ message: "A megadott típus nem található." });
        }

        return res.json({ message: "Típus sikeresen lekérve.", data: types });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a típus lekérése során.", error });
    }
};

const createType = async (req, res) => {
    const { type } = req.body;

    if (!type) {
        return res.status(400).json({ message: "A típus megadása kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("INSERT INTO `matchtype` (`id`, `type`) VALUES (NULL, ?);", [type], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        return res.json({ message: "Típus sikeresen létrehozva.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a típus létrehozása során.", error });
    }
};

const updateType = async (req, res) => {
    const { id } = req.params;
    const { type } = req.body;

    if (!id || !type) {
        return res.status(400).json({ message: "A típus és az ID megadása kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("UPDATE `matchtype` SET `type` = ? WHERE `matchtype`.`id` = ?", [type, id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (response.affectedRows === 0) {
            return res.status(404).json({ message: "A megadott ID-hoz tartozó típus nem található." });
        }

        return res.json({ message: "Típus sikeresen frissítve.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a típus frissítése során.", error });
    }
};

const deleteType = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Az ID megadása kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("DELETE FROM `matchtype` WHERE `matchtype`.`id` = ?", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (response.affectedRows === 0) {
            return res.status(404).json({ message: "A megadott ID-hoz tartozó típus nem található." });
        }

        return res.json({ message: "Típus sikeresen törölve.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a típus törlése során.", error });
    }
};

module.exports = {
    getAllTypes,
    getTypeByType,
    createType,
    updateType,
    deleteType
};
