import React, { useEffect } from "react";
import { useState } from 'react';
import CarsBrandDataService from '../../../services/CarBrandDataService'
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from 'react-bootstrap/esm/Form'
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import CarDataService from "../../../services/CarDataService";
import { format } from 'date-fns';
import viLocale from 'date-fns/locale/vi';
function formatDateToVN(date) {
    let _date = new Date(date)
    return format(_date, 'dd/MM/yyyy', { locale: viLocale });
}
const CarSearch = () => {
    const [HxeList, setHxeList] = useState([])
    const [CarList, setCarList] = useState([])
    const [BienSo, setBienSo] = useState([])
    const [TenKH, setTenKH] = useState('')
    const [MaHieuXe, setMaHieuXe] = useState(0)
    const [NgayNhan, setNgayNhan] = useState(Date)
    const [DienThoai, setDienThoai] = useState([])

    const handleBienSoChange = (e) => {
        setBienSo(e.target.value)
    }
    const handleTenKHChange = (e) => {
        setTenKH(e.target.value)
    }
    const handleHieuXeChange = (e) => {
        setMaHieuXe(e.target.value)
    }
    const handleDienThoaiChange = (e) => {
        setDienThoai(e.target.value)
    }
    const handleDateChange = (e) => {
        let _date = new Date(e.target.value)
        setNgayNhan(_date)
    }
    const handleSubmitg = () => {
        let _Car = {
            BienSo: BienSo,
            TenKH: TenKH,
            MaHieuXe: MaHieuXe,
            DienThoai: DienThoai,
            NgayNhan: NgayNhan
        }
        console.log(_Car)

        CarDataService.getAllCar(TenKH, BienSo, MaHieuXe, DienThoai, NgayNhan)
            .then((data) => {
                setCarList(data.data)
            })
    };
    useEffect(() => {
        CarsBrandDataService.getAllCarBrands(TenKH, BienSo, TenKH, BienSo, MaHieuXe, DienThoai, NgayNhan)
            .then((data) => {
                setHxeList(data.data)
            })
        CarDataService.getAllCar()
            .then((data) => {
                setCarList(data.data)
            })
    }, [])
    return (
        <div>
            <Container > 
                <Row>
                    <Col xs='12'>
                        <h2>
                            Tìm kiếm xe
                        </h2>
                        <Form  >
                            <Row >
                                <Form.Group as={Col}  >
                                    <Form.Label>Biển số xe</Form.Label>
                                    <Form.Control type="text" placeholder="Nhập biển số xe" onChange={handleBienSoChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="validationCustom04">
                                    <Form.Label>Hiệu xe</Form.Label>
                                    <Form.Control as="select" required style={{ maxHeight: '55px' }} onChange={handleHieuXeChange}>
                                        <option value={0}>
                                            Chọn hiệu xe
                                        </option>
                                        {HxeList.map((item) => <option value={item.MaHieuXe}>
                                            {item.TenHieuXe}
                                        </option>)}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3" as={Col} controlId="validationCustom04">
                                    <Form.Label>Ngày tiếp nhận</Form.Label>
                                    <Form.Control type="date" placeholder="Chọn ngày" onChange={handleDateChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" as={Col} controlId="validationCustom01">
                                    <Form.Label>Tên khách hàng</Form.Label>
                                    <Form.Control

                                        type="text"
                                        placeholder="Nhập tên khách hàng" onChange={handleTenKHChange}
                                    />

                                </Form.Group>
                                <Form.Group className="mb-3" as={Col} controlId="validationCustom02">
                                    <Form.Label>Số điện thoại</Form.Label>
                                    <Form.Control
                                        onChange={handleDienThoaiChange}
                                        type="tel" pattern="[0]{1}[0-9]{9}"
                                        placeholder="Nhập Số ĐT"
                                    />
                                </Form.Group>
                            </Row>

                        </Form>
                        <Button onClick={handleSubmitg} style={{ backgroundColor: '#0c828f', border: 'none',marginBottom:'10px' }} type="submit">Tìm kiếm</Button>

                    </Col>
                    <Col xs='12' className='CarBrandList-container' style={{margin:'0px ',}} >
                        <h2>
                            Danh sách xe
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
                            {CarList.map((item, key) => <Row style={{ textAlign: 'center', padding: '8xp 10px', lineHeight: '27px', borderBottom: 'black 0.5px solid' }}>
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
export default CarSearch;