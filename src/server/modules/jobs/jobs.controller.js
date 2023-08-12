const jobService = require("./jobs.service")


// higher order function for error handling
const asyncHandler = fn => (req, res, next) =>
    Promise
        .resolve(fn(req, res, next))
        .catch(next);

const getJobs = asyncHandler(async (req, res) => {
    const {search: searchTerm, limit} = req.query;
    const {user_id} = req.params;
    const jobs = await jobService.getJobs(user_id, searchTerm, limit);
    res.json({
        status: "success",
        message: `Retrieved ${jobs.length} jobs`,
        data: jobs,
        pagination: {limit}
    });
});

const getJob = asyncHandler(async (req, res) => {
    const user_id = req.params?.user_id;
    const id = req.params?.id;
    const job = await jobService.getJob(user_id, id);
    res.json({
        status: "success",
        message: `Retrieved job with id ${id}`,
        data: job
    });
});

const createJob = asyncHandler(async (req, res) => {
    const {title, company, location, description, requirements} = req.body;
    const user_id = req.params?.user_id;
    const newJob = await jobService.createJob({title, company, location, description, requirements}, user_id);
    res.json({
        status: "success",
        message: `Inserted job with id ${newJob.id}`,
        data: newJob
    });
});

const updateJob = asyncHandler(async (req, res) => {
    const user_id = req.params?.user_id;
    const id = req.params?.id;
    const {title, company, location, description, requirements, is_applied, updated_at} = req.body;
    const updatedJob = await jobService.updateJob({
        title,
        company,
        location,
        description,
        requirements,
        is_applied,
        updated_at
    }, user_id, id);
    res.json({
        status: "success",
        message: `Updated job with id ${updatedJob.id}`,
        data: updatedJob
    });
});

const deleteJob = asyncHandler(async (req, res) => {
    const user_id = req.params?.user_id;
    const id = req.params?.id;
    await jobService.deleteJob(user_id, id);
    res.json({
        status: "success",
        message: `Job with id ${id} deleted successfully`
    });
});

module.exports = {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
};