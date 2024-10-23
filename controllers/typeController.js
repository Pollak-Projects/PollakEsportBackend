const connect = require("../config/db");

const getAllTypes = async (req, res) => {
    try{
        const types = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `matchtype`", (err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(types);
    } catch (error){ res.status(500).json(error); }
};

const getTypeByType = async (req, res) => {

    const type = req.params.type; 

    try{
        const types = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `matchtype` WHERE `type` = ?", [type],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(types);
    } catch (error){ res.status(500).json(error); }
};

const createType = async (req, res) => {

    const type = req.body.type; 

    try{
        const response = await new Promise((resolve, reject) => {
            connect.query("INSERT INTO `matchtype` (`id`, `type`) VALUES (NULL, ?);", [type],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(response);
    } catch (error){ res.status(500).json(error); }
};

const updateType = async (req, res) => {

    const id = req.params.id;
    const type = req.body.type 

    try{
        const response = await new Promise((resolve, reject) => {
            connect.query("UPDATE `matchtype` SET `type` = ? WHERE `matchtype`.`id` = ?", [type, id],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(response);
    } catch (error){ res.status(500).json(error); }
};

const deleteType = async (req, res) => {

    const id = req.params.id;

    try{
        const response = await new Promise((resolve, reject) => {
            connect.query("DELETE FROM `matchtype` WHERE `matchtype`.`id` = ?", [id],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(response);
    } catch (error){ res.status(500).json(error); }
};

module.exports = {
    getAllTypes,
    getTypeByType,
    createType,
    updateType,
    deleteType
}
