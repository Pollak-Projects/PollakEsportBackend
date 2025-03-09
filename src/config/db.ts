require("dotenv").config();
import mysql from "mysql";

const connect = mysql.createConnection({
  host: process.env.DB_HOST! || "localhost",
  port: parseInt(process.env.DB_POST!) || 3306,
  user: process.env.DB_USER! || "root",
  password: process.env.DB_PASS! || "",
  database: process.env.DB_NAME! || "pollakbackend",
});

export default connect;
