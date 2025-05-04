const mongoose = require("mongoose");
const Post = require("./Post");

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true 
    },
    profilePicture: {
        type: String,
        default: null
    },
    bio: {
        type: String,
        default: null
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
} , {
    timestamps: true
})

const User = mongoose.model("User" , userSchema);

module.exports = User