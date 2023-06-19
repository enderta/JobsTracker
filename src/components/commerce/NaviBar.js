import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Button} from "react-bootstrap";

function NaviBar(props) {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');



    useEffect(() => {
        if (darkMode) {

            document.body.style.backgroundColor = 'black';
            document.body.style.color = '#3a2f2f';
        } else {

            document.body.style.backgroundColor = '#e7e7e7';
            document.body.style.color = 'darkgray';
        }
    }, [darkMode]);

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem('darkMode', !darkMode);

    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location = '/';
    }

    return (
        <div style={{margin: "1px", backgroundColor: darkMode ? '#4c3956' : "whitesmoke"}}>
            <Navbar expand="xxl" style={{height: "50px"}}>
                <Container>
                    <div>
                        <div className="d-flex justify-content-between">
                            <Button style={{alignSelf: "start"}} variant={darkMode ? 'outline-warning' : 'outline-dark'}
                                    onClick={handleDarkMode}>
                                {darkMode ? <span style={{color: 'goldenrod'}}>&#x2600; </span> :
                                    <span style={{color: 'darkgray'}}>&#127769;</span>}
                            </Button>
                        </div>
                    </div>
                    <Navbar.Brand></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>

                        </Nav>
                        {
                            localStorage.getItem('token') ? (
                                <NavDropdown title="Account" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/basket">Basket</NavDropdown.Item>
                                    <NavDropdown.Item href="/orders">Orders</NavDropdown.Item>
                                    <NavDropdown.Item href="/">Settings</NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                </NavDropdown>) : (
                                <Nav>
                                    <NavDropdown title="Account" id="basic-nav-dropdown">
                                        <NavDropdown.Item style={{color:"black"}} href="/login">Login</NavDropdown.Item>
                                        <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                    </NavDropdown>
                                </Nav>)
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NaviBar;