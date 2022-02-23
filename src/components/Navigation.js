import {Link} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";

export function NavbarBase() {

    return <>
        <Navbar fixed={'top'} bg={'dark'} variant={'dark'} className={'shadow p-2'}>
            <Container>
                <Navbar.Brand>
                    Uno
                </Navbar.Brand>
                <Nav className="justify-content-end">
                    <Nav.Item><Link to={"/"} className={'nav-link'}>Home</Link></Nav.Item>
                    <Nav.Item><Link to={"/game"} className={'nav-link'}>Game</Link></Nav.Item>
                </Nav>
            </Container>
        </Navbar>
        <div style={{height: "3.5em"}}/>
    </>
}