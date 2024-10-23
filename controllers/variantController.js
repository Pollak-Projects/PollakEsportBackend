const connect = require("../config/db");

const getAllVariants = async (req, res) => {
    try{
        const variants = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `variant`", (err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(variants);
    } catch (error){ res.status(500).json(error); }
};

const getVariantByName = async (req, res) => {

    const name = req.params.name; 

    try{
        const variant = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `variant` WHERE `name` = ?", [name],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(variant);
    } catch (error){ res.status(500).json(error); }
};

const createVariant = async (req, res) => {

    const name = req.body.name; 

    try{
        const response = await new Promise((resolve, reject) => {
            connect.query("INSERT INTO `variant` (`id`, `name`) VALUES (NULL, ?);", [name],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(response);
    } catch (error){ res.status(500).json(error); }
};

const updateVariant = async (req, res) => {
    const id = req.params.id;
    const name = req.body.name 

    try{
        const response = await new Promise((resolve, reject) => {
            connect.query("UPDATE `variant` SET `name` = ? WHERE `variant`.`id` = ?", [name, id],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(response);
    } catch (error){ res.status(500).json(error); }
};

const deleteVariant = async (req, res) => {
    const id = req.params.id;

    try{
        const response = await new Promise((resolve, reject) => {
            connect.query("DELETE FROM `variant` WHERE `variant`.`id` = ?", [id],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(response);
    } catch (error){ res.status(500).json(error); }
};

module.exports = {
    getAllVariants,
    getVariantByName,
    createVariant,
    updateVariant,
    deleteVariant,
}
