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
const getJob = async (req, res) => {
    try {
        const user_id = req.params?.user_id;
        const id = req.params?.id;
        const job = await pool.query(
            "SELECT * FROM jobs WHERE user_id = $1 AND id = $2",
            [user_id, id]
        );
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
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const createJob = async (req, res) => {
    try {
        const user_id = req.params?.user_id;
        const {title, company, location, description, requirements} = req.body;
        const job = await pool.query(
            "INSERT INTO jobs (title, company, location, description, requirements, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [title, company, location, description, requirements, user_id]
        );
        res.status(201).json({
            status: "success",
            message: `Inserted job with id ${job.rows[0].id}`,
            data: job.rows[0]
        });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const updateJob = async (res, req) => {
    try {
        const user_id = req.params?.user_id;
        const id = req.params?.id;
        const {title, company, location, description, requirements} = req.body;
        const job = await pool.query(
            "UPDATE jobs SET title = $1, company = $2, location = $3, description = $4, requirements = $5 WHERE user_id = $6 AND id = $7 RETURNING *",
            [title, company, location, description, requirements, user_id, id]
        );
        if (job.rows.length === 0) {
            res.status(404).json({
                status: "error",
                message: "Job not found",
            });
        } else {
            res.json({
                status: "success",
                message: `Updated job with id ${id}`,
                data: job.rows[0]
            });
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

//patch only is_applied
const updateJobStatus = async (res, req) => {
    try {
        const user_id = req.params?.user_id;
        const id = req.params?.id;
        const {is_applied, updated_at} = req.body;
        const job = await pool.query("UPDATE jobs SET is_applied = $1, updated_at = $2 WHERE user_id = $3 AND id = $4 RETURNING *", [is_applied, updated_at, user_id, id]);
        if (job.rows.length === 0) {
            res.status(404).json({
                status: "error",
                message: "Job not found",
            });
        } else {
            res.json({
                status: "success",
                message: `Updated job with id ${id}`,
                data: job.rows[0]
            });
        }
    } catch (err) {
        res.status(500).json({message: err.message});
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
    updateJobStatus
};
