const connect = require("../config/db");

const getAllVariants = async (req, res) => {
    try {
        const variants = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `variant`", (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!variants.length) {
            return res.status(404).json({ message: "Nincsenek elérhető variánsok." });
        }

        return res.json({ message: "Variánsok sikeresen lekérve.", data: variants });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a variánsok lekérése során.", error });
    }
};

const getVariantByName = async (req, res) => {
    const { name } = req.params;

    if (!name) {
        return res.status(400).json({ message: "A variáns név megadása kötelező." });
    }

    try {
        const variant = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `variant` WHERE `name` = ?", [name], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!variant.length) {
            return res.status(404).json({ message: "A megadott variáns nem található." });
        }

        return res.json({ message: "Variáns sikeresen lekérve.", data: variant });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a variáns lekérése során.", error });
    }
};

const createVariant = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "A variáns név megadása kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("INSERT INTO `variant` (`id`, `name`) VALUES (NULL, ?);", [name], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        return res.json({ message: "Variáns sikeresen létrehozva.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a variáns létrehozása során.", error });
    }
};

const updateVariant = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!id || !name) {
        return res.status(400).json({ message: "A variáns ID és név megadása kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("UPDATE `variant` SET `name` = ? WHERE `variant`.`id` = ?", [name, id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (response.affectedRows === 0) {
            return res.status(404).json({ message: "A megadott variáns nem található." });
        }

        return res.json({ message: "Variáns sikeresen frissítve.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a variáns frissítése során.", error });
    }
};

const deleteVariant = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "A variáns ID megadása kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("DELETE FROM `variant` WHERE `variant`.`id` = ?", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (response.affectedRows === 0) {
            return res.status(404).json({ message: "A megadott variáns nem található." });
        }

        return res.json({ message: "Variáns sikeresen eltávolítva.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a variáns eltávolítása során.", error });
    }
};

module.exports = {
    getAllVariants,
    getVariantByName,
    createVariant,
    updateVariant,
    deleteVariant,
};
