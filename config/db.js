// config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

const pool = mysql.createPool(connectionString);

module.exports = pool;
