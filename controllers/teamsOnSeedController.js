const connect = require("../config/db");

const getAllTeamsOnSeed = async (req, res) => {
    try{
        const teamsonseed = await new Promise(async (resolve, reject) => {
            connect.query("SELECT * FROM `teamsonseed`", (err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(teamsonseed);
    } catch (error){ res.status(500).json(error); }
};

const getTeamsOnSeedById = async (req, res) => {
    
    const seedId = req.params.seedid; 
    
    try{
        const teamonseed = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `teamsonseed` WHERE `seedId` = ?", [seedId],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(teamonseed);
    } catch (error){ res.status(500).json(error); }
};

const createTeamsOnSeed = async (req, res) => {

    const teamOneId = req.body.teamOneId;
    const teamTwoId = req.body.teamTwoId; 
    const seedId = req.body.seedId; 
    
    try{
        const response = await new Promise((resolve, reject) => {
            connect.query("INSERT INTO `teamsonseed` (`teamOneId`, `teamTwoId`, `seedId`) VALUES (?, ?, ?);", [teamOneId, teamTwoId, seedId],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(response);
    } catch (error){ res.status(500).json(error); }
};

const deleteTeamsOnSeed = async (req, res) => {

    const teamOneId = req.body.teamOneId;
    const teamTwoId = req.body.teamTwoId; 
    const seedId = req.body.seedId;

    try{
        const response = await new Promise((resolve, reject) => {
            connect.query("DELETE FROM `teamsonseed` WHERE `teamsonseed`.`teamOneId` = ? AND `teamsonseed`.`teamTwoId` = ? AND `teamsonseed`.`seedId` = ?", [teamOneId, teamTwoId,seedId],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(response);
    } catch (error){ res.status(500).json(error); }
};

module.exports = {
    getAllTeamsOnSeed,
    getTeamsOnSeedById,
    createTeamsOnSeed,
    deleteTeamsOnSeed
}
