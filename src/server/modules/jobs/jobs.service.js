const pool = require("../../config/db.config");

const getJobs = async (req, res) => {
    try {
        const searchTerm = req.query?.search || '';
        const user_id = req.params?.user_id;

        if (!searchTerm && user_id) {
            const jobs = await pool.query("SELECT * FROM jobs WHERE user_id = $1", [
                user_id,
            ]);
            res.json({
                status: "success",
                message: `Retrieved ${jobs.rows.length} jobs`,
                data: jobs.rows
            });
        } else if (searchTerm && user_id) {
            const jobs = await pool.query(
                `SELECT *
                 FROM jobs
                 WHERE title ILIKE $1
                    OR company ILIKE $1
                    OR location ILIKE $1
                    OR description ILIKE $1
                    OR requirements ILIKE $1
                   AND user_id = $2`,
                [`%${searchTerm}%`, user_id],
            );
            res.json({
                status: "success",
                message: `Retrieved ${jobs.rows.length} jobs`,
                data: jobs.rows
            });
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};
const getJob = async (user_id, id) => {
    try {
        const job = await pool.query(
            "SELECT * FROM jobs WHERE user_id = $1 AND id = $2",
            [user_id, id]
        );
        return job.rows[0];
    } catch (err) {
        throw err;
    }
};

const createJob = async (title, company, location, description, requirements, user_id) => {
    try {
        const newJob = await pool.query(
            "INSERT INTO jobs (title, company, location, description, requirements, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [title, company, location, description, requirements, user_id]
        );
        return newJob.rows[0];
    } catch (err) {
        throw err;
    }
};

const updateJob = async (title, company, location, description, requirements, user_id, id) => {
    try {
        const updateJob = await pool.query(
            "UPDATE jobs SET title = $1, company = $2, location = $3, description = $4, requirements = $5 WHERE user_id = $6 AND id = $7 RETURNING *",
            [title, company, location, description, requirements, user_id, id]
        );
        return updateJob.rows[0];
    } catch (err) {
        throw err;
    }
};

const deleteJob = async (user_id, id) => {
    try {
        await pool.query("DELETE FROM jobs WHERE user_id = $1 AND id = $2", [user_id, id]);
        return "Job was deleted!";
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
};
