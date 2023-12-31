import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { TutorialModal } from "./TutorialModal";

import { api } from '../utilities/ApiUtilities';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavLink from 'react-bootstrap/NavLink';

import SacredScrollsLogo from '../Images/TransparentLogo.png'

export const NavBar = ({ user, setUser }) => {
    const [showTutorial, setShowTutorial] = useState(false);

    const handleShowTutorialModal = () => setShowTutorial(true);
    const handleHideTutorialModal = () => setShowTutorial(false);

    const navigate = useNavigate();


    const logOut = async() => {
        localStorage.removeItem("token");
        let response = await api
        .post("user/logout/")
        if (response.status === 204) {
            delete api.defaults.headers.common["Authorization"];
            setUser(null);
        }
        navigate('/');
    };
    
    return (
        <Navbar style={{paddingBottom: "2%", padding: "2%", marginTop: '0.5vh'}} expand="lg" id='navbar-comp'>
            <Container>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Navbar.Brand>
                <img
                    src={SacredScrollsLogo}
                    width="300"  // Adjusted width
                    height="auto"  // Adjusted height
                    className="d-inline-block align-top img-fluid"  // Added img-fluid for responsiveness
                    alt="Sacred Scrolls Logo"
                />
                </Navbar.Brand>
                <Button style={{marginTop:"-15%", color: 'rgb(90, 84, 35)'}} variant="transparent" onClick={handleShowTutorialModal} className="pulse-button">
                    Tutorial</Button>                
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" variant='green'>
                    <Nav style={{ display: 'flex', justifyContent: 'center', width: '100%' }} className="me-auto">
                        <NavLink as={Link} to="/" className="mx-2">Home</NavLink>
                        
                        {user ? (
                            <>
                                <NavLink as={Link} to="/texts/" className="mx-2">The Texts</NavLink>
                                <NavLink as={Link} to="/text-compare/" className="mx-2">Textual Comparison</NavLink>
                                <NavLink as={Link} to="/journal/" className="mx-2">Journal</NavLink>
                                <NavLink as={Link} to="/favorites/" className="mx-2">Favorites</NavLink>
                                <NavLink as={Link} to="/allposts/" className="mx-2">Posts</NavLink>
                                <NavLink as={Link} to="/about/" className="mx-2">About Us</NavLink>

                            </>
                        ) : (
                        <>
                            <NavLink as={Link} to="/login/" className="mx-2">Log in / Sign up</NavLink>
                            <NavLink as={Link} to="/text-compare/" className="mx-2">Text Compare</NavLink>
                            <NavLink as={Link} to="/about/" className="mx-2">About Us</NavLink>
                        </>
                        )}
                    </Nav>

                </Navbar.Collapse>
            <div style={{ display: 'flex', flexDirection:'row', alignItems: 'center', marginRight: "2%" }}>
                <div style={{ display: 'flex', alignItems: 'center' }}> {/* Row for buttons */}
                        {user && (
                                <Button onClick={logOut} variant="none" className="mx-2">
                                        Log Out
                                </Button>
                        )}
                </div>
                <div> {/* Separate container for the welcome message */}
                        <span>Welcome, {user ? user : 'Guest'}</span>
                </div>
        </div>
          </Container>
          <TutorialModal show={showTutorial} onHide={handleHideTutorialModal} />

        </Navbar>
    );
}

