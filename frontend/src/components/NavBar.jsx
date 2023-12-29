import { Link, useNavigate } from "react-router-dom";
import { api } from '../utilities/ApiUtilities';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavLink from 'react-bootstrap/NavLink';

import SacredScrollsLogo from '../Images/TransparentLogo.png'

export const NavBar = ({ user, setUser }) => {
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
        <Navbar style={{paddingBottom: "2%", padding: "2%"}} expand="lg" id='navbar-comp'>
            <Container style={{backgroundColor: "rgb(2, 27, 51)"}}>
                <Navbar.Brand>
                <img
                    src={SacredScrollsLogo}
                    width="300"  // Adjusted width
                    height="auto"  // Adjusted height
                    className="d-inline-block align-top img-fluid"  // Added img-fluid for responsiveness
                    alt="Sacred Scrolls Logo"
                />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav style={{ display: 'flex', justifyContent: 'center', width: '100%' }} className="me-auto">
                        <NavLink as={Link} to="/" className="mx-2">Home</NavLink>
                        
                        {user ? (
                            <>
                                <NavLink as={Link} to="/text-compare/" className="mx-2">Text Compare</NavLink>
                                <NavLink as={Link} to="/journal/" className="mx-2">Journal</NavLink>
                                <NavLink as={Link} to="/favorites/" className="mx-2">Favorites</NavLink>
                                <NavLink as={Link} to="/about/" className="mx-2">About</NavLink>

                            </>
                        ) : (
                        <>
                            <NavLink as={Link} to="/login/" className="mx-2">Log in / Sign up</NavLink>
                            <NavLink as={Link} to="/text-compare/" className="mx-2">Text Compare</NavLink>
                            <NavLink as={Link} to="/about/" className="mx-2">About</NavLink>
                        </>
                        )}
                    </Nav>

                </Navbar.Collapse>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: "2%" }}>
                <div style={{ display: 'flex', alignItems: 'center' }}> {/* Row for buttons */}
                        {user && (
                                <Button onClick={logOut} variant="danger" className="mx-2">
                                        Log Out
                                </Button>
                        )}
                </div>
                <div style={{color: "rgb(182, 170, 100)", marginTop: '0.5rem' }}> {/* Separate container for the welcome message */}
                        <span>Welcome, {user ? user.username : 'Guest'}</span>
                </div>
        </div>
          </Container>

        </Navbar>
    );
}

