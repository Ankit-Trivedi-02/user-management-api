const User = require("../model/user");

async function handelAllUser(req, res) {
    try {
        const allUsers = await User.find({});  // ✅ Correct
        res.json(allUsers);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
}

async function handelInputUser(req, res) {
    try {
        const { firstName, email } = req.body;

        // 🔥 Step 1: Validate user input
        if (!firstName || !email) {
            return res.status(400).json({ error: "firstName and email are required!" });
        }

        // 🔥 Step 2: Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use!" });
        }
        const newUser = await User.create({ firstName, email });
        res.status(201).json(newUser);  // ✅ Send back created user
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
}

async function handelUpdateUser(req, res) {
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })
        if (!updatedUser) {
            return res.status(404).json({ err: "User not found!" });
        }
        res.send(updatedUser);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update user" });
    }
}

async function handelDeleteUser(req, res) {
    const { id } = req.params;

    try {

        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser){
            return res.status(404).json({ err: "User not found!" });
        }
        res.status(200).json({ status: "Success", message: "User deleted successfully", user: deletedUser });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to delete user" });
    }
}



module.exports = { handelAllUser, handelInputUser,handelUpdateUser,handelDeleteUser};