const {validationResult} = require("express-validator");
const jobService = require("./jobs.service");
const pool = require("../../config/db.config");

exports.getJobs = async (req, res) => {
    try {
        await jobService.getJobs(req, res);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

exports.getJob = async (req, res) => {
    try {
        const {user_id, id} = req.params;
        const job = await jobService.getJob(user_id, id);
        res.json(job);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

exports.createJob = async (req, res) => {
    try {
        const {title, company, location, description, requirements} = req.body;
        const {user_id} = req.params;
        const newJob = await jobService.createJob(title, company, location, description, requirements, user_id);
        res.json(newJob);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};


exports.updateJob = async (req, res) => {
    try {
        const {user_id, id} = req.params;
        const {title, company, location, description, requirements} = req.body;
        const updateJob = await jobService.updateJob(title, company, location, description, requirements, user_id, id);
        res.json(updateJob);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

exports.updateJobStatus = async (req, res) => {
    try {
        const {user_id, id} = req.params;
        const {status} = req.body;
        const updateJobStatus = await jobService.updateJobStatus(status, user_id, id);
        res.json(updateJobStatus);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const {user_id, id} = req.params;
        const deleteJob = await jobService.deleteJob(user_id, id);
        res.json(deleteJob);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};
