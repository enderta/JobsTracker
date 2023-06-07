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
    database: "jobs",
    password: "ender",
    port: 5432,
});

app.use(bodyParser.json());

app.get('/api/jobs', async (req, res) => {
    const searchTerm = req.query.search;
    if(!searchTerm){
        const jobs = await pool.query("SELECT * FROM jobs");
        res.json({
            status: "success",
            message: `Retrieved ${jobs.rows.length} jobs`,
            data: jobs.rows
        });
    }
    else{

        const jobs=await pool.query(`select * from jobs where title ilike '%${searchTerm}%' or company ilike '%${searchTerm}%' or location ilike '%${searchTerm}%' or description ilike '%${searchTerm}%' or requirements ilike '%${searchTerm}%'`)
        res.json({
            status: "success",
            message: `Retrieved ${jobs.rows.length} jobs`,
            data: jobs.rows
        });
    }
});

app.get('/api/jobs/:id', async (req, res) => {
    const id = req.params.id;
    const job = await pool.query("SELECT * FROM jobs WHERE id = $1", [id]);
    res.json({
        status: "success",
        message: `Retrieved job with id ${id}`,
        data: job.rows[0]
    });
});

app.post('/api/jobs', async (req, res) => {
    const { title, company, location, description, requirements } = req.body;
    const job = await pool.query("INSERT INTO jobs (title, company, location, description, requirements) VALUES ($1, $2, $3, $4, $5) RETURNING *", [title, company, location, description, requirements]);
    res.json({
        status: "success",
        message: `Inserted job with id ${job.rows[0].id}`,
        data: job.rows[0]
    });
});

app.put('/api/jobs/:id', async (req, res) => {
    const id = req.params.id;
    const { title, company, location, description, requirements } = req.body;
    const job = await pool.query("UPDATE jobs SET title = $1, company = $2, location = $3, description = $4, requirements = $5 WHERE id = $6 RETURNING *", [title, company, location, description, requirements, id]);
    res.json({
        status: "success",
        message: `Updated job with id ${id}`,
        data: job.rows[0]
    });
});

app.delete('/api/jobs/:id', async (req, res) => {
    const id = req.params.id;
    const job = await pool.query("DELETE FROM jobs WHERE id = $1", [id]);
    res.json({
        status: "success",
        message: `Deleted job with id ${id}`
    });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

