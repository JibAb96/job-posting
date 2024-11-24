import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { ShowModalContext } from "../../context/ShowModal";

const DeletePostModal = ({ show, handleClose, job }) => {
    const { refreshPostings } = useContext( ShowModalContext )
    
    const deletePost = async () => {
        try {
            const response = await fetch(`http://localhost:3001/${job.id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json"
              }
            });
      
            if (!response.ok) {
                alert("There was an internal server error");
                throw new Error("Failed to delete booking");  
            }
            
            refreshPostings();
            alert("The job post was deleted successfully!");
          
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("There was an internal server error");
          } finally{
            handleClose();
          }
    }
  
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                Are you sure you want to delete the job posting for{" "}
                <strong>{job?.job_title || "this job"}</strong> at{" "}
                <strong>{job?.company || "this company"}</strong>?
                </p>
                <p>This action cannot be undone.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Cancel
                </Button>
                <Button variant="danger" onClick={deletePost}>
                Delete
                </Button>
            </Modal.Footer>
        </Modal>
  );
};

export default DeletePostModal;