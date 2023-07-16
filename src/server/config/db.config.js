const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "jobs",
    password: "ender",
    port: 5432,
});

pool.connect(function(err) {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to database');
    }
});

module.exports = pool;