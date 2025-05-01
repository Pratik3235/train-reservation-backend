const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const userLogin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(403).json({ msg: "Wrong Password" });
      }
  
      const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY);
  
      // Send userId in response as well
      res.status(200).json({
        msg: "Login Successful",
        token,
        userId: user._id,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Something went wrong" });
    }
  };
  
const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields (name, email, password) are required" });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "User already exists" });
    }

    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        return res.status(500).json({ msg: "Error hashing password" });
      }

      await UserModel.create({ name, email, password: hash });
      res.status(201).json({ msg: "Signup Successful" });
    });
  } catch (err) {
    console.error("Register error:", err); // Add this for debugging
    res.status(500).json({ msg: "Server Error" });
  }
};


module.exports = { userLogin, userRegister };