const User = require("../models/User");
const Post = require("../models/Post");

const getAllPosts = async(req , res) => {
    try {
        const posts = await Post.find().sort({createdAt: -1});

        res.json(posts);
    } catch(error){
        console.error(error);
        res.status(500).json({message: error.message})
    }
}

const getPostById = async(req , res ) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if(!post) return res.status(404).json({message: "Post not found"})

        res.status(200).json(post)
    } catch(error){
        console.error(error);
        res.status(500).json({message: error.message})
    }
}
const createPost = async (req , res) => {
    try {
        const {content , image} = req.body;
        const userId = req.user.userId;

        const post = new Post({
            content,
            author: userId,
            image: image || null
        })
        const newPost = await post.save();

        await User.findByIdAndUpdate(userId , { $push: {posts: newPost._id}});

        res.status(201).json({message: "Created"})
    } catch(error){
        console.error(error);
        res.status(500).json({message: error.message})
    }
}

const updatePost = async (req , res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const {content , image} = req.body;

        const post  = await Post.findById(id);

        if(!post) return res.status(404).json({message: "Post not found"})
        
        if(post.author.toString() != userId) return res.status(401).json({message: "User unauthorized"})

        const updatedPost = await Post.findByIdAndUpdate(id , {content , image} , {new: true})

        res.status(200).json(updatedPost)
    } catch(error){
        console.error(error);
        res.status(500).json({message: error.message})
    }
}

const deletePost = async (req , res) => {
    try{
        const {id} = req.params;
        const userId = req.user.userId;

        const post = await Post.findById(id);
        if(!post) return res.status(404).json({message: "Not found"});
        if(post.author.toString() != userId) return res.status(401).json({message: "Unauthorized"})

        await Post.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId , { $pull: {posts: id}})
    } catch(error){
        console.error(error);
        res.status(500).json({message: error.message})
    }
}

const likePost = async (req , res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.userId;
    
        const post = await Post.findById(postId);
    
        if(!post) return res.status(404).json({message: "Post not found"})
    
        const alreadyLiked = post.likes.includes(userId);
    
        if(alreadyLiked) {
            post.likes = post.likes.filter((id) => id.toString() != userId);
        } 
        else {
            post.likes.push(userId);
        }
    
        await post.save();
    
        res.status(200).json({likes: post.likes , totalLikes: post.likes.length});
    } catch(error){
        console.error(error);
        res.status(500).json({message: error.message})
    }
}

const addComment = async (req , res) => {
    try {
        const {content} = req.body;
        const postId = req.params.id;
        const userId = req.user.userId;

        if(!content) return res.status(404).json({message: "Comment is required"})

        const post = await Post.findById(postId);

        if(!post) return res.status(404).json({message: "Post not found"});

        post.comments.push({content , author: userId});

        await post.save();

        res.status(201).json(post)
    } catch(error){
        console.error(error);
        res.status(500).json({message: error.message})
    }
}

module.exports = {createPost , updatePost , getAllPosts , deletePost , getPostById , likePost , addComment};