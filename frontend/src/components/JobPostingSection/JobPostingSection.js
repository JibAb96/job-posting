import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import JobUpdateModal from "../JobUpdateModal/JobUpdateModal";
import "./JobPostingSection.css";
import { ShowModalContext } from "../../context/ShowModal";
import DeletePostModal from "../DeletePostModal/DeletePostModal";

const JobPostingSection = () => {
  const [jobPostings, setJobPostings] = useState([])
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const { refreshTrigger } = useContext( ShowModalContext )

  useEffect(() => {
    const getPostings = async () => {
      
      try {
        const response = await fetch(
          `http://localhost:3001/`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch job postings");
        }
          const data = await response.json();
          setJobPostings(data);
      }
      catch(error){
        console.error(error);
      }
    };
    getPostings();
  }, [refreshTrigger]);

  const handleUpdateClick = (job) => {
    setSelectedJob(job)
    setShowUpdateModal(true); 
  };
  const handleDeleteClick = (job) => {
    setSelectedJob(job)
    setShowDeleteModal(true); 
  };

  const handleClose = () => {
    setSelectedJob(null);
    setShowUpdateModal(false); 
    setShowDeleteModal(false); 
  };

  const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });
  
    return formatter.format(amount);
  };

  return (
    <section className="job-posting-section">
      <Container>
        
        <h2 className="section-title">Available Job Postings</h2>
        <Row className="g-4">
          {jobPostings.map((job) => (
            <Col key={job.id} xs={12} md={6} lg={4}>
              <Card className="job-card">
                <Card.Body>
                  <Card.Title className="job-role">{job.job_title}</Card.Title>
                  <Card.Text>
                    <strong>Company:</strong> {job.company}
                  </Card.Text>
                  <Card.Text>
                    <strong>Location:</strong> {job.location}
                  </Card.Text>
                  <Card.Text>
                    <strong>Salary:</strong> {formatCurrency(job.salary) + " per annum"}
                  </Card.Text>
                  <div className="button-group">
                    <Button
                      variant="primary" 
                      onClick={() => handleUpdateClick(job)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteClick(job)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {selectedJob && (
          <JobUpdateModal show={showUpdateModal} handleClose={handleClose} job={selectedJob} />
        )}
        {selectedJob && (
          <DeletePostModal show={showDeleteModal} handleClose={handleClose} job={selectedJob} />
        )}           
      </Container>
    </section>
  );
};

export default JobPostingSection;