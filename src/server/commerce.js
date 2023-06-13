const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');



const app = express();

//solve the cors issue

cors({
    origin: 'http://localhost:3000',
    credentials: true
});

app.use(cors());

app.use(express.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "commerce",
    password: "ender",
    port: 5432,
});

app.use(bodyParser.json());

/*
* CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

* */

app.post('/api/users/register', async (req, res) => {

    //check colum constraints
    const {name, email, password} = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length > 0) {
        return res.json({
            status: "error",
            message: "Email already exists"
        });
    }
    const newUser = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, password]);
    res.json({
        status: "success",
        message: `User ${name} created successfully`,
        data: newUser.rows[0]
    });
});

app.post('/api/users/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1 AND password = $2", [email, password]);
    if (user.rows.length === 0) {
        return res.json({
            status: "error",
            message: "Invalid credentials"
        });
    }
    res.json({
        status: "success",
        message: `User ${user.rows[0].name} logged in successfully`,
        data: user.rows[0]
    });
});

app.get('/api/users', async (req, res) => {
    //search for users
    const searchTerm = req.query.search;
    if(!searchTerm){
        const users = await pool.query("SELECT * FROM users");
        res.json({
            status: "success",
            message: `Retrieved ${users.rows.length} users`,
            data: users.rows
        });
    }
    else{

            const users=await pool.query(`select * from users where name ilike '%${searchTerm}%' or email ilike '%${searchTerm}%'`)
            res.json({
                status: "success",
                message: `Retrieved ${users.rows.length} users`,
                data: users.rows
            });
    }
});

app.get('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    res.json({
        status: "success",
        message: `Retrieved user with id ${id}`,
        data: user.rows[0]
    });
});

app.put('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    const {name, email, password} = req.body;
    const user = await pool.query("UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *", [name, email, password, id]);
    res.json({
        status: "success",
        message: `Updated user with id ${id}`,
        data: user.rows[0]
    });
});

app.delete('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    const user = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({
        status: "success",
        message: `Deleted user with id ${id}`,
        data: user.rows[0]
    });
});


app.listen(5000, () => {
    console.log('Server listening on port 5000');
});