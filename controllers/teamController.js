const connect = require("../config/db");

const getAllTeams = async (req, res) => {
    try{
        const teams = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `team`", (err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(teams);
    } catch (error){ res.status(500).json(error); }
};

const getTeamByName = async (req, res) => {
    
    const name = req.params.name; 

    try{
        const team = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `team` WHERE `name` = ?", [name],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(team);
    } catch (error){ res.status(500).json(error); }
};

const createTeam = async (req, res) => {

    const name = req.body.name; 

    try{
        const respone = await new Promise((resolve, reject) => {
            connect.query("INSERT INTO `team` (`id`, `name`) VALUES (NULL, ?);", [name],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(respone);
    } catch (error){ res.status(500).json(error); }
};

const updateTeam = async (req, res) => {

    const id = req.params.id;
    const name = req.body.name 

    try{
        const respone = await new Promise((resolve, reject) => {
            connect.query("UPDATE `team` SET `name` = ? WHERE `team`.`id` = ?", [name, id],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(respone);
    } catch (error){ res.status(500).json(error); }
};

const deleteTeam = async (req, res) => {

    const id = req.params.id;

    try{
        const respone = await new Promise((resolve, reject) => {
            connect.query("DELETE FROM `team` WHERE `team`.`id` = ?", [id],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(respone);
    } catch (error){ res.status(500).json(error); }
};

module.exports = {
    getAllTeams,
    getTeamByName,
    createTeam,
    updateTeam,
    deleteTeam
}
