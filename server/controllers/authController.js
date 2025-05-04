const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req  , res) => {
    try {
        const {email , password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message: "User not found"});

        const matchPassword = await bcrypt.compare(password , user.password);

        if(!matchPassword) return res.status(401).json({message: "Wrong PAssword"})

        const token = jwt.sign({userId: user._id} , process.env.JWT_SECRET , {expiresIn: "7d"});

        res.status(200).json({user , token});
    } catch (error){
        console.error(error);
        res.status(500).json({message: error.message})
    }
}

const register = async (req , res) => {
    try {
        const { name , email , password} = req.body;

        const user= await User.findOne({email});

        if(user) return res.status(400).json({message: "User exitsts"})

        const hashedPassword = await bcrypt.hash(password , 10);

        const newUser = new User({
            name , email , password: hashedPassword
        })

        await newUser.save();

        const token  = jwt.sign({userId: newUser._id} , process.env.JWT_SECRET , {expiresIn: "7d"});

        res.status(201).json({newUser , token});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message})
    }
}

const getProfile = async (req , res) => {
    try {
        const user = await User.findById(req.user.userId)

        if(!user) return res.status(404).json({message: 'User not found'})

        res.status(200).json(user);
    }
    catch (error){
        console.error(error);
        res.status(500).json({message: error.message})
    }
}

module.exports = {login , register , getProfile};