

const bcrypt = require("bcrypt");
const pool = require("../../config/db.config");

exports.getJobs = async (req, res) => {
  try {
    const jobs = await pool.query("SELECT * FROM jobs");
    res.json(jobs.rows);
  } catch (err) {
    console.error(err.message);
  }
};

exports.getJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await pool.query("SELECT * FROM jobs WHERE job_id = $1", [id]);
    res.json(job.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

/* check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("company", "Company is required").not().isEmpty(),
    check("location", "Location is required").not().isEmpty(),
    check("requirements", "Requirements is required").not().isEmpty(),*/

exports.createJob = async (req, res) => {
    try {
        const { title, description, company, location, requirements } = req.body;
        const newJob = await pool.query(
        "INSERT INTO jobs (title, description, company, location, requirements) VALUES($1, $2, $3, $4, $5) RETURNING *",
        [title, description, company, location, requirements]
        );
        res.json(newJob.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
};

exports.updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, company, location, requirements } = req.body;
        const updateJob = await pool.query(
        "UPDATE jobs SET title = $1, description = $2, company = $3, location = $4, requirements = $5 WHERE job_id = $6",
        [title, description, company, location, requirements, id]
        );
        res.json("Job was updated!");
    } catch (err) {
        console.error(err.message);
    }
};

exports.patchJob = async (req, res) => {
    try {
        const { id } = req.params;
        const { is_applied, updated_at } = req.body;
        const patchJob = await pool.query(
        "UPDATE jobs SET is_applied = $1, updated_at = $2 WHERE job_id = $3",
        [is_applied, updated_at, id]
        );
        res.json("Job was updated!");
    } catch (err) {
        console.error(err.message);
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteJob = await pool.query("DELETE FROM jobs WHERE job_id = $1", [
        id
        ]);
        res.json("Job was deleted!");
    } catch (err) {
        console.log(err.message);
    }
};

