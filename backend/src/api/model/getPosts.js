import pool from "./db.js"

const selectPosts = async () => {
    const client = await pool.connect();
    try {
        const selectPost = await client.query("SELECT * FROM job_postings");
        
        if (selectPost.rows.length === 0) {
            throw new Error("No posts were found");
        }

        return selectPost.rows
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    } finally {
        client.release();
    }
}

export default selectPosts