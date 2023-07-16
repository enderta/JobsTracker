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


export const allJobs= app.get('/api/jobs', verifyToken, async (req, res) => {
    const searchTerm = req.query.search;
    if(!searchTerm){
        const jobs = await pool.query("SELECT * FROM jobs");
        res.json({
            status: "success",
            message: `Retrieved ${jobs.rows.length} jobs`,
            data: jobs.rows
        });
    } else {
        const jobs = await pool.query(
            `SELECT * FROM jobs WHERE title ILIKE $1 
            OR company ILIKE $1 
            OR location ILIKE $1 
            OR description ILIKE $1 
            OR requirements ILIKE $1`,
            [`%${searchTerm}%`],   // Preventing query from SQL Injection by passing parameters
        );
        res.json({
            status: "success",
            message: `Retrieved ${jobs.rows.length} jobs`,
            data: jobs.rows
        });
    }
});

app.get('/api/jobs/:id',verifyToken, async (req, res) => {
    const id = req.params.id;
    const job = await pool.query("SELECT * FROM jobs WHERE id = $1", [id]);
    if (job.rows.length === 0) {
        res.status(404).json({
            status: "error",
            message: "Job not found",
        });
    } else {
        res.json({
            status: "success",
            message: `Retrieved job with id ${id}`,
            data: job.rows[0]
        });
    }
});

app.post('/api/jobs',verifyToken ,async (req, res) => {
    const { title, company, location, description, requirements } = req.body;
    const job = await pool.query("INSERT INTO jobs (title, company, location, description, requirements) VALUES ($1, $2, $3, $4, $5) RETURNING *", [title, company, location, description, requirements]);
    res.json({
        status: "success",
        message: `Inserted job with id ${job.rows[0].id}`,
        data: job.rows[0]
    });

    app.put('/api/jobs/:id',verifyToken ,async (req, res) => {
        const id = req.params.id;
        const { title, company, location, description,is_applied, requirements } = req.body;
        const job = await pool.query("UPDATE jobs SET title = $1, company = $2, location = $3, description = $4, is_applied = $5, requirements = $6 WHERE id = $7 RETURNING *", [title, company, location, description, is_applied, requirements, id]);
        res.json({
            status: "success",
            message: `Updated job with id ${id}`,
            data: job.rows[0]
        });
    })

});
//patch only is_applied
app.patch('/api/jobs/:id',verifyToken ,async (req, res) => {
    const id = req.params.id;
    const { is_applied, updated_at } = req.body;
    const job = await pool.query("UPDATE jobs SET is_applied = $1, updated_at = $2 WHERE id = $3 RETURNING *", [is_applied, updated_at, id]);
    res.json({
        status: "success",
        message: `Updated job with id ${id}`,
        data: job.rows[0]
    });

});


app.delete('/api/jobs/:id',verifyToken, async (req, res) => {
    const id = req.params.id;
    const job = await pool.query("DELETE FROM jobs WHERE id = $1", [id]);
    res.json({
        status: "success",
        message: `Deleted job with id ${id}`,
    });
});

