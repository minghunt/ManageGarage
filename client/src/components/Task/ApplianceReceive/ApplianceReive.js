import React, { useEffect } from "react";
import { useState } from 'react';
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from 'react-bootstrap/esm/Form'
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/esm/FormGroup";
import { MdLibraryAdd, MdDeleteForever } from 'react-icons/md'
import PhuTungDataService from '../../../services/PhuTungDataService'
const ApplianceReceive = () => {
    const [reload, setReload] = useState(false)
    const [AppliList, setAppliList] = useState([])
    const [parts, setParts] = useState([{ name: 'Bánh xe', quantity: null, price: 610000, total: 0 }])
    const [totalPrice, setTotalPrice] = useState(0)
    const [NgayNhan, setNgayNhan] = useState(Date)
    const [validated, setValidated] = useState(false);
    const handleClickOpenAdd = (e) => {
        let _parts = parts;
        _parts.push({ name: AppliList[0].TenPhuTung, quantity: null, price: AppliList[0].DonGia, total: 0 })
        setParts(_parts)
        setReload(!reload)
    }

    const handleDateChange = (e) => {
        let _date = new Date(e.target.value)
        setNgayNhan(_date)
    }
    const handleNameChange = (index, event) => {
        let _parts = parts;
        _parts[index].name = AppliList[event.target.value].TenPhuTung;
        _parts[index].price = AppliList[event.target.value].DonGia;
        _parts[index].total = _parts[index].quantity * _parts[index].price;
        setParts(_parts)
        setReload(!reload)
    }
    const handleInputChange = (index, event) => {
        let _parts = parts;
        _parts[index].quantity = event.target.value;
        _parts[index].total = _parts[index].quantity * _parts[index].price;
        setParts(_parts)
        setReload(!reload)
    }
    const handlePriceChange = (index, event) => {
        let _parts = parts;
        _parts[index].price = event.target.value;
        _parts[index].total = _parts[index].quantity * _parts[index].price;
        setParts(_parts)
        setReload(!reload)
    }
    const handleRemovePart = (index, event) => {
        let _part = parts;
        if (_part.length===1) return;
        console.log('index', index)
        _part.splice(index, 1)
        setParts(_part)
        setReload(!reload)
    }
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {

        }
        setValidated(true);
        console.log('PhieuNhap',parts)
    };
    useEffect(() => {
        let s = 0;
        parts.map(item => s += item.total)
        setTotalPrice(s)
        
        PhuTungDataService.getAllPhuTung()
            .then((data) => {
                setAppliList(data.data)
            })
    }, [parts, reload])
    return (
        <div>
            <Container>
                <Row>
                    <Col xs='6'>
                        <h2>
                            Lập phiếu nhập VTPT
                        </h2>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationCustom04">
                                    <Form.Label>Ngày nhập vật tư</Form.Label>
                                    <Form.Control type="date" placeholder="Chọn ngày" onChange={handleDateChange} name="begin" required />
                                    <Form.Control.Feedback type="invalid">
                                        Vui lòng chọn ngày tiếp nhận
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationCustom03">
                                    <Form.Label>Tổng tiền</Form.Label>
                                    <Form.Control type="text" value={totalPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })} readOnly />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <FormGroup>
                                    Vật tư, phụ tùng:
                                    <Button onClick={handleClickOpenAdd} style={{ marginLeft: '5px', border: 'none', width: '20%', textTransform: 'none', backgroundColor: '#0c828f', color: 'white' }}>
                                        Thêm
                                        <MdLibraryAdd style={{ marginLeft: '6px', fontSize: '18px' }} />
                                    </Button>
                                </FormGroup>
                            </Row>
                            <Form.Group controlId="parts" style={{ marginBottom: "20px" }}>
                                <div style={{ paddingRight: '10px', maxHeight: '360px', overflow: 'hidden', overflowY: 'visible' }}>

                                    <Row>
                                        <Col md='3'>
                                            Tên Phụ tùng
                                        </Col>
                                        <Col md='2'>
                                            Số lượng
                                        </Col>
                                        <Col md='3'>
                                            Đơn giá
                                        </Col>
                                        <Col md='3'>
                                            Thành tiền
                                        </Col>
                                        <Col md='1'>
                                            Xóa
                                        </Col>
                                    </Row>
                                    {parts.map((part, index) => (<>
                                        <Row className="mb-2" style={{ paddingRight: '0' }}>
                                            <Col md={3}>
                                                <Form.Control
                                                    as="select"
                                                    onChange={(event) => handleNameChange(index, event)}
                                                    required
                                                >
                                                    {AppliList.map((phuTung, key) =>
                                                        part.name === phuTung.TenPhuTung ?
                                                            <option value={key} selected>
                                                                {phuTung.TenPhuTung}
                                                            </option>
                                                            :<option value={key}>
                                                                {phuTung.TenPhuTung}
                                                            </option>
                                                    )}
                                                </Form.Control>
                                            </Col>
                                            <Col md={2}>
                                                <Form.Control
                                                    type="number"
                                                    min="1"
                                                    value={part.quantity}
                                                    onChange={(event) => handleInputChange(index, event)}
                                                    required
                                                />
                                            </Col>
                                            <Col md={3}>
                                                <Form.Control
                                                    type="number"
                                                    min="0"
                                                    step="500"
                                                    defaultValue={part.price}
                                                    value={part.price}
                                                    onChange={(event) => handlePriceChange(index, event)}
                                                />
                                            </Col>
                                            <Col md={3}>
                                                <Form.Control type="text"name="total"
                                                    value={part.total.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                                    readOnly
                                                />
                                            </Col>
                                            <Col md={1}>
                                                <Form.Group>
                                                    <MdDeleteForever className='CarBrand-detele-btn' style={{ fontSize: '30px', marginTop: '3px' }} onClick={() => handleRemovePart(index)} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </>))}
                                </div>
                            </Form.Group>
                            <Button style={{ backgroundColor: '#0c828f', border: 'none' }} type="submit">Lập phiếu tiếp nhận</Button>
                        </Form>
                    </Col>
                    <Col xs='6' className='CarBrandList-container' style={{ marginTop: '-10px' }}>
                        <h2>
                            Danh sách vật tư, phụ tùng
                        </h2>
                        <Row style={{ textAlign: 'center', paddingBottom: '10px', fontWeight: '700', paddingRight: '22px' }}>
                            <Col xs='1' style={{ paddingRight: '5px' }}>
                                STT
                            </Col>
                            <Col xs='4'>
                                Tên vật tư
                            </Col>
                            <Col xs='4'>
                                Đơn giá
                            </Col><Col xs='3'>
                                Số lượng tồn
                            </Col>
                        </Row>
                        <div style={{ maxHeight: "500px", overflow: "hidden", overflowY: 'visible', paddingRight: '5px' }}>
                            {AppliList.map((item, key) => <Row style={{ textAlign: 'center', padding: '8xp 10px', lineHeight: '27px', borderBottom: 'black 0.5px solid' }}>
                                <Col xs='1' style={{ borderLeft: 'black 0.5px solid', paddingRight: '5px' }}>
                                    {key + 1}
                                </Col>
                                <Col xs='4' style={{ borderLeft: 'black 0.5px solid' }}>
                                    {item.TenPhuTung}
                                </Col><Col xs='4' style={{ borderLeft: 'black 0.5px solid' }}>
                                    {item.DonGia.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                </Col>
                                <Col xs='3' style={{ borderLeft: 'black 0.5px solid' }}>
                                    {item.SoLuongTon}
                                </Col>
                            </Row>)}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default ApplianceReceive;