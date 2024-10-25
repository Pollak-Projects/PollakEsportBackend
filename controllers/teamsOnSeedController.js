const connect = require("../config/db");

const getAllTeamsOnSeed = async (req, res) => {
    try {
        const teamsonseed = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `teamsonseed`", (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!teamsonseed.length) {
            return res.status(404).json({ message: "Nincsenek elérhető csapatok a meccseken." });
        }

        return res.json({ message: "Csapatok a meccsken sikeresen lekérve.", data: teamsonseed });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a csapatok lekérése során.", error });
    }
};

const getTeamsOnSeedById = async (req, res) => {
    const { seedid } = req.params;

    if (!seedid) {
        return res.status(400).json({ message: "A seed ID-ja kötelező." });
    }

    try {
        const teamonseed = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `teamsonseed` WHERE `seedId` = ?", [seedid], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!teamonseed.length) {
            return res.status(404).json({ message: "A megadott meccshez tartozó csapat nem található." });
        }

        return res.json({ message: "Csapat a meccshez sikeresen lekérve.", data: teamonseed });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a csapat lekérése során.", error });
    }
};

const createTeamsOnSeed = async (req, res) => {
    const { teamOneId, teamTwoId, seedId, teamOneScore, teamTwoScore } = req.body;

    if (!teamOneId || !teamTwoId || !seedId) {
        return res.status(400).json({ message: "A csapatok és a meccs ID-jának megadása kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query(
                "INSERT INTO `teamsonseed` (`teamOneId`, `teamTwoId`, `seedId`, `teamOneScore`, `teamTwoScore`) VALUES (?, ?, ?, ?, ?);",
                [teamOneId, teamTwoId, seedId, teamOneScore, teamTwoScore],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });

        return res.json({ message: "Csapatok sikeresen létrehozva a meccshez.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a csapatok létrehozása során.", error });
    }
};

const deleteTeamsOnSeed = async (req, res) => {
    const { teamOneId, teamTwoId, seedId } = req.body;

    if (!teamOneId || !teamTwoId || !seedId) {
        return res.status(400).json({ message: "A csapatok és a meccs ID-jának megadása kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query(
                "DELETE FROM `teamsonseed` WHERE `teamsonseed`.`teamOneId` = ? AND `teamsonseed`.`teamTwoId` = ? AND `teamsonseed`.`seedId` = ?",
                [teamOneId, teamTwoId, seedId],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });

        if (response.affectedRows === 0) {
            return res.status(404).json({ message: "A megadott csapatok nem találhatóak a meccsekben." });
        }

        return res.json({ message: "Csapatok sikeresen törölve a meccsekből.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a csapatok törlése során.", error });
    }
};

module.exports = {
    getAllTeamsOnSeed,
    getTeamsOnSeedById,
    createTeamsOnSeed,
    deleteTeamsOnSeed
};
