import pool from "./db.js"

const editDatabase = async (id, jobTitle, company, location, salary) => {
    
    const client = await pool.connect();
    
    try {
        await client.query("BEGIN")
        const update = await client.query(
            `UPDATE job_postings
             SET job_title = $2, company = $3, location = $4, salary = $5  
             WHERE id = $1`,
            [id, jobTitle, company, location, salary]
        );
        if (update.rowCount === 0) {
            throw new Error('No job post found with the given ID');
        }

        await client.query("COMMIT");
        return "Update Successful";
    } catch (error) {
        console.error('Database query error:', error);
        await client.query("ROLLBACK"); 
        throw error;
    } finally {
        client.release();
    }
}

export default editDatabase