import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function Menu() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="fixed-top">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
                    Kümnevõistlus
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto ps-2">
                        <Nav.Link as={Link} to="/people" className="text-dark">
                            Athletes
                        </Nav.Link>
                        <Nav.Link as={Link} to="/events" className="text-dark">
                            Events
                        </Nav.Link>
                        <Nav.Link as={Link} to="/addPerson" className="text-dark">
                            Add New Athlete
                        </Nav.Link>
                        <Nav.Link as={Link} to="/map" className="text-dark">
                            Map
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;
