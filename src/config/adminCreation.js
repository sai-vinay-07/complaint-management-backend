const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { connectDB } = require('./db');

const adminCreation = async () => {
    try {
        await connectDB();

        const existingAdmin = await User.findOne({ email: "saivinayguttula07@gmail.com" });
        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash("admin123", 12);

        const admin = new User({
            username: "admin",
            email: "saivinayguttula07@gmail.com",
            password: hashedPassword,
            role: "admin"
        });
        await admin.save();
        console.log("Admin Created Successfully");
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

adminCreation()