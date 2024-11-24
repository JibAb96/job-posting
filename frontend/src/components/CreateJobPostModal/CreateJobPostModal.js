import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ShowModalContext } from "../../context/ShowModal";

const CreateJobPostModal = () => {
  const { show, setShow, refreshPostings } = useContext(ShowModalContext);
  const [ jobTitle, setJobTitle ] = useState("");
  const [ company, setCompany ] = useState("");    
  const [ location, setLocation ] = useState("");    
  const [ salary, setSalary ] = useState("");        
  
  const handleClose = () => setShow(false);

  const postJob = async (e) => {
    e.preventDefault();
    
    const formData = {
      jobTitle,
      company,
      location,
      salary
    }
    try{
      const response = await fetch("http://localhost:3001/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )

      if(!response.ok){
        return alert("There was an error with the server")
      }

      refreshPostings();
      return alert("Job posting was successful")
    } 
    catch (error) {
      alert("There was an error with the server")
      console.error("Error posting job:", error);
    } finally {
      setShow(false)
    }
  }
  return (
    <>
      {/* Modal Component */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Job Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postJob}>
            <Form.Group className="mb-3" controlId="jobTitle">
              <Form.Label>Job Title</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter job title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value) } 
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value) } 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="salary">
              <Form.Label>Salary</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Enter salary" 
                value={salary}
                onChange={(e) => setSalary(e.target.value) } 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="company">
              <Form.Label>Company</Form.Label>
              <Form.Control 
                type="text"  
                placeholder="Enter company name"
                value={company}
                onChange={(e) => setCompany(e.target.value) } 
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateJobPostModal;