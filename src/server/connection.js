const express = require("express");
const app = express();
const cors = require("cors");
const {Pool} = require("pg");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {check, validationResult} = require("express-validator");
const {decode} = require("jsonwebtoken");
const secret = "secret";


cors({
    origin: 'http://localhost:3000',
    credentials: true
});

app.use(cors());

app.use(express.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "jobs",
    password: "ender",
    port: 5432,
});

app.use(bodyParser.json());

