const { validationResult } = require("express-validator");
const jobService = require("./jobs.service");

exports.getJobs = async (req, res) => {
  try {
    const jobs = await jobService.getJobs();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getJob = async (req, res) => {
  try {
    const job = await jobService.getJob(req.params.id);
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createJob = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  try {
    const job = await jobService.createJob(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await jobService.updateJob(req.params.id, req.body);
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.patchJob= async (req, res) => {
  try {
    const job = await jobService.patchJob(req.params.id, req.body);
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await jobService.deleteJob(req.params.id);
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
