const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const userRoutes = require("./modules/users/users.route");
app.use('/api/users', userRoutes);

const jobRoutes = require("./modules/jobs/jobs.route");
app.use('/api/jobs', jobRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});