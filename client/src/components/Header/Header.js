import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css'
import NavDropdown from 'react-bootstrap/NavDropdown';
const Header = () => {
    return (
        <div style={{backgroundColor:'#f8f9fa'}}>
            <Container >
            <Navbar bg="light" expand="sm">
                <Navbar.Brand href="/Task">Quản Lý Garage Ô tô</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>
                            <Link className="header-nav-link" to={"/Task"}>Chức năng</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link className="header-nav-link" to={"/Report"}>Báo cáo</Link>

                        </Nav.Link>
                        <Nav.Link>
                            <Link  className="header-nav-link" to={"/Rule"}>Quy định</Link>
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title="Tài khoản" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="">Hồ sơ</NavDropdown.Item>
                            <NavDropdown.Item href="">
                                Trợ giúp
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="">
                                Đăng xuất
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </Container>

        </div>
    )
}
export default Header;