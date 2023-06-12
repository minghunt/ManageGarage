import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logoutSuccess } from '../../features/userSlice';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'
const Header = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userRole = useSelector((state) => state.user.userRole);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logoutSuccess());
    console.log("Đăng xuất thành công!");
    Cookies.remove('token');
    navigate('/');
    }
    return (
        <div style={{backgroundColor:'#f8f9fa'}}>
            <Container >
            <Navbar bg="light" expand="sm">
                <Navbar.Brand href="/Task">Quản Lý Garage Ô tô ({userRole})</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>
                            <Link className="header-nav-link" to={"/Task"}>Chức năng</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link className="header-nav-link" to={"/Report"}>Báo cáo</Link>
                        </Nav.Link>
                        {userRole === "admin" ? (
                        <Nav.Link>
                            <Link  className="header-nav-link" to={"/Rule"}>Quy định</Link>
                        </Nav.Link>
                        ) : (
                        <></>
                        )}
                        {userRole === "admin" ? (
                        <Nav.Link>
                            <Link  className="header-nav-link" to={"/ManageUser"}>Quản lý người dùng</Link>
                        </Nav.Link>
                        ) : (
                        <></>
                        )}
                    </Nav>
                    <Nav>
                        <NavDropdown title="Tài khoản" id="collasible-nav-dropdown">
                            <NavDropdown.Item>
                                <Link className="header-nav-link" to={"/user"}>Hồ sơ</Link>
                            </NavDropdown.Item>
                            
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>
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