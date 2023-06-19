// eslint-disable-next-lines
const express = require("express");
const app = express();
const cors = require("cors");
const {Pool} = require("pg");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {check, validationResult} = require("express-validator");
const {useParams} = require("react-router-dom");
const secret = "secret";
// eslint-disable-next-line
app.use(cors());
app.use(express.json());


const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "commerce",
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
let page = 1;
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
                    const {rows} = await pool.query(query, [(page - 1) * 10]);
                    res.status(200).json({
                        status: "success",
                        message: "All users",
                        data: rows,
                        page: page,
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

/*
* CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10, 2),
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
* */

app.post('/api/products', async (req, res) => {
    jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
        if (error) {
            res.status(401).json({error: "Unauthorized"});
        } else {
            const {name, price, description} = req.body;
            await pool.query(
                "INSERT INTO products (name, price, description) VALUES ($1, $2, $3)",
                [name, price, description]
            );
            res.status(200).json({
                status: "success",
                message: "Product added",
            });
        }
    });
});

const PAGE_SIZE = 6;
app.get('/api/products', async (req, res) => {
    const {page} = req.query;
    const search = req.query.search || "";
    const sort = req.query.sort || "created_at";
    const product = req.query.order || "desc";
    const {rows} = await pool.query(
        `SELECT * FROM products WHERE name ILIKE $1 ORDER BY ${sort} ${product}`,
        [`%${search}%`]

    );
    res.status(200).json({
        status: "success",
        message: "All products",
        data: rows,
        page: page,
        total: rows.length,

    });
});


app.get('/api/products/:id', async (req, res) => {
    jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
        if (error) {
            res.status(401).json({error: "Unauthorized"});
        } else {
            const {rows} = await pool.query(
                "SELECT * FROM products WHERE id = $1",
                [req.params.id]
            );
            if (rows.length === 0) {
                res.status(404).json({
                    status: "error",
                    message: "Product not found",
                });
            } else {
                res.status(200).json({
                    status: "success",
                    message: "Product found",
                    data: rows[0],
                });
            }
        }
    });
});


app.put('/api/products/:id', async (req, res) => {
    jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
        if (error) {
            res.status(401).json({error: "Unauthorized"});
        } else {
            const {rows} = await pool.query(
                "SELECT * FROM products WHERE id = $1",
                [req.params.id]
            );
            if (rows.length === 0) {
                res.status(404).json({
                    status: "error",
                    message: "Product not found",
                });
            } else {
                const {name, price, description} = req.body;
                await pool.query(
                    "UPDATE products SET name = $1, price = $2, description = $3 WHERE id = $4",
                    [name, price, description, req.params.id]
                );
                res.status(200).json({
                    status: "success",
                    message: "Product updated",
                });
            }
        }
    });
});


app.delete('/api/products/:id', async (req, res) => {
    jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
        if (error) {
            res.status(401).json({error: "Unauthorized"});
        } else {
            const {rows} = await pool.query(
                "SELECT * FROM products WHERE id = $1",
                [req.params.id]
            );
            if (rows.length === 0) {
                res.status(404).json({
                    status: "error",
                    message: "Product not found",
                });
            } else {
                await pool.query(
                    "DELETE FROM products WHERE id = $1",
                    [req.params.id]
                );
                res.status(200).json({
                    status: "success",
                    message: "Product deleted",
                });
            }
        }
    });
});

/*
* CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  total_amount DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT NOW()
);

* */

app.post('/api/orders', async (req, res) => {
    jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
        if (error) {
            res.status(401).json({error: "Unauthorized"});
        } else {
            const {rows} = await pool.query(
                "SELECT * FROM users WHERE id = $1",
                [decoded.id]
            );
            if (rows.length === 0) {
                res.status(404).json({
                    status: "error",
                    message: "User not found",
                });
            } else {
                const {total_amount} = req.body;
                await pool.query(
                    "INSERT INTO orders (user_id, total_amount) VALUES ($1, $2)",
                    [decoded.id, total_amount]
                );
                res.status(200).json({
                    status: "success",
                    message: "Order added",
                });
            }
        }
    });
});
/*CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    total_amount DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT NOW()
);   */
app.get('/api/orders/:userId', async (req, res) => {
    jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
        if (error) {
            res.status(401).json({error: "Unauthorized"});
        } else {
            const {rows} = await pool.query(
                "SELECT * FROM orders WHERE user_id = $1",
                [req.params.userId]
            );
            if (rows.length === 0) {
                res.status(404).json({
                    status: "error",
                    message: "Order not found",
                });
            } else {
                res.status(200).json({
                    status: "success",
                    message: "Order found",
                    data: rows[0],
                });
            }
        }
    });
});

app.get('/api/orders/:id', async (req, res) => {
    jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
        if (error) {
            res.status(401).json({error: "Unauthorized"});
        } else {
            const {rows} = await pool.query(
                "SELECT * FROM orders WHERE id = $1",
                [req.params.id]
            );
            if (rows.length === 0) {
                res.status(404).json({
                    status: "error",
                    message: "Order not found",
                });
            } else {
                res.status(200).json({
                    status: "success",
                    message: "Order found",
                    data: rows[0],
                });
            }
        }
    });
});

app.put('/api/orders/:id', async (req, res) => {
    jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
        if (error) {
            res.status(401).json({error: "Unauthorized"});
        } else {
            const {rows} = await pool.query(
                "SELECT * FROM orders WHERE id = $1",
                [req.params.id]
            );
            if (rows.length === 0) {
                res.status(404).json({
                    status: "error",
                    message: "Order not found",
                });
            } else {
                const {total_amount} = req.body;
                await pool.query(
                    "UPDATE orders SET total_amount = $1 WHERE id = $2",
                    [total_amount, req.params.id]
                );
                res.status(200).json({
                    status: "success",
                    message: "Order updated",
                });
            }
        }
    });
});

app.delete('/api/orders/:id', async (req, res) => {
    jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
        if (error) {
            res.status(401).json({error: "Unauthorized"});
        } else {
            const {rows} = await pool.query(
                "SELECT * FROM orders WHERE id = $1",
                [req.params.id]
            );
            if (rows.length === 0) {
                res.status(404).json({
                    status: "error",
                    message: "Order not found",
                });
            } else {
                await pool.query(
                    "DELETE FROM orders WHERE id = $1",
                    [req.params.id]
                );
                res.status(200).json({
                    status: "success",
                    message: "Order deleted",
                });
            }
        }
    });
});

/*
* CREATE TABLE order_items (
id SERIAL PRIMARY KEY,
order_id INT REFERENCES orders(id),
product_id INT REFERENCES products(id),
quantity INT,
price DECIMAL(10, 2)
);
* */
app.post('/api/orderItems/:prodId', async (req, res) => {
    jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
        if (error) {
            res.status(401).json({error: "Unauthorized"});
        } else {
            const {rows} = await pool.query(
                "SELECT * FROM orders WHERE id = $1",
                [req.params.prodId]
            );
            if (rows.length === 0) {
                res.status(404).json({
                    status: "error",
                    message: "Order not found",
                });
            } else {
                const {order_id, product_id, quantity, price} = req.body;
                await pool.query(
                    "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)",
                    [order_id, product_id, quantity, price]
                );
                res.status(200).json({
                    status: "success",
                    message: "Order item added",
                });
            }
        }
    });
});
/*
* CREATE TABLE order_items (
id SERIAL PRIMARY KEY,
order_id INT REFERENCES orders(id),
product_id INT REFERENCES products(id),
quantity INT,
price DECIMAL(10, 2)
);
* */

app.get('/api/orderItems', async (req, res) => {
    jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
        if (error) {
            res.status(401).json({error: "Unauthorized"});
        }
        else {
            //join order_items and products
            const {rows} = await pool.query(
                "SELECT * FROM order_items INNER JOIN products ON order_items.product_id = products.id join orders on order_items.order_id = orders.id"
            );
            if (rows.length === 0) {
                res.status(404).json({
                    status: "error",
                    message: "Order items not found",
                });

            } else {
                res.status(200).json({
                    status: "success",
                    message: `${rows.length} order items found`,
                    data: rows,
                });
            }
        }
    });
});


app.get('/api/order_items/:id', async (req, res) => {
    jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
        if (error) {
            res.status(401).json({error: "Unauthorized"});
        } else {
            const {rows} = await pool.query(
                "SELECT * FROM order_items WHERE id = $1",
                [req.params.id]
            );
            if (rows.length === 0) {
                res.status(404).json({
                    status: "error",
                    message: "Order item not found",
                });
            } else {
                res.status(200).json({
                    status: "success",
                    message: "Order item found",
                    data: rows[0],
                });
            }
        }
    });
});

app.put('/api/order_items/:id', async (req, res) => {
    jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
        if (error) {
            res.status(401).json({error: "Unauthorized"});
        } else {
            const {rows} = await pool.query(
                "SELECT * FROM order_items WHERE id = $1",
                [req.params.id]
            );
            if (rows.length === 0) {
                res.status(404).json({
                    status: "error",
                    message: "Order item not found",
                });
            } else {
                const {quantity, price} = req.body;
                await pool.query(
                    "UPDATE order_items SET quantity = $1, price = $2 WHERE id = $3",
                    [quantity, price, req.params.id]
                );
                res.status(200).json({
                    status: "success",
                    message: "Order item updated",
                });
            }
        }
    });
});

app.delete('/api/order_items/:id', async (req, res) => {
    jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
        if (error) {
            res.status(401).json({error: "Unauthorized"});
        } else {
            const {rows} = await pool.query(
                "SELECT * FROM order_items WHERE id = $1",
                [req.params.id]
            );
            if (rows.length === 0) {
                res.status(404).json({
                    status: "error",
                    message: "Order item not found",
                });
            } else {
                await pool.query(
                    "DELETE FROM order_items WHERE id = $1",
                    [req.params.id]
                );
                res.status(200).json({
                    status: "success",
                    message: "Order item deleted",
                });
            }
        }
    });
});
/*CREATE TABLE basket (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    product_id INT REFERENCES products(id),
    quantity INT,
    price DECIMAL(10, 2),
    total_amount DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT NOW()
);*/

app.post('/api/basket/:prodId', async (req, res) => {
    jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
        if (error) {
            res.status(401).json({error: "Unauthorized"});
        } else {
            const {rows} = await pool.query(
                "SELECT * FROM basket WHERE id = $1",
                [req.params.prodId]
            );
            if (rows.length === 0) {
                res.status(404).json({
                    status: "error",
                    message: "Basket not found",
                });
            } else {
                const {user_id, product_id, quantity, price, total_amount} = req.body;
                await pool.query(
                    "INSERT INTO basket (user_id, product_id, quantity, price, total_amount) VALUES ($1, $2, $3, $4, $5)",
                    [user_id, product_id, quantity, price, total_amount]
                );
                res.status(200).json({
                    status: "success",
                    message: "Basket added",
                });
            }
        }
    });
});

//get all the products in the basket
app.get('/api/basket', async (req, res) => {
    jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
        if (error) {
            res.status(401).json({error: "Unauthorized"});
        }
        else {
            //join order_items and products
            const {rows} = await pool.query(
                "select p.*,b.* from basket b join products p on b.product_id=p.id;"
            );
            if (rows.length === 0) {
                res.status(404).json({
                    status: "error",
                    message: "Basket not found",
                });

            } else {
                res.status(200).json({
                    status: "success",
                    message: `${rows.length} basket found`,
                    data: rows,
                });
            }
        }
    });
});
//delete a product from the basket
app.delete('/api/basket/:id', async (req, res) => {
    jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
        if (error) {
            res.status(401).json({error: "Unauthorized"});
        } else {
            const {rows} = await pool.query(
                "SELECT * FROM basket WHERE id = $1",
                [req.params.id]
            );
            if (rows.length === 0) {
                res.status(404).json({
                    status: "error",
                    message: "Basket not found",
                });
            } else {
                await pool.query(
                    "DELETE FROM basket WHERE id = $1",
                    [req.params.id]
                );
                res.status(200).json({
                    status: "success",
                    message: "Basket deleted",
                });
            }
        }
    });
});

//update a product in the basket
app.put('/api/basket/:id', async (req, res) => {
    jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
        if (error) {
            res.status(401).json({error: "Unauthorized"});
        } else {
            const {rows} = await pool.query(
                "SELECT * FROM basket WHERE id = $1",
                [req.params.id]
            );
            if (rows.length === 0) {
                res.status(404).json({
                    status: "error",
                    message: "Basket not found",
                });
            } else {
                const {quantity, price} = req.body;
                await pool.query(
                    "UPDATE basket SET quantity = $1, price = $2 WHERE id = $3",
                    [quantity, price, req.params.id]
                );
                res.status(200).json({
                    status: "success",
                    message: "Basket updated",
                });
            }
        }
    });
});




const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

