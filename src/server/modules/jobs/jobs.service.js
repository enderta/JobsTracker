const pool = require("../../config/db.config");

const getJobs = async (userId, searchTerm = '', limit = 10, offset = 0) => {
    try {
        if (!searchTerm && userId) {
            const jobs = await pool.query("SELECT * FROM jobs WHERE user_id = $1 limit $2", [userId, limit]);
            return jobs.rows;
        } else if (searchTerm && userId) {
            const jobs = await pool.query(
                "SELECT * FROM jobs WHERE user_id = $1 AND (title ILIKE $2 OR company ILIKE $2 OR location ILIKE $2 OR description ILIKE $2 OR requirements ILIKE $2) LIMIT $3 OFFSET $4",
                [userId, `%${searchTerm}%`, limit, offset]
            );
            return jobs.rows;
        } else {
            throw new Error("Both userId and searchTerm are missing!");
        }
    } catch (error) {
        console.log(error);
        // Implement more robust error handling here
    }
};

const getJob = async (userId, id) => {
    const job = await pool.query(
        "SELECT * FROM jobs WHERE user_id = $1 AND id = $2",
        [userId, id]
    );

    if (job.rows.length === 0) {
        throw new Error("Job not found");
    } else {
        return job.rows[0];
    }
};

const createJob = async (jobData, userId) => {
    const newJob = await pool.query("INSERT INTO jobs (title, company, location, description, requirements, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [jobData.title, jobData.company, jobData.location, jobData.description, jobData.requirements, userId]);
    return newJob.rows[0];
};

const updateJob = async (jobData, userId, id) => {
    const updatedJob = await pool.query(
        "UPDATE jobs SET title = $1, company = $2, location = $3, description = $4, requirements = $5, is_applied = $6, updated_at = $7 WHERE user_id = $8 AND id = $9 RETURNING *",
        [jobData.title, jobData.company, jobData.location, jobData.description, jobData.requirements, jobData.is_applied, jobData.updated_at, userId, id]
    );

    if (!updatedJob.rowCount) {
        throw new Error("Job not found");
    } else {
        return updatedJob.rows[0];
    }
};

const deleteJob = async (userId, id) => {
    await pool.query("DELETE FROM jobs WHERE user_id = $1 AND id = $2", [userId, id]);
};

module.exports = {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
};