const userService = require('./users.service');

exports.registerUser = [
    async (req, res) => {
        try {
            const data = await userService.registerUser(req.body);
            res.json(data);
        } catch (err) {
            res.status(500).json({error: "Error registering user"});
        }
    }
];

exports.loginUser = [
    async (req, res) => {

        try {
            const data = await userService.loginUser(req.body);
            res.json(data);
        } catch (err) {
            res.status(500).json({error: "Error logging in user"});
        }
    }
];

exports.getUsers = async (req, res) => {
    try {
        const data = await userService.getUsers();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Error getting users"});
    }
};

exports.getUserById = [
    async (req, res) => {
        try {
            const data = await userService.getUserById(req.params.id);
            res.json(data);
        } catch (err) {
            res.status(500).json({error: "Error getting user"});
        }
    }
];

exports.updateUser = [
    async (req, res) => {
        try {
            const data = await userService.updateUser(req.params.id, req.body);
            res.json(data);
        } catch (err) {
            res.status(500).json({error: "Error updating user"});
        }
    }
];

exports.deleteUser = [
    async (req, res) => {
        try {
            const data = await userService.deleteUser(req.params.id);
            res.json(data);
        } catch (err) {
            res.status(500).json({error: "Error deleting user"});
        }
    }
];


