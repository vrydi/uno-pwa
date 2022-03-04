import { Link } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { askForNotificationPermission } from "../serviceWorkerRegistration";

export function NavbarBase() {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        fixed={"top"}
        bg={"dark"}
        variant={"dark"}
        className={"shadow p-2"}
      >
        <Container>
          <Navbar.Brand>Uno</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="d-flex justify-content-center text-center w-100">
              <Nav.Item>
                <Link to={"/"} className={"nav-link"}>
                  Home
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to={"/game"} className={"nav-link"}>
                  Game
                </Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
          <Button onClick={() => askForNotificationPermission()}>
            Send notifications
          </Button>
        </Container>
      </Navbar>
      <div style={{ height: "3.5em" }} />
    </>
  );
}
