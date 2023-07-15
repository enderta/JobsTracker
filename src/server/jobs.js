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


app.post('/api/users/register'
    , [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters long').isLength({min: 6})
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                status: "error",
                message: errors.array()
            });
        }
        const {name, email, password} = req.body;

        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length > 0) {
            return res.json({
                status: "error",
                message: "User already exists"
            });
        }
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            // eslint-disable-next-line no-undef
            const newUser = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hashedPassword]);
            const token = jwt.sign({id: newUser.rows[0].id}, secret);
            res.json({
                status: "success",
                message: `User ${newUser.rows[0].name} registered successfully`,
                data: newUser.rows[0],
                token
            });
        } catch (e) {
            console.log(e);
            res.json({
                status: "error",
                message: "An error occurred"
            });
        }
    });

app.post('/api/users/login',
    [check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                status: "error",
                message: errors.array()
            });
        }
        const {email, password} = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.json({
                status: "error",
                message: "User does not exist"
            });
        }
        try {
            const isMatch = await bcrypt.compare(password, user.rows[0].password);
            if (!isMatch) {
                return res.json({
                    status: "error",
                    message: "Invalid credentials"
                });
            }
            const token = jwt.sign({id: user.rows[0].id}, secret);
            res.json({
                status: "success",
                message: `User ${user.rows[0].name} logged in successfully`,
                userId: user.rows[0].id,
                token
            });
        } catch (e) {
            console.log(e);
            res.json({
                status: "error",
                message: "An error occurred"
            });
        }
    });


app.get('/api/users', async (req, res) => {
    //search for users
    jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
            if (error) {
                res.status(401).json({error: "Unauthorized"});
            } else {

                console.log(decoded.user)
                const searchTerm = req.query.search;
                let query = "SELECT * FROM users";

                if (searchTerm) {
                    const escapedSearchTerm = `%${searchTerm}%`;
                    query += " WHERE name ILIKE $1 OR email ILIKE $1";
                    const {rows} = await pool.query(query, [escapedSearchTerm]);
                    if (rows.length === 0) {
                        res.status(404).json({
                            status: "fail",
                            message: "No users found"
                        })
                    } else {
                        res.status(200).json({
                            status: "success",
                            message: `Users matching search term: ${searchTerm}`,
                            data: rows,
                        });
                    }
                } else {
                    query += " LIMIT 10 OFFSET $1";
                    const {rows} = await pool.query(query);
                    res.status(200).json({
                        status: "success",
                        message: "All users",
                        data: rows,
                        total: rows.length,
                    });
                }
            }
        }
    )
});

app.get('/api/users/:id', async (req, res) => {
    jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
        if (error) {
            res.status(401).json({error: "Unauthorized"});
        } else {
            const {rows} = await pool.query(
                "SELECT * FROM users WHERE id = $1",
                [req.params.id]
            );
            if (rows.length === 0) {
                res.status(404).json({
                    status: "error",
                    message: "User not found",
                });
            } else {
                res.status(200).json({
                    status: "success",
                    message: "User found",
                    data: rows[0],
                });
            }
        }
    });
});

app.put('/api/users/:id', async (req, res) => {
    jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
            if (error) {
                res.status(401).json({error: "Unauthorized"});
            } else {
                const {email, password, name, address, phone, is_admin} = req.body;
                const {rows} = await pool.query(
                    "SELECT * FROM users WHERE id = $1",
                    [req.params.id]
                );
                if (rows.length === 0) {
                    res.status(404).json({
                        status: "error",
                        message: "User not found",
                    });
                }
                if (email) {
                    const {rows} = await pool.query(
                        "SELECT * FROM users WHERE email = $1",
                        [email]
                    );
                    if (rows.length > 0) {
                        res.status(400).json({
                            status: "error",
                            message: "Email already exists",
                        });
                        return;
                    }
                }
                if (password) {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt);
                    await pool.query(
                        "UPDATE users SET password = $1 WHERE id = $2",
                        [hashedPassword, req.params.id]
                    );
                }
                if (name) {
                    await pool.query(
                        "UPDATE users SET name = $1 WHERE id = $2",
                        [name, req.params.id]
                    );
                }
                res.status(200).json({
                    status: "success",
                    message: "User updated",
                });

            }
        }
    );
});

app.delete('/api/users/:id', async (req, res) => {
    jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
        if (error) {
            res.status(401).json({error: "Unauthorized"});
        } else {
            const {rows} = await pool.query(
                "SELECT * FROM users WHERE id = $1",
                [req.params.id]
            );
            if (rows.length === 0) {
                res.status(404).json({
                    status: "error",
                    message: "User not found",
                });
            } else {
                await pool.query(
                    "DELETE FROM users WHERE id = $1",
                    [req.params.id]
                );
                res.status(200).json({
                    status: "success",
                    message: "User deleted",
                });
            }
        }
    });
});


app.get('/api/jobs', async (req, res) => {
    jwt.verify(req.headers.authorization,secret,async (error)=>{
        if(error){
            res.status(401).json({error:"Unauthorized"})
        }
        else{
            const searchTerm = req.query.search;
            if(!searchTerm){
                const jobs = await pool.query("SELECT * FROM jobs");
                res.json({
                    status: "success",
                    message: `Retrieved ${jobs.rows.length} jobs`,
                    data: jobs.rows
                });
            }
            else{

                const jobs=await pool.query(`select * from jobs where title ilike '%${searchTerm}%' or company ilike '%${searchTerm}%' or location ilike '%${searchTerm}%' or description ilike '%${searchTerm}%' or requirements ilike '%${searchTerm}%'`)
                res.json({
                    status: "success",
                    message: `Retrieved ${jobs.rows.length} jobs`,
                    data: jobs.rows
                });
            }
        }
    })
});

app.get('/api/jobs/:id', async (req, res) => {
    const id = req.params.id;
    jwt.verify(req.headers.authorization,
        secret, async (error, decoded) => {
        if (error) {
            res.status(401).json({error: "Unauthorized"});
        }
        else{
            const job = await pool.query("SELECT * FROM jobs WHERE id = $1", [id]);
            if (job.rows.length === 0) {
                res.status(404).json({
                    status: "error",
                    message: "Job not found",
                });
            } else {
                res.status(200).json({
                    status: "success",
                    message: "Job found",
                    data: job.rows[0],
                });
            }
        }

    });
});

app.post('/api/jobs', async (req, res) => {
   jwt.verify(req.headers.authorization,secret,async (error)=>{
       if(error){
              res.status(401).json({error:"Unauthorized"})
       }
       else{
           const { title, company, location, description, requirements } = req.body;
           const job = await pool.query("INSERT INTO jobs (title, company, location, description, requirements) VALUES ($1, $2, $3, $4, $5) RETURNING *", [title, company, location, description, requirements]);
           res.json({
               status: "success",
               message: `Inserted job with id ${job.rows[0].id}`,
               data: job.rows[0]
           });
       }
   })
});

app.put('/api/jobs/:id', async (req, res) => {
 jwt.verify(req.headers.authorization,secret,async (error)=>{
     if(error){
            res.status(401).json({error:"Unauthorized"})
     }
     else {
         const id = req.params.id;
         const { title, company, location, description,is_applied, requirements } = req.body;
         const job = await pool.query("UPDATE jobs SET title = $1, company = $2, location = $3, description = $4, is_applied = $5, requirements = $6 WHERE id = $7 RETURNING *", [title, company, location, description, is_applied, requirements, id]);
         res.json({
             status: "success",
             message: `Updated job with id ${id}`,
             data: job.rows[0]
         });
     }
 })

});
//patch only is_applied
app.patch('/api/jobs/:id', async (req, res) => {
   jwt.verify(req.headers.authorization,secret,async (error)=>{
       if(error){
              res.status(401).json({error:"Unauthorized"})
       }
       else{
           const id = req.params.id;
           const { is_applied, updated_at } = req.body;
           const job = await pool.query("UPDATE jobs SET is_applied = $1, updated_at = $2 WHERE id = $3 RETURNING *", [is_applied, updated_at, id]);
           res.json({
               status: "success",
               message: `Updated job with id ${id}`,
               data: job.rows[0]
           });

       }
   })

});


app.delete('/api/jobs/:id', async (req, res) => {
    jwt.verify(req.headers.authorization,secret,async (error)=>{
        if(error){
               res.status(401).json({error:"Unauthorized"})
        }
        else{
            const id = req.params.id;
            const job = await pool.query("DELETE FROM jobs WHERE id = $1", [id]);
            res.json({
                status: "success",
                message: `Deleted job with id ${id}`,
            });
        }
    })
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
