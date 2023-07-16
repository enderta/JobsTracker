const express = require("express");
const app = express();
const cors = require("cors");
const {Pool} = require("pg");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {check, validationResult} = require("express-validator");
const {decode} = require("jsonwebtoken");
const verifyToken = require("./verifyToken");
const secret = "secret";



cors({
    origin: 'http://localhost:3000',
    credentials: true
});

app.use(cors());

app.use(express.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "jobs",
    password: "ender",
    port: 5432,
});

app.use(bodyParser.json());



app.post('/api/users/register', [
    check("username").isLength({min: 3}),
    check("password").isLength({min: 5}),
    check("email").isEmail()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            status: "error",
            message: "Invalid request",
            data: errors.array()
        });
    } else {
        const {username, password, email} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await pool.query("INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *", [username, hashedPassword, email]);
        res.json({
            status: "success",
            message: `Inserted user with id ${user.rows[0].id}`,
            data: user.rows[0]
        });
    }
});

app.post('/api/users/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (user.rows.length === 0) {
        res.status(401).json({
            status: "error",
            message: "Invalid username/password",
        });
    } else {
        const hashedPassword = user.rows[0].password;
        const isMatch = await bcrypt.compare(password, hashedPassword);
        if (isMatch) {
            const token = jwt.sign({id: user.rows[0].id}, secret);
            res.json({
                status: "success",
                message: "Logged in",
                token: token
            });
        } else {
            res.status(401).json({
                status: "error",
                message: "Invalid username/password",
            });
        }
    }
});



app.get('/api/users',verifyToken, async (req, res) => {
    const users = await pool.query("SELECT * FROM users");
    res.json({
        status: "success",
        message: `Retrieved ${users.rows.length} users`,
        data: users.rows
    });
});

app.delete('/api/users/:id',verifyToken,async (req,res)=>{
    const id = req.params.id;
    const user = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    if (user.rows.length === 0) {
        res.status(404).json({
            status: "error",
            message: "User not found",
        });
    } else {
        res.status(200).json({
            status: "success",
            message: "User deleted",
            data: user.rows[0],
        });
    }
});