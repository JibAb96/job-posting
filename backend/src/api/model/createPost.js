import pool from "./db.js"

const insertPost = async (res, jobTitle, company, location, salary) => {
    
    const client = await pool.connect();

    try{
        await client.query("BEGIN")
        
        const insertJob = await client.query(
            `INSERT INTO job_postings(job_title, company, location, salary) 
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [jobTitle, company, location, salary]
        )
        
        await client.query("COMMIT");
        res.status(201).json(insertJob.rows[0])
    }
    catch(error){
        console.error('Database error:', error.message);
        await client.query("ROLLBACK"); 
        return res.status(500).json({error: error.message})
    } finally{
        client.release();
    }
}

export default insertPost