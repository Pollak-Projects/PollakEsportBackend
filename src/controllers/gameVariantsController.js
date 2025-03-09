const connect = require("../config/db");

const getAllGameVariants = async (req, res) => {
    try {
        const gamevariants = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `gamevariants`", (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!gamevariants.length) {
            return res.status(404).json({ message: "Nincs elérhető játékváltozat." });
        }

        return res.json({ message: "Játékváltozatok sikeresen lekérve.", data: gamevariants });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a játékváltozatok lekérése során.", error });
    }
};

const getGameVariantByGameId = async (req, res) => {
    const { gameid } = req.params;

    if (!gameid) {
        return res.status(400).json({ message: "A játék ID-ja kötelező." });
    }

    try {
        const gamevariant = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `gamevariants` WHERE `gameId` = ?", [gameid], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!gamevariant.length) {
            return res.status(404).json({ message: "Nincs elérhető játékváltozat a megadott játék ID-val." });
        }

        return res.json({ message: "Játékváltozat sikeresen lekérve.", data: gamevariant });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a játékváltozat lekérése során.", error });
    }
};

const createGameVariant = async (req, res) => {
    const { variantId, gameId, typeId } = req.body;

    if (!variantId || !gameId || !typeId) {
        return res.status(400).json({ message: "Minden mező kitöltése kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("INSERT INTO `gamevariants` (`variantId`, `gameId`, `typeId`) VALUES (?, ?, ?);", 
                [variantId, gameId, typeId], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        return res.status(201).json({ message: "Játékváltozat sikeresen létrehozva.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a játékváltozat létrehozása során.", error });
    }
};

const deleteGameVariant = async (req, res) => {
    const { variantId, gameId, typeId } = req.body;

    if (!variantId || !gameId || !typeId) {
        return res.status(400).json({ message: "Minden mező kitöltése kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("DELETE FROM `gamevariants` WHERE `gamevariants`.`gameId` = ? AND `gamevariants`.`variantId` = ? AND `gamevariants`.`typeId` = ?", 
                [gameId, variantId, typeId], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (response.affectedRows === 0) {
            return res.status(404).json({ message: "Nincs elérhető játékváltozat a megadott adatokkal." });
        }

        return res.json({ message: "Játékváltozat sikeresen törölve.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a játékváltozat törlése során.", error });
    }
};

module.exports = {
    getAllGameVariants,
    getGameVariantByGameId,
    createGameVariant,
    deleteGameVariant
};
