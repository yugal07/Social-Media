const express = require("express");
const { getAllPosts, createPost, updatePost, deletePost } = require("../controllers/postController");

const router = express.Router();

router.get("/" , getAllPosts )
router.post("/" , createPost);
router.put("/:id" , updatePost );
router.delete(":id" , deletePost);

module.exports = router;