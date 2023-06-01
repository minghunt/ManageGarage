import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import FullPageLoader from "../FullPageLoader/FullPageLoader";

const UserAccount=()=>{
    const email = useSelector((state) => state.user.email);
    const [user, setUser] = useState({});
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            console.log("Begin fetch")
            const res = await axios.get(`http://localhost:8000/api/users/${email}`);
            console.log("Email: ", email);
            setUser(res.data);
            console.log("res.data: ", res.data);
            setPhoneNumber(res.data.phoneNumber);
            setName(res.data.name);
            setGender(res.data.gender);
        } catch (err) {
            console.log("Lỗi lấy dữ liệu");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [email]);

    const handlePhoneNumberChange = (event) => {
        const phoneNumberValue = event.target.value;
        const submitButton = document.getElementById('submitButton');
        setPhoneNumber(event.target.value);
        // Kiểm tra tính hợp lệ của số điện thoại
        const phoneNumberPattern = /^[0-9]{10,11}$/;
        if (!phoneNumberPattern.test(phoneNumberValue)) {
            setPhoneNumberError('Số điện thoại không hợp lệ');
            submitButton.setAttribute('disabled', true);
        } else {
            submitButton.removeAttribute('disabled');
            setPhoneNumberError('');
        }
    };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
        const res = await axios.put(`http://localhost:8000/api/users/${email}`, {
            phoneNumber,
            name,
            gender,
        });

        if (res.status === 200) {
            console.log('Cập nhật thành công:', res.data.message);
            console.log(res.data);
            setShow(true);
            navigate('/user');
        } else {
            console.error('Lỗi cập nhật:', res.data.error);
            setShow(false);
            setIsLoading(false);
        }
        } catch (err) {
            console.log("Lỗi cập nhật dữ liệu");
            console.error(err);
            setShow(false);
            setIsLoading(false);
        }
    };

    const handleSubmitModal = async (event) => {
        setShow(false);
        setIsLoading(false);
    }

    return(
            <Container className="container-user">
                <h3>Quản lý thông tin hồ sơ</h3>
                <Form noValidate onSubmit={handleSubmit}>
                    <Row style={{marginBottom:"16px"}}>
                        <Col>
                            <Form.Group as={Col} controlId="email">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={email} 
                                    style={{opacity: 0.8}}
                                    disabled/>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group as={Col} controlId="createdDay">
                                <Form.Label>Ngày tạo tài khoản:</Form.Label>
                                <Form.Control
                                    type="text" 
                                    id="date" 
                                    name="date" 
                                    value={moment(user.date).format('DD/MM/YYYY')} 
                                    style={{opacity:0.8}} disabled/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row style={{marginBottom:"16px"}}>
                        <Form.Group as={Col} controlId="name">
                            <Form.Label>Tên:</Form.Label>
                            <Form.Control 
                                type="text" 
                                id="name" 
                                name="name" 
                                value={name}
                                onChange={handleNameChange} />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập biển số xe
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="phoneNumber">
                            <Form.Label>Số điện thoại:</Form.Label>
                            <Form.Control 
                                type="text" 
                                id="phoneNumber" 
                                name="phoneNumber" 
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}/>
                            {phoneNumberError && <div style={{ color: 'red' }}>{phoneNumberError}</div>}
                        </Form.Group>
                    </Row>

                    <Row style={{marginBottom:"16px"}}>
                        <Form.Group as={Col} controlId="gender">
                            <Form.Label column md={3}>Giới tính:</Form.Label>
                            <div className="d-flex">
                                <Form.Check 
                                    type="radio" 
                                    id="male" 
                                    name="gender" 
                                    value="Nam" 
                                    checked={gender === 'Nam' } 
                                    onChange={handleGenderChange}/>
                                <label for="male" style={{marginRight:"12px"}}> &ensp;Nam&emsp;&ensp;</label>
                                <Form.Check 
                                    type="radio" 
                                    id="female" 
                                    name="gender" 
                                    value="Nữ" 
                                    checked={gender === 'Nữ' } 
                                    onChange={handleGenderChange}/>
                                <label for="female" style={{marginRight:"12px"}}> &ensp;Nữ&emsp;&ensp;</label>
                                <Form.Check type="radio" 
                                    id="other" 
                                    name="gender" 
                                    value="Khác" 
                                    checked={gender === 'Khác' } 
                                    onChange={handleGenderChange}/>
                                <label for="other"> &ensp;Khác</label>
                            </div>
                        </Form.Group>
                    </Row>

                    <Row style={{marginBottom:"16px"}}>
                        
                    </Row>

                    <Row>
                        <Col>
                            <Button id="submitButton" className="btn btn-success btn-lg" type="submit" >Lưu</Button>
                        </Col>
                    </Row>
                </Form>

                <Modal show={show} onHide={()=>setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thông báo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Cập nhật thông tin người dùng thành công.  
                    </Modal.Body>
                    <Modal.Footer>
                        <Button  variant="success" onClick={handleSubmitModal}>Đồng ý</Button>
                    </Modal.Footer>
                </Modal>
        </Container>
    );
}
export default UserAccount;