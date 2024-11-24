import selectPosts from "../model/getPosts.js";

const getPosts = async (req, res) => {
    try{
        const posts = await selectPosts();
        return res.status(201).json(posts);
    }
    catch(error) {
        return res.status(500).json({ error: error.message });
    }
}

export default getPosts