import deleteDatabaseEntry from "../model/deletePost.js";

const deletePost = async (req, res) => {
    
    const { id } = req.params;

    if(!id){
        return res.status(400).json({message: "No id received from frontend"})
    }

    try {
        const response = await deleteDatabaseEntry(id);

        if(!response === "Post was deleted successfully"){
            res.status(500).json({message: response})
        }

        res.json("Post was deleted successfully");
    } catch (error){
        console.error(error.message)
        return res.status(500).json({ error: error.message });
    }
}

export default deletePost

