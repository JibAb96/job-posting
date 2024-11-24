import validateJobPosting from "../validate/createPost.js";

import insertPost from "../model/createPost.js";

const createPost = async (req, res) => {
    
    const {jobTitle, company, location, salary} = req.body;

    const validation = validateJobPosting(jobTitle, company, location, salary);

    if (validation !== true){
        return res.status(400).json({ errors: validation });
    }

    try{
        const savePost = await insertPost(res, jobTitle, company, location, salary);
        
        return res.status(201).json(savePost);
    }
    catch(error) {
        return res.status(500).json({ error: error.message });
    }

    

}

export default createPost