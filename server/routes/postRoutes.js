const express = require("express");
const { getAllPosts, createPost, updatePost, deletePost, getPostById, likePost, addComment } = require("../controllers/postController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

//public routes
router.get("/" , getAllPosts )
router.get("/:id" , getPostById)


// Private Routes
router.post("/" ,protect ,  createPost);
router.put("/:id" , protect , updatePost );
router.delete("/:id" ,protect , deletePost);
router.post("/:id/like" , protect , likePost);
router.post("/:id/comment" , protect , addComment);

module.exports = router;