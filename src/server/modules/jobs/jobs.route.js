
const express = require("express");
const router = express.Router();
const jobController = require("./jobs.controller");
const { check } = require("express-validator");
const verifyToken = require("../../middlewares/verifyToken");

router.get("/:user_id", verifyToken, jobController.getJobs);
router.get("/:user_id/:id", verifyToken, jobController.getJob);

router.post(
    "/",
    [
        check("title", "Title is required").not().isEmpty(),
        check("description", "Description is required").not().isEmpty(),
        check("company", "Company is required").not().isEmpty(),
        check("location", "Location is required").not().isEmpty(),
        check("requirements", "Requirements is required").not().isEmpty(),
    ],
    verifyToken,
    jobController.createJob
);

router.put(
    "/:user_id/:id",
    [
        check("title", "Title is required").not().isEmpty(),
        check("description", "Description is required").not().isEmpty(),
        check("company", "Company is required").not().isEmpty(),
        check("location", "Location is required").not().isEmpty(),
        check("requirements", "Requirements is required").not().isEmpty(),
    ],
    verifyToken,
    jobController.updateJob
);

router.delete("/:user_id/:id", verifyToken, jobController.deleteJob);

module.exports = router;