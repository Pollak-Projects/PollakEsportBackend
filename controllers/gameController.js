const connect = require("../config/db");

const getAllGames = async (req, res) => {
    try{
        const games = await new Promise(async (resolve, reject) => {
            connect.query("SELECT * FROM `game`", (err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(games);
    } catch (error){ res.status(500).json(error); }
};

const getGameById = async (req, res) => {
    
    const id = req.params.id; 

    try{
        const game = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `game` WHERE `id` = ?", [id],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(game);
    } catch (error){ res.status(500).json(error); }
};

const createGame = async (req, res) => {

    const name = req.body.name;
    const playerCount = req.body.playerCount; 
    const playerPerTeam = req.body.playerCount; 
    const requiredForPrize = req.body.requiredForPrize;
    
    try{
        const response = await new Promise((resolve, reject) => {
            connect.query("INSERT INTO `game` (`id`, `name`, `playerCount`, `playerPerTeam`, `requiredForPrize`) VALUES (NULL, ?, ?, ?, ?);", [name, playerCount,playerPerTeam,requiredForPrize],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(response);
    } catch (error){ res.status(500).json(error); }
};

const updateGame = async (req, res) => {

    const id = req.params.id;
    
    const name = req.body.name;
    const playerCount = req.body.playerCount; 
    const playerPerTeam = req.body.playerCount; 
    const requiredForPrize = req.body.requiredForPrize;

    try{
        const response = await new Promise((resolve, reject) => {
            connect.query("UPDATE `game` SET `name` = ?, `playerCount` = ?, `playerPerTeam` = ?, `requiredForPrize` = ? WHERE `game`.`id` = ?", [name, playerCount, playerPerTeam, requiredForPrize, id],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(response);
    } catch (error){ res.status(500).json(error); }
};

const deleteGame = async (req, res) => {

    const id = req.params.id;

    try{
        const response = await new Promise((resolve, reject) => {
            connect.query("DELETE FROM `game` WHERE `game`.`id` = ?", [id],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(response);
    } catch (error){ res.status(500).json(error); }
};

module.exports = {
    getAllGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
}
