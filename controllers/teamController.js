const connect = require("../config/db");
const crypto = require('crypto');

const getAllTeams = async (req, res) => {
    try {
        const teams = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `team`", (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!teams.length) {
            return res.status(404).json({ message: "Nincsenek elérhető csapatok." });
        }

        return res.json({ message: "Csapatok sikeresen lekérve.", data: teams });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a csapatok lekérése során.", error });
    }
};

const getTeamByName = async (req, res) => {
    const { name } = req.params;

    if (!name) {
        return res.status(400).json({ message: "A csapat neve kötelező." });
    }

    try {
        const team = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `team` WHERE `name` = ?", [name], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!team.length) {
            return res.status(404).json({ message: "A megadott csapat nem található." });
        }

        return res.json({ message: "Csapat sikeresen lekérve.", data: team });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a csapat lekérése során.", error });
    }
};

const createTeam = async (req, res) => {
    const { name } = req.body;
    const inviteCode = crypto.randomBytes(3).toString('hex');
    const userId = 1

    if (!name) {
        return res.status(400).json({ message: "A csapat neve kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("INSERT INTO `team` (`id`, `name`, `inviteCode`, `createdBy`) VALUES (NULL, ?, ?, ?);", [name, inviteCode, userId], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        return res.json({ message: "Csapat sikeresen létrehozva.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a csapat létrehozása során.", error });
    }
};

const updateTeam = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "A csapat neve kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("UPDATE `team` SET `name` = ? WHERE `team`.`id` = ?", [name, id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (response.affectedRows === 0) {
            return res.status(404).json({ message: "A megadott ID-hoz tartozó csapat nem található." });
        }

        return res.json({ message: "Csapat sikeresen frissítve.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a csapat frissítése során.", error });
    }
};

const deleteTeam = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("DELETE FROM `team` WHERE `team`.`id` = ?", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (response.affectedRows === 0) {
            return res.status(404).json({ message: "A megadott ID-hoz tartozó csapat nem található." });
        }

        return res.json({ message: "Csapat sikeresen törölve.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a csapat törlése során.", error });
    }
};

const banTeam = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("UPDATE `team` SET `isBanned` = ? WHERE `team`.`id` = ?", [1, id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (response.affectedRows === 0) {
            return res.status(404).json({ message: "A megadott ID-hoz tartozó csapat nem található." });
        }

        return res.json({ message: "Csapat sikeresen kitiltva.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a csapat kitiltása során.", error });
    }
};

const unbanTeam = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("UPDATE `team` SET `isBanned` = ? WHERE `team`.`id` = ?", [0, id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (response.affectedRows === 0) {
            return res.status(404).json({ message: "A megadott ID-hoz tartozó csapat nem található." });
        }

        return res.json({ message: "Csapat sikeresen feloldva.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a csapat feloldása során.", error });
    }
};

const getInviteCode = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("SELECT `inviteCode` FROM team WHERE `team`.`id` = ?", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (response.affectedRows === 0) {
            return res.status(404).json({ message: "A megadott ID-hoz tartozó csapat nem található." });
        }

        return res.json({ message: "Kód sikeresen lekérve.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a kód lekérése során.", error });
    }
};

module.exports = {
    getAllTeams,
    getTeamByName,
    createTeam,
    updateTeam,
    deleteTeam,
    banTeam,
    unbanTeam,
    getInviteCode
};
