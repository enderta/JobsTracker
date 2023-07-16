

const bcrypt = require("bcrypt");
const pool = require("../../config/db.config");

exports.registerUser = async (userData) => {
    const { username, password, email } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await pool.query(
        "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
        [username, hashedPassword, email]
    );

    return {
        status: "success",
        message: `User ${username} registered successfully`,
        data: user.rows[0],
    };
};

exports.LoginUser=async (userData)=>{
    const {username,password}=userData;
    const user=await pool.query("SELECT * FROM users WHERE username=$1",[username]);
    if(user.rows.length===0){
        return {
            status:"error",
            message:"User not found"
        }
    }
    const isPasswordCorrect=await bcrypt.compare(password,user.rows[0].password);
    if(!isPasswordCorrect){
        return {
            status:"error",
            message:"Incorrect password"
        }
    }
    return {
        status:"success",
        message:"User logged in successfully",
        data:user.rows[0]
    }
}

exports.getAllUsers = async () => {
    const users = await pool.query("SELECT * FROM users");
    return {
        status: "success",
        message: "Users retrieved successfully",
        data: users.rows,
    };
};

exports.getUserById = async (userId) => {
    const user = await pool.query("SELECT * FROM users WHERE id=$1", [userId]);
    if (user.rows.length === 0) {
        return {
            status: "error",
            message: "User not found",
        };
    }
    return {
        status: "success",
        message: "User found",
        data: user.rows[0],
    };
};

exports.updateUser = async (userId, userData) => {
    const { username, password, email } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await pool.query(
        "UPDATE users SET username=$1, password=$2, email=$3 WHERE id=$4 RETURNING *",
        [username, hashedPassword, email, userId]
    );

    return {
        status: "success",
        message: `User ${username} updated successfully`,
        data: user.rows[0],
    };
};

exports.deleteUser = async (userId) => {
    const user = await pool.query("DELETE FROM users WHERE id=$1 RETURNING *", [
        userId,
    ]);
    if (user.rows.length === 0) {
        return {
            status: "error",
            message: "User not found",
        };
    }
    return {
        status: "success",
        message: "User deleted successfully",
        data: user.rows[0],
    };
};



