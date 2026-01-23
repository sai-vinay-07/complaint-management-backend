const bcrypt = require("bcrypt");
const Otp = require("../models/otpModel");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send("All fields are required");
    }

    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord || !otpRecord.isVerified) {
      return res.status(400).send("Email not verified");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 12);

    await User.create({
      username,
      email,
      password: hashPassword,
      role: "user"
    });

    
    await Otp.deleteOne({ email });

    return res.status(201).send("Registered successfully");

  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

const login = async (req,res)=>{
  try {

    const {email,password} = req.body

    if(!email  || !password){
      return res.status(400).send('All Fields Required')
    }

    const user = await User.findOne({email})


    if(!user){
      return res.status(400).send('User Not Found, Plz Register')
    }

   const isMatch = await bcrypt.compare(password, user.password)

   if(!isMatch){
    return res.status(400).send('Invalid Password')
   }

   const token = jwt.sign({
    id : user._id,
    role : user.role
   },process.env.JWT_TOKEN,{expiresIn:process.env.JWT_TOKEN_EXPIRY})

  res.cookie("token", token, {
    httpOnly: true,
  sameSite: "lax",
  secure: false,
    maxAge: 60 * 60 * 1000 
  });

  return res.status(200).send({
    message : "Login Successfully",
    token
  })
  }
    catch (error) {
    console.error(error)
    return res.status(500).send("Internal Server Error")
  }
}

module.exports = { register, login };
