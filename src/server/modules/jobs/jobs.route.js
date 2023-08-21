
const express = require("express");
const router = express.Router();
const jobController = require("./jobs.controller");
const { check } = require("express-validator");
const verifyToken = require("../../middlewares/verifyToken");
const {createJob} = require("./jobs.service");
const cors = require("cors");

//give cors permission all the routes all origins
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};
router.use(cors(corsOptions));

router.get("/:user_id", verifyToken, jobController.getJobs);
router.get("/:user_id/:id", verifyToken, jobController.getJob);


router.post('/createJob/:user_id', async (req, res, next) => {
    try {
        const job = await createJob(req.body, req.params.user_id);
        res.status(200).json(job);
    } catch (err) {
        next(err); // handle error
    }
});

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