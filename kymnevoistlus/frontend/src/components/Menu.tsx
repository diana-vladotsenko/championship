import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';

function Menu() {
    const { t, i18n } = useTranslation();

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="fixed-top">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
                    {t('nav.brand-name')}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <button onClick={() => i18n.changeLanguage("et")}>Estonian</button>
                    <button onClick={() => i18n.changeLanguage("en")}>English</button>
                    <Nav className="me-auto ps-2">
                        <Nav.Link as={Link} to="/people" className="text-dark" >
                            {t('nav.people')}
                        </Nav.Link>
                        <Nav.Link as={Link} to="/events" className="text-dark">
                            {t('nav.events')}
                        </Nav.Link>
                        <Nav.Link as={Link} to="/addPerson" className="text-dark">
                            {t('nav.addPerson')}
                        </Nav.Link>
                        <Nav.Link as={Link} to="/map" className="text-dark">
                            {t('nav.map')}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;
