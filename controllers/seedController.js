const connect = require("../config/db");

const getAllSeeds = async (req, res) => {
    try{
        const seeds = await new Promise(async (resolve, reject) => {
            connect.query("SELECT * FROM `seed`", (err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(seeds);
    } catch (error){ res.status(500).json(error); }
};

const getSeedById = async (req, res) => {
    
    const id = req.params.id; 

    try{
        const seed = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `seed` WHERE `id` = ?", [id],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(seed);
    } catch (error){ res.status(500).json(error); }
};

const createSeed = async (req, res) => {
    
    const date = req.body.date || Date.now();
    const roundId = req.body.roundId; 
    
    try{
        const response = await new Promise((resolve, reject) => {
            connect.query("INSERT INTO `seed` (`id`, `date`, `roundId`) VALUES (NULL, ?, ?);", [date, roundId],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(response);
    } catch (error){ res.status(500).json(error); }
};

const updateSeed = async (req, res) => {

    const id = req.params.id;
    
    const date = req.body.date || Date.now();
    const roundId = req.body.roundId; 

    try{
        const response = await new Promise((resolve, reject) => {
            connect.query("UPDATE `seed` SET `date` = ?, `roundId` = ? WHERE `seed`.`id` = ?", [date, roundId, id],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(response);
    } catch (error){ res.status(500).json(error); }
};

const deleteSeed = async (req, res) => {

    const id = req.params.id;

    try{
        const response = await new Promise((resolve, reject) => {
            connect.query("DELETE FROM `seed` WHERE `seed`.`id` = ?", [id],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(response);
    } catch (error){ res.status(500).json(error); }
};

module.exports = {
    getAllSeeds,
    getSeedById,
    createSeed,
    updateSeed,
    deleteSeed
}
