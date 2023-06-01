import React, { useState } from "react";
import { Container, Form, Row, Col, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FullPageLoader from "../FullPageLoader/FullPageLoader";
import UserDataService from '../../services/UserDataService';

const UserPassword=()=>{
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const email = useSelector((state) => state.user.email);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'currentPassword') {
            setCurrentPassword(value);
        } else if (name === 'newPassword') {
            setNewPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } 
        else {
            setIsLoading(true);
            if (newPassword !== confirmPassword) {
                console.log("Mật khẩu nhập lại không trùng khớp");
                setError('Mật khẩu nhập lại không trùng khớp');
                setIsLoading(false);
                return;
            }
                console.log("Tài khoản: ",email);
                UserDataService.putPassword(email, currentPassword, newPassword)
                .then(response => {
                    if(response.status === 200) {
                        console.log("Đổi mật khẩu thành công");
                        setShow(true);
                        setIsLoading(false);
                    } else if (response.status === 401) {
                        console.log("Mật khẩu cũ không chính xác");
                        setError('Mật khẩu cũ không chính xác');
                        setIsLoading(false);
                    } else {
                        console.log("Đổi mật khẩu không thành công: ", response.data.error );
                        setError('Đổi mật khẩu không thành công');
                        setIsLoading(false);
                    }
                })
                .catch(err => {
                    console.error("Lỗi yêu cầu đổi mật khẩu: ",error);
                    setShow(false);
                    setIsLoading(false);
                    setError("Lỗi yêu cầu đổi mật khẩu");
                })
            }
            setValidated(true);
    }

    const handleModal = async (e) => {
        setShow(false);
        setIsLoading(false);
        navigate("/user");
    }

    return(
            <Container className="container-user">
                {isLoading && <FullPageLoader/>}
                <h5>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</h5>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row style={{marginBottom:"16px"}}>
                        <Col>
                            <Form.Group as={Col} md={5}>
                                <Form.Label>Mật khẩu hiện tại:</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    id="currentPassword" 
                                    name="currentPassword" 
                                    value={currentPassword} 
                                    onChange={handleChange} 
                                    required/>
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng nhập mật khẩu hiện tại
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Row style={{marginBottom:"16px"}}>
                        <Col>
                            <Form.Group as={Col} md={5}>
                                <Form.Label>Mật khẩu mới:</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    id="newPassword" 
                                    name="newPassword" 
                                    value={newPassword} 
                                    onChange={handleChange} 
                                    required/>
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng nhập mật khẩu mới
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row style={{marginBottom:"16px"}}>
                        <Col>
                            <Form.Group as={Col} md={5}>
                                <Form.Label>Nhập lại mật khẩu mới:</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    id="confirmPassword" 
                                    name="confirmPassword" 
                                    value={confirmPassword} 
                                    onChange={handleChange} 
                                    required/>
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng nhập lại mật khẩu mới
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                            {error && <div style={{color:"red",marginTop: "10px"}}>{error}</div>}
                    </Row>

                    <Row>
                        <Col>
                            <Button type="submit">Đổi mật khẩu</Button>
                        </Col>
                    </Row>
                </Form>

                <Modal show={show} onHide={()=>setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thông báo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Bạn đã đổi mật khẩu thành công
                    </Modal.Body>
                    <Modal.Footer>
                        <Button  variant="success" onClick={handleModal}>Đồng ý</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
    );

}
export default UserPassword;