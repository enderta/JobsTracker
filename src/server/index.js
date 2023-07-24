const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

app.use(cors(
    {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204
    }
));

app.use(bodyParser.json());

const userRoutes = require("./modules/users/users.route");
app.use('/api/users', userRoutes);

const jobRoutes = require("./modules/jobs/jobs.route");
app.use('/api/jobs', jobRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});