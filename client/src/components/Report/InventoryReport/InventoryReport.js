import React, { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from 'react-bootstrap/esm/Form'
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/esm/FormGroup";
import { TbReportSearch } from 'react-icons/tb'
import CarDataService from "../../../services/CarDataService";
import { format } from 'date-fns';
import viLocale from 'date-fns/locale/vi';
function formatDateToVN(date) {
    let _date = new Date(date)
    return format(_date, 'MM/yyyy', { locale: viLocale });
}
export default function InventoryReport() {
    const [maxMonth, setMaxMonth] = useState(getCurrentMonth());
    
    const [Car, setCar] = useState([]);
    const [Month, setMonth] = useState(Date);
    function getCurrentMonth() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
        return `${currentYear}-${currentMonth < 10 ? "0" + currentMonth : currentMonth}`;
    }
    const [validated, setValidated] = useState(false);

    const handleDateChange = e => {
        if (e.target.value){
            setMonth(e.target.value)
            return
        }
    }
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {

            event.preventDefault();
            event.stopPropagation();
            
        }
        setValidated(true);
    };
    useEffect(() => {
        CarDataService.getAllCar()
            .then((data) => {
                setCar(data.data)
            })
    }, [])
    return (<div>
        <Container>
            <h2>Nhập thông tin</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="2" controlId="validationCustom04">
                        <Form.Label>Chọn tháng báo cáo tồn</Form.Label>
                        <Form.Control type="month" placeholder="Chọn ngày" min="2023-03" max={maxMonth} onChange={handleDateChange} required />
                        <Form.Control.Feedback type="invalid">
                            Vui lòng chọn tháng báo cáo
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="2" controlId="validationCustom03">
                        <Button type='submit' style={{ backgroundColor: '#0c828f', border: 'none', marginTop: '33px', marginBottom: '10px' }} >
                            Xem báo cáo
                            <TbReportSearch style={{ fontSize: "20px", marginLeft: '6px' }} />
                        </Button>
                    </Form.Group>

                </Row>

            </Form>
           
            <Col xs='12' className='CarBrandList-container mt-3' style={{ margin: '0px ', }} >

                <div style={{ textAlign: 'center',marginBottom:'20px' }}>
                    <h1 style={{ color:'#0c828f' }}>Báo cáo tồn kho</h1>
                    <h4 style={{ color:'#0c828f' }}>Tháng {formatDateToVN(Month)}</h4>
                </div>
                <Row style={{ textAlign: 'center', paddingBottom: '10px', fontWeight: '700', paddingRight: '6px' }}>
                    <Col xs='1' style={{ paddingRight: '5px' }}>
                        STT
                    </Col>
                    <Col >
                        Vật tư phụ tùng
                    </Col><Col >
                        Tồn đầu 
                    </Col>
                    <Col >
                        Phát sinh
                    </Col>

                    <Col >
                        Tồn cuối
                    </Col>

                </Row>
                <div style={{ maxHeight: "500px", overflow: "hidden", overflowY: 'visible', paddingRight: '5px' }}>
                    {Car.length === 0 ? <p>Không tìm thấy xe phù hợp</p> : Car.map((item, key) => <Row style={{ textAlign: 'center', padding: '8xp 10px', lineHeight: '27px', borderBottom: 'black 0.5px solid' }}>
                        <Col xs='1' style={{ borderLeft: 'black 0.5px solid', paddingRight: '5px' }}>
                            {key + 1}
                        </Col>
                        <Col style={{ borderLeft: 'black 0.5px solid' }}>
                            {item.HieuXe.TenHieuXe}
                        </Col>
                        <Col  style={{ borderLeft: 'black 0.5px solid' }}>
                            {item.TenKH}
                        </Col>
                        
                        <Col  style={{ borderLeft: 'black 0.5px solid' }}>
                            {item.TienNo.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                        </Col>

                        <Col  style={{ borderLeft: 'black 0.5px solid' }}>
                            {formatDateToVN(item.NgayNhan)}
                        </Col>
                    </Row>)}

                </div>
            </Col>
        </Container>
    </div>)
}