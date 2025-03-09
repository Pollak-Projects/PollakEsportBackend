const connect = require("../config/db");

const getAllGamesForCards = async (req, res) => {
    try {
        const games = await new Promise((resolve, reject) => {
            connect.query(`
                SELECT 
                    g.id AS game_id,
                    g.name AS game_name,
                    g.playerCount,
                    g.playerPerTeam,
                    g.requiredForPrize,
                    g.status AS game_status,
                    v.id AS variant_id,
                    v.name AS variant_name,
                    mt.id AS matchtype_id,
                    mt.type AS match_type
                FROM 
                    game g
                JOIN 
                    gamevariants gv ON g.id = gv.gameId
                JOIN 
                    variant v ON gv.variantId = v.id
                JOIN 
                    matchtype mt ON gv.typeId = mt.id;
            `, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!games.length) {
            return res.status(404).json({ message: "Nincsenek elérhető játékok." });
        }

        return res.json({ message: "Játékok sikeresen lekérve.", data: games });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a játékok lekérése során.", error });
    }
};

const getDataForBrackets = async (req, res) => {
    const { gameid } = req.params;

    if (!gameid) {
        return res.status(400).json({ message: "A játék ID-ja kötelező." });
    }

    try {
        const data = await new Promise((resolve, reject) => {
            connect.query(`
                SELECT 
                    ts.seedId as seed_id,
                    ts.teamOneScore as teamA_score,
                    ts.teamTwoScore as teamB_score,
                    t1.id as teamA_id,
                    t2.id as teamB_id,
                    t1.name as teamA_name,
                    t2.name as teamB_name,
                    r.number as round_number
                FROM 
                    roundsongame rg
                JOIN 
                    seed s ON rg.roundId = s.roundId
                JOIN 
                    teamsonseed ts ON s.id = ts.seedId
                JOIN 
                    team t1 ON t1.id = ts.teamOneId
                JOIN 
                    team t2 ON t2.id = ts.teamTwoId
                JOIN 
                    round r ON rg.roundId = r.id
                WHERE 
                    rg.gameId = ?
            `, [gameid], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!data.length) {
            return res.status(404).json({ message: "Nincs elérhető adat a megadott játék ID-val." });
        }

        const resp = formatRoundsWithScores(data);
        return res.json({ message: "Adatok sikeresen lekérve.", data: resp });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt az adatok lekérése során.", error });
    }
};

const getTeamsWithUsers = async (req, res) => {
    const { teamid } = req.params;

    if (!teamid) {
        return res.status(400).json({ message: "A csapat ID-ja kötelező." });
    }

    try {
        const users = await new Promise((resolve, reject) => {
            connect.query(`
                SELECT 
                    t.id as team_id,
                    t.name as team_name,
                    t.isBanned as is_banned,
                    u.id as user_id,
                    u.username as username
                FROM 
                    usersonteam uot
                JOIN 
                    team t ON uot.teamId = t.id
                JOIN 
                    users u ON uot.userId = u.id
                WHERE 
                    uot.teamId = ?
            `, [teamid], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!users.length) {
            return res.status(404).json({ message: "Nincs elérhető felhasználó a megadott csapat ID-val." });
        }

        return res.json({ message: "Felhasználók sikeresen lekérve.", data: users });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a felhasználók lekérése során.", error });
    }
};

const updateScores = async (req, res) => {
    const { teamOneId, teamOneScore, teamTwoId, teamTwoScore, seedId } = req.body;

    if (!teamOneId || !teamOneScore || !teamTwoId || !teamTwoScore || !seedId) {
        return res.status(400).json({ message: "Minden mező kitöltése kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query(`
                UPDATE teamsonseed SET 
                teamOneScore = ?,
                teamTwoScore = ?
                WHERE 
                teamOneId = ? AND
                teamTwoId = ? AND
                seedId = ?
            `, [teamOneScore, teamTwoScore, teamOneId, teamTwoId, seedId], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (response.affectedRows === 0) {
            return res.status(404).json({ message: "Nincs elérhető csapat a megadott adatokkal." });
        }

        return res.json({ message: "Pontszámok sikeresen frissítve.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a pontszámok frissítése során.", error });
    }
};

const formatRoundsWithScores = (results) => {
    let seedCounter = 1;

    const roundsMap = results.reduce((acc, row) => {
        const roundTitle = `Round ${row.round_number}`;
        if (!acc[roundTitle]) {
            acc[roundTitle] = {
                title: roundTitle,
                seeds: []
            };
        }

        acc[roundTitle].seeds.push({
            id: seedCounter++,
            seedId: row.seed_id,
            date: new Date().toDateString(),
            teams: [
                {
                    name: row.teamA_name,
                    teamAid: row.teamA_id,
                    teamAscore: row.teamA_score
                },
                {
                    name: row.teamB_name,
                    teamBid: row.teamB_id,
                    teamBscore: row.teamB_score
                }
            ]
        });

        return acc;
    }, {});

    return Object.values(roundsMap);
};

module.exports = {
    getAllGamesForCards,
    getDataForBrackets,
    getTeamsWithUsers,
    updateScores
};
