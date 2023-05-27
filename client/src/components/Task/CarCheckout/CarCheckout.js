import React, { useEffect } from "react";
import { useState } from 'react';
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import {MdCreateNewFolder} from 'react-icons/md'
import Row from "react-bootstrap/esm/Row";
import Form from 'react-bootstrap/esm/Form'
import Button from "react-bootstrap/Button";
import CarDataService from "../../../services/CarDataService";
import PhieuThuDataService from "../../../services/PhieuThuDataService";

import { format } from 'date-fns';
import viLocale from 'date-fns/locale/vi';
function formatDateToVN(date) {
    let _date = new Date(date)
    return format(_date, 'dd/MM/yyyy', { locale: viLocale });
}
const CarCheckout = () => {
    const [Car, setCar] = useState([])
    const [BienSo, setBienSo] = useState([])
    const [TienThu, setTienThu] = useState([])

    const [NgayNhan, setNgayNhan] = useState(Date)
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            let _PhieuThu={
                NgayThu:NgayNhan,
                SoTienThu:TienThu,
                MaXe:1
            }
            console.log('phieuthu:',_PhieuThu)
            PhieuThuDataService.createPhieuThu(_PhieuThu)
        }
        setValidated(true);
    };
    const handleBienSoChange = (e) => {
        setBienSo(e.target.value)
    }
    const handleTienThuChange = (e) => {
        setTienThu(e.target.value)
    }
    
    const handleDateChange = (e) => {
        let _date = new Date(e.target.value)
        setNgayNhan(_date)
    }

    useEffect(() => {
        CarDataService.getAllCar()
            .then((data) => {
                setCar(data.data)
            })
    }, [])
    return (
        <div>
            <Container >
                <Row>
                    <Col xs='12'>
                        <h2>
                            Lập phiếu thu tiền
                        </h2>


                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row >
                                <Form.Group as={Col} xs='2' controlId="validationCustom01">
                                    <Form.Label>Biển số xe:</Form.Label>
                                    <Form.Control  type="text" placeholder="Nhập biển số xe" onChange={handleBienSoChange} required/>
                                    <Form.Control.Feedback type="invalid">
                                        Vui lòng nhập biển số
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} xs='2'>
                                    <Form.Label>Số tiền thu:</Form.Label>
                                    <Form.Control type="number" min="10000" step="500" placeholder="Nhập số tiền" onChange={handleTienThuChange} required />
                                    <Form.Control.Feedback type="invalid">
                                        Vui lòng nhận số tiền thu
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} xs='2' className="mb-3" controlId="validationCustom04">
                                    <Form.Label>Ngày thu tiền</Form.Label>
                                    <Form.Control type="date" placeholder="Chọn ngày" onChange={handleDateChange} required/>
                                    <Form.Control.Feedback type="invalid">
                                        Vui lòng chọn ngày thu tiền
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} xs='2' className="mb-3" controlId="validationCustom04">
                                    <Button type='submit' style={{ backgroundColor: '#0c828f', border: 'none', marginTop: '33px', marginBottom: '10px' }} >
                                        Lập phiếu thu
                                        <MdCreateNewFolder style={{fontSize:"20px",marginLeft:'6px'}}/>
                                    </Button>

                                </Form.Group>
                            </Row>
                        </Form>

                    </Col>
                    <Col xs='12' className='CarBrandList-container mt-3' style={{ margin: '0px ', }} >
                        <h2>
                            Thông tin xe
                        </h2>
                        <Row style={{ textAlign: 'center', paddingBottom: '10px', fontWeight: '700', paddingRight: '6px' }}>
                            <Col xs='1' style={{ paddingRight: '5px' }}>
                                STT
                            </Col>
                            <Col xs='1'>
                                Biển số
                            </Col>
                            <Col xs='2'>
                                Hiệu xe
                            </Col><Col xs='2'>
                                Tên khách hàng
                            </Col>
                            <Col xs='2'>
                                Số điện thoại
                            </Col>

                            <Col xs='2'>
                                Tiền nợ
                            </Col>
                            <Col xs='2'>
                                Ngày nhận
                            </Col>
                        </Row>
                        <div style={{ maxHeight: "500px", overflow: "hidden", overflowY: 'visible', paddingRight: '5px' }}>
                            {Car.length===0?<p>Không tìm thấy xe phù hợp</p>:Car.map((item, key) => <Row style={{ textAlign: 'center', padding: '8xp 10px', lineHeight: '27px', borderBottom: 'black 0.5px solid' }}>
                                <Col xs='1' style={{ borderLeft: 'black 0.5px solid', paddingRight: '5px' }}>
                                    {key + 1}
                                </Col>
                                <Col xs='1' style={{ borderLeft: 'black 0.5px solid' }}>
                                    {item.BienSo}
                                </Col><Col xs='2' style={{ borderLeft: 'black 0.5px solid' }}>
                                    {item.HieuXe}
                                </Col>
                                <Col xs='2' style={{ borderLeft: 'black 0.5px solid' }}>
                                    {item.TenKH}
                                </Col>
                                <Col xs='2' style={{ borderLeft: 'black 0.5px solid' }}>
                                    {item.DienThoai}
                                </Col>
                                <Col xs='2' style={{ borderLeft: 'black 0.5px solid' }}>
                                    {item.TienNo.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                </Col>

                                <Col xs='2' style={{ borderLeft: 'black 0.5px solid' }}>
                                    {formatDateToVN(item.NgayNhan)}

                                </Col>
                            </Row>)}
                            
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default CarCheckout;