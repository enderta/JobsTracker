const express = require('express');
const app = express();

const userRoutes = require('./modules/users/users.route');
app.use('/api/users', userRoutes);

const jobRoutes = require("./modules/jobs/jobs.route");
app.use("/api/jobs", jobRoutes);

app.listen(3000, () => {
    console.log('Server is running...');
});

module.exports = app;