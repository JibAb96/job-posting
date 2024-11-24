import { error } from "console";
import pool from "./db.js"

const deleteDatabaseEntry = async (id) => {
    
    const client = await pool.connect();

    try {
        const deleteEntry = await client.query(
                "DELETE FROM job_postings WHERE id = $1 RETURNING *", [id]
            );

        if (deleteEntry.rows.length === 0) {
            throw new Error("Post not found");
        }        
        return "Post was deleted successfully";
    } catch (error) {
        console.error(error.message);
        throw error(error.message);
    } finally {
        client.release();
    }
}

export default deleteDatabaseEntry