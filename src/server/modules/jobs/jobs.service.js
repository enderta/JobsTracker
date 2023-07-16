
const pool = require("../../config/db.config");

exports.getJobs = async (searchTerm) => {
    if(!searchTerm){
        const jobs = await pool.query("SELECT * FROM jobs");
        return {
            status: "success",
            message: `Retrieved ${jobs.rows.length} jobs`,
            data: jobs.rows
        };
    } else {
        const jobs = await pool.query(
            `SELECT * FROM jobs WHERE title ILIKE $1 
            OR company ILIKE $1 
            OR location ILIKE $1 
            OR description ILIKE $1 
            OR requirements ILIKE $1`,
            [`%${searchTerm}%`],
        );
        return {
            status: "success",
            message: `Retrieved ${jobs.rows.length} jobs`,
            data: jobs.rows
        };
    }
};

exports.getJob = async(id)=>{
    try{
        const job = await pool.query("SELECT * FROM jobs WHERE id = $1", [id]);
        return {
            status: "success",
            message: `Retrieved job with id ${id}`,
            data: job.rows[0]
        };
    } catch(err){
        return {
            status: "error",
            message: `Could not find job with id ${id}`,
            data: null
        };
    }
};

exports.createJob = async (jobData) => {
    try{
        const {title, company, location, description, requirements} = jobData;
        const job = await pool.query("INSERT INTO jobs (title, company, location, description, requirements) VALUES ($1, $2, $3, $4, $5) RETURNING *", [title, company, location, description, requirements]);
        return {
            status: "success",
            message: `Created job with id ${job.rows[0].id}`,
            data: job.rows[0]
        };
    } catch(err){
        return {
            status: "error",
            message: `Could not create job`,
            data: null
        };
    }
};

exports.updateJob = async(id,jobData)=> {
    try {
        const {title, company, location, description, is_applied, requirements} = jobData;
        const job = await pool.query("UPDATE jobs SET title = $1, company = $2, location = $3, description = $4, is_applied = $5, requirements = $6 WHERE id = $7 RETURNING *", [title, company, location, description, is_applied, requirements, id]);
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

exports.patchJob = async (id,jobData) => {
   try{
       const { is_applied, updated_at } = jobData;
         const job = await pool.query("UPDATE jobs SET is_applied = $1, updated_at = $2 WHERE id = $3 RETURNING *", [is_applied, updated_at, id]);
            return {
                status: "success",
                message: `Updated job with id ${id}`,
                data: job.rows[0]
            };
    } catch(err){
        return {
            status: "error",
            message: `Could not update job with id ${id}`,
            data: null
        };
   }
};

exports.deleteJob = async (id) => {
    try{
        const job = await pool.query("DELETE FROM jobs WHERE id = $1 RETURNING *", [id]);
        return {
            status: "success",
            message: `Deleted job with id ${id}`,
            data: job.rows[0]
        };
    } catch(err){
        return {
            status: "error",
            message: `Could not delete job with id ${id}`,
            data: null
        };
    }
};

