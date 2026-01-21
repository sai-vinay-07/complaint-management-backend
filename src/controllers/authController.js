const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const Otp = require("../models/otpModel");
const { isValidEmail } = require("../utils/email.regex");
require("dotenv").config();



const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD 
    }
});


const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

         if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid email" });
          }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashOtp = await bcrypt.hash(otp,10)
        const expairsAt = Date.now() + 5 * 60 * 1000;

        await Otp.findOneAndUpdate(
            { email },
            { otp : hashOtp, expairsAt, isVerified: false },
            { upsert: true, new: true }
        );

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Email Verification OTP",
            html: `<h2>Your OTP is: ${otp}</h2><p>Valid for 5 minutes</p>`
        });

        res.status(200).json({
            message: "OTP sent successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send OTP" });
    }
};



const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const record = await Otp.findOne({ email });

        if (!record)
            return res.status(400).json({ message: "OTP not found" });

        if (record.expairsAt < Date.now())
            return res.status(400).json({ message: "OTP expired" });

        const decodeOtp = await bcrypt.compare(otp, record.otp)

        if (!decodeOtp){
            return res.status(400).json({ message: "Invalid OTP" });
        }

        record.isVerified = true;
        record.otp = null;
        record.expairsAt = null;

        await record.save();

        res.status(200).json({
            message: "Email verified successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Verification failed" });
    }
};

module.exports = {
    sendOtp,
    verifyOtp,
};
