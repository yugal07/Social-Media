const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
} , 
{
    timestamps: true
})

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }] , 
    comments: [commentSchema],
    image: {
        type: String,
        default: null
    }
} , {
    timestamps: true
})

const Post = mongoose.model("Post" , postSchema);

module.exports = Post;