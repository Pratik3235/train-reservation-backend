const userModel = require("../models/user.model");
const saltRounds = 10;
require("dotenv").config();
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const JWT_SECRETKEY = process.env.JWT_SECRETKEY || 'shhhh';

const userSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "Signup Successful", user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};


const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await userModel.findOne({ email });
    
        bcrypt.compare(password, user.password, async function (err, result) {
            if (err) {
                res.status(500).json({ msg: "Something went wrong" });
            } else {
                if (result) {
                    var accessToken = jwt.sign({ id: user._id }, JWT_SECRETKEY);
                    res.status(200).json({ msg: "Login Sucess", accessToken })
                } else {
                    res.status(403).json({ msg: "Wrong Password" })
                }
            }
        });
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" });
    }
};


module.exports = { userSignup, userLogin };
