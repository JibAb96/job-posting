import express from "express";
import createPost from "../controllers/createPost.js";
import getPosts from "../controllers/getPosts.js";
import updatePost from "../controllers/updatePost.js";
import deletePost from "../controllers/deletePost.js";

const router = express.Router();

router.get("/", (req, res) => getPosts(req, res));
router.post("/", (req, res) => createPost(req, res));
router.put("/", (req, res) => updatePost(req, res));
router.delete("/:id", (req, res) => deletePost(req, res));

export default router;