const connect = require("../config/db");

const getAllUsers = async (req, res) => {
    try {
        const users = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `users`", (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!users.length) {
            return res.status(404).json({ message: "Nincsenek elérhető felhasználók." });
        }

        return res.json({ message: "Felhasználók sikeresen lekérve.", data: users });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a felhasználók lekérése során.", error });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Az ID megadása kötelező." });
    }

    try {
        const user = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `users` WHERE `id` = ?", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!user.length) {
            return res.status(404).json({ message: "A megadott felhasználó nem található." });
        }

        return res.json({ message: "Felhasználó sikeresen lekérve.", data: user });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a felhasználó lekérése során.", error });
    }
};

//This will be deleted probably since the authController will handle the registers. 
const createUser = async (req, res) => {
    const { username, name, email, om, password } = req.body;

    if (!username || !name || !email || !om || !password) {
        return res.status(400).json({ message: "Minden mező megadása kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("INSERT INTO `users` (`id`, `username`, `email`, `om`, `password`, `name`) VALUES (NULL, ?, ?, ?, ?, ?);", [username, email, om, password, name], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        return res.json({ message: "Felhasználó sikeresen létrehozva.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a felhasználó létrehozása során.", error });
    }
};

//Again, idk whether we want to give options for changing these, but here it is in case we need it.
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, name, email, om, password } = req.body;

    if (!id || !username || !name || !email || !om || !password) {
        return res.status(400).json({ message: "Minden mező és az ID megadása kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("UPDATE `users` SET `username` = ?, `email` = ?, `om` = ?, `password` = ?, `name` = ? WHERE `users`.`id` = ?", [username, email, om, password, name, id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (response.affectedRows === 0) {
            return res.status(404).json({ message: "A megadott ID-hoz tartozó felhasználó nem található." });
        }

        return res.json({ message: "Felhasználó sikeresen frissítve.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a felhasználó frissítése során.", error });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Az ID megadása kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("DELETE FROM `users` WHERE `users`.`id` = ?", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (response.affectedRows === 0) {
            return res.status(404).json({ message: "A megadott ID-hoz tartozó felhasználó nem található." });
        }

        return res.json({ message: "Felhasználó sikeresen törölve.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a felhasználó törlése során.", error });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
