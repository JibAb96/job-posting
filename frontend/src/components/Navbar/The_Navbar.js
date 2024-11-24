import React,{ useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { ShowModalContext } from "../../context/ShowModal";
import "./Navbar.css";

const The_Navbar = () => {

    const { setShow } = useContext(ShowModalContext);

    const handleShow = () => setShow(true);

    return (
        <Navbar className="custom-navbar">
            <Container>
                <Navbar.Brand href="/">Job Board</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Button 
                        variant="success" 
                        className="create-btn"
                        onClick={handleShow}
                    >
                        Create Job Post
                    </Button>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  );
};

export default The_Navbar;