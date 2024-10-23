const connect = require("../config/db");

const getAllUsersOnTeams = async (req, res) => {
    try{
        const usersonteam = await new Promise(async (resolve, reject) => {
            connect.query("SELECT * FROM `usersonteam`", (err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(usersonteam);
    } catch (error){ res.status(500).json(error); }
};

const getUsersOnTeamById = async (req, res) => {
    
    const teamid = req.params.teamid; 

    try{
        const useronteam = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `usersonteam` WHERE `teamId` = ?", [teamid],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(useronteam);
    } catch (error){ res.status(500).json(error); }
};

const createUsersOnTeam = async (req, res) => {
    
    const teamId = req.body.teamId;
    const userId = req.body.userId; 
    
    try{
        const response = await new Promise((resolve, reject) => {
            connect.query("INSERT INTO `usersonteam` (`teamId`, `userId`) VALUES (?, ?);", [teamId, userId],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(response);
    } catch (error){ res.status(500).json(error); }
};

const deleteUsersOnTeam = async (req, res) => {

    const teamId = req.body.teamId;
    const userId = req.body.userId; 

    try{
        const response = await new Promise((resolve, reject) => {
            connect.query("DELETE FROM `usersonteam` WHERE `usersonteam`.`teamId` = ? AND `usersonteam`.`userId` = ?", [teamId, userId],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(response);
    } catch (error){ res.status(500).json(error); }
};

module.exports = {
    getAllUsersOnTeams,
    getUsersOnTeamById,
    createUsersOnTeam,
    deleteUsersOnTeam
}
