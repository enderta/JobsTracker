const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_DATABASE || "jobs",
    password: process.env.DB_PASSWORD || "ender",
    port: process.env.DB_PORT || 5432,
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.connect(function(err) {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to database');
    }
});

module.exports = pool;