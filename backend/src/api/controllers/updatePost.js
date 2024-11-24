import editDatabase from "../model/updatePost.js"
import validateJobPosting from "../validate/createPost.js"

const updatePost = async (req, res) => {
    const { id, jobTitle, company, location, salary } = req.body;

    const validData = validateJobPosting(jobTitle, company, location, salary);

    if(validData !== true || !id ){
        return res.status(400).json({ errors: validData || "Invalid Data" });
    }

    try{
        const updateDatabase = await editDatabase( id, jobTitle, company, location, salary );

        return res.status(201).json(updateDatabase);
    } catch(error){
        return res.status(500).json({ error: error.message });
    }
}

export default updatePost