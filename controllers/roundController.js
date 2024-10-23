const connect = require("../config/db");

const getAllRounds = async (req, res) => {
    try{
        const rounds = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `round`", (err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(rounds);
    } catch (error){ res.status(500).json(error); }
};

const getRoundById = async (req, res) => {
    
    const id = req.params.id; 

    try{
        const round = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `round` WHERE `id` = ?", [id],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(round);
    } catch (error){ res.status(500).json(error); }
};

const createRound = async (req, res) => {

    const number = req.body.number;
    const title = req.body.title; 
    
    try{
        const response = await new Promise((resolve, reject) => {
            connect.query("INSERT INTO `round` (`id`, `number`, `title`) VALUES (NULL, ?, ?);", [number, title],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(response);
    } catch (error){ res.status(500).json(error); }
};

const updateRound = async (req, res) => {

    const id = req.params.id;
    
    const number = req.body.name;
    const title = req.body.title; 

    try{
        const response = await new Promise((resolve, reject) => {
            connect.query("UPDATE `round` SET `title` = ?, `number` = ? WHERE `round`.`id` = ?", [title, number, id],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(response);
    } catch (error){ res.status(500).json(error); }
};

const deleteRound = async (req, res) => {

    const id = req.params.id;

    try{
        const response = await new Promise((resolve, reject) => {
            connect.query("DELETE FROM `round` WHERE `round`.`id` = ?", [id],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(response);
    } catch (error){ res.status(500).json(error); }
};

module.exports = {
    getAllRounds,
    getRoundById,
    createRound,
    updateRound,
    deleteRound
}
