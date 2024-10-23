const connect = require("../config/db");

const getAllUsers = async (req, res) => {
    try{
        const users = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `users`", (err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(users);
    } catch (error){ res.status(500).json(error); }
};

const getUserById = async (req, res) => {

    const id = req.params.id; 

    try{
        const user = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `users` WHERE `id` = ?", [id],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(user);
    } catch (error){ res.status(500).json(error); }
};


//This will be deleted probably since the authController will handle the registers. 
const createUser = async (req, res) => {

    const username = req.body.username; 
    const email = req.body.email;
    const om = req.body.om;
    const pwd = req.body.password;  

    try{
        const response = await new Promise((resolve, reject) => {
            connect.query("INSERT INTO `users` (`id`, `username`,`email`,`om`,`password`) VALUES (NULL, ?, ?, ?, ?);", [username, email, om, pwd],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(response);
    } catch (error){ res.status(500).json(error); }
};

//Again, idk whether we want to give options for changing these, but here it is in case we need it.
const updateUser = async (req, res) => {
    
    const id = req.params.id;

    const username = req.body.username; 
    const email = req.body.email;
    const om = req.body.om;
    const pwd = req.body.password; 

    try{
        const response = await new Promise((resolve, reject) => {
            connect.query("UPDATE `users` SET `username` = ?, `email` = ?,`om` = ?,`password` = ? WHERE `users`.`id` = ?", [username, email, om, pwd, id],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(response);
    } catch (error){ res.status(500).json(error); }
};

const deleteUser = async (req, res) => {

    const id = req.params.id;

    try{
        const response = await new Promise((resolve, reject) => {
            connect.query("DELETE FROM `users` WHERE `users`.`id` = ?", [id],(err, result) => {
                if (err) reject(err); 
                else resolve(result);
            });
        });

        return res.json(response);
    } catch (error){ res.status(500).json(error); }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}
