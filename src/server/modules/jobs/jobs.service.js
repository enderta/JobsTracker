const pool = require("../../config/db.config");

exports.getJobs = async (searchTerm, user_id) => {

    if (!searchTerm) {
        //finds all the jobs in the database with user_id
        if (!searchTerm) {
            const {rows} = await pool.query("SELECT * FROM jobs where user_id = $1", [user_id]);
            return {
                status: "success",
                message: `Retrieved ${rows.length} jobs`,
                data: rows
            };

        }
    } else {

        const {rows} = await pool.query
        ("SELECT * FROM jobs where user_id = $1 AND title ILIKE $2 OR company ILIKE $2 OR location ILIKE $2 OR description ILIKE $2 OR requirements ILIKE $2",
            [user_id, `%${searchTerm}%`]);
        return {
            status: "success",
            message: `Retrieved ${rows.length} jobs`,
            data: rows
        };
    }


};

exports.getJob = async (id, user_id) => {
    try {
        const job = await pool.query("SELECT * FROM jobs WHERE id = $1 AND user_id = $2", [id, user_id]);
        return {
            status: "success",
            message: `Retrieved job with id ${id}`,
            data: job.rows[0]
        };
    } catch (err) {
        return {
            status: "error",
            message: `Could not retrieve job with id ${id}`,
            data: null
        };
    }
};

exports.createJob = async (jobData, user_id) => {
    try {
        const {title, company, location, description, requirements} = jobData;
        const job = await pool.query("INSERT INTO jobs (title, company, location, description, requirements, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [title, company, location, description, requirements, user_id]);
        return {
            status: "success",
            message: `Created new job with id ${job.rows[0].id}`,
            data: job.rows[0]
        };
    } catch (err) {
        return {
            status: "error",
            message: `Could not create new job`,
            data: null
        };
    }
};

exports.updateJob = async (id, jobData, user_id) => {
    try {
        const {title, company, location, description, requirements} = jobData;
        const job = await pool.query("UPDATE jobs SET title = $1, company = $2, location = $3, description = $4, requirements = $5 WHERE id = $6 AND user_id = $7 RETURNING *", [title, company, location, description, requirements, id, user_id]);
        return {
            status: "success",
            message: `Updated job with id ${id}`,
            data: job.rows[0]
        };
    } catch (err) {
        return {
            status: "error",
            message: `Could not update job with id ${id}`,
            data: null
        };
    }

};

exports.patchJob = async (id, jobData, user_id) => {
    try {
        const {title, company, location, description, requirements} = jobData;
        const job = await pool.query("UPDATE jobs SET title = COALESCE($1, title), company = COALESCE($2, company), location = COALESCE($3, location), description = COALESCE($4, description), requirements = COALESCE($5, requirements) WHERE id = $6 AND user_id = $7 RETURNING *", [title, company, location, description, requirements, id, user_id]);
        return {
            status: "success",
            message: `Patched job with id ${id}`,
            data: job.rows[0]
        };
    } catch (err) {
        return {
            status: "error",
            message: `Could not patch job with id ${id}`,
            data: null
        };
    }
};

exports.deleteJob = async (id, user_id) => {
    try {
        const job = await pool.query("DELETE FROM jobs WHERE id = $1 AND user_id = $2 RETURNING *", [id, user_id]);
        return {
            status: "success",
            message: `Deleted job with id ${id}`,
            data: job.rows[0]
        };
    } catch (err) {
        return {
            status: "error",
            message: `Could not delete job with id ${id}`,
            data: null
        };
    }
};

