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
    let _date=new Date(date)
    return format(_date, 'dd/MM/yyyy', { locale: viLocale });
  }
const CarReceive = () => {
    const [HxeList,setHxeList]=useState([])
    const [CarList,setCarList]=useState([])

    const [BienSo,setBienSo]=useState([])
    const [TenKH,setTenKH]=useState('')
    const [MaHieuXe,setMaHieuXe]=useState(0)
    const [NgayNhan,setNgayNhan]=useState(Date)

    const [DienThoai,setDienThoai]=useState([])
    const [DiaChi,setDiaChi]=useState([])

    const [validated, setValidated] = useState(false);
    const handleBienSoChange =(e)=>{
        setBienSo(e.target.value)
    }
    const handleTenKHChange =(e)=>{
        setTenKH(e.target.value)
        
    }
    const handleHieuXeChange =(e)=>{
        setMaHieuXe(e.target.value)
    }
    const handleDienThoaiChange =(e)=>{
        setDienThoai(e.target.value)
        
    }
    const handleDiaChiChange =(e)=>{
        setDiaChi(e.target.value)
        
    }
    const handleDateChange =(e)=>{
        let _date=new Date(e.target.value)
        setNgayNhan(_date)
    }
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            let _Car={
                BienSo:BienSo,
                TenKH:TenKH,
                MaHieuXe:MaHieuXe,
                DiaChi:DiaChi,
                DienThoai:DienThoai,
                NgayNhan:NgayNhan
            }

            console.log(_Car)

        }
        else {
            let _Car={
                BienSo:BienSo,
                TenKH:TenKH,
                MaHieuXe:MaHieuXe,
                DiaChi:DiaChi,
                DienThoai:DienThoai,
                NgayNhan:NgayNhan
            }
            console.log(_Car)
            CarDataService.createCar(_Car)
        }
        setValidated(true);
    };
    useEffect(()=>{
        CarsBrandDataService.getAllCarBrands()
        .then((data)=>{
            setHxeList(data.data)
        })
        CarDataService.getAllCar()
        .then((data)=>{
            setCarList(data.data)
        })
    },[])
    return (
        <div>
            <Container>
                <Row>
                    <Col xs='4'>
                        <h2>
                            Tiếp nhận xe
                        </h2>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group   validated={validated} as={Col} md="7" controlId="validationCustom01">
                                    <Form.Label>Tên khách hàng</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Nhập tên khách hàng" onChange={handleTenKHChange}
                                    />
                                      <Form.Control.Feedback type="invalid">
                                        Vui lòng nhập tên khách hàng
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group  as={Col} md="5" controlId="validationCustom02">
                                    <Form.Label>Số điện thoại</Form.Label>
                                        <Form.Control
                                        required onChange={handleDienThoaiChange}
                                        type="tel" pattern="[0]{1}[0-9]{9}"
                                            placeholder="Nhập Số ĐT"
                                        />
                                          <Form.Control.Feedback type="invalid">
                                        Vui lòng nhập đủ 10 số
                                    </Form.Control.Feedback>
                                  
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" >
                                    <Form.Label>Biển số xe</Form.Label>
                                    <Form.Control type="text" placeholder="Nhập biển số xe" onChange={handleBienSoChange} required />
                                    <Form.Control.Feedback type="invalid">
                                        Vui lòng nhập biển số
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationCustom04">
                                    <Form.Label>Hiệu xe</Form.Label>
                                    <Form.Control as="select" required style={{maxHeight:'55px'}} onChange={handleHieuXeChange}>
                                        {HxeList.map((item)=><option value={item.MaHieuXe}>
                                            {item.TenHieuXe}
                                        </option>)}
                                      
                                    </Form.Control>
                                    
                                </Form.Group>

                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationCustom03">
                                    <Form.Label>Địa chỉ</Form.Label>
                                    <Form.Control type="text" placeholder="Nhập địa chỉ" onChange={handleDiaChiChange} required />
                                    <Form.Control.Feedback type="invalid">
                                        Vui lòng nhập địa chỉ
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationCustom04">
                                    <Form.Label>Ngày tiếp nhận</Form.Label>
                                    <Form.Control type="date"  placeholder="Chọn ngày" onChange={handleDateChange} name="begin" required />
                                    <Form.Control.Feedback type="invalid">
                                        Vui lòng chọn ngày tiếp nhận
                                    </Form.Control.Feedback>
                                </Form.Group>

                            </Row>
                            
                            <Button style={{backgroundColor:'#0c828f' ,border:'none'}} type="submit">Lập phiếu tiếp nhận</Button>
                        </Form>
                    </Col>
                    <Col xs='8'>
                        <h2>
                            Danh sách xe tiếp nhận
                        </h2>
                        <Row style={{ textAlign: 'center', paddingBottom: '10px', fontWeight: '700', paddingRight: '22px' }}>
          <Col xs='1' style={{ paddingRight: '5px' }}>
            STT
          </Col>
          <Col xs='2'>
            Biển số
          </Col>
          <Col xs='2'>
            Hiệu xe
          </Col><Col xs='3'>
            Tên khách hàng
          </Col>
          

          <Col xs='2'>
            Số điện thoại
          </Col>
          <Col xs='2'>
            Ngày nhận
          </Col>
        </Row>
        <div style={{ maxHeight: "500px", overflow: "hidden", overflowY: 'visible', paddingRight: '5px' }}>
          {CarList.map((item,key)=><Row style={{ textAlign: 'center', padding: '8xp 10px', lineHeight: '27px', borderBottom: 'black 0.5px solid' }}>
            <Col xs='1' style={{ borderLeft: 'black 0.5px solid', paddingRight: '5px' }}>
              {key+1}
            </Col>
            <Col xs='2' style={{ borderLeft: 'black 0.5px solid' }}>
              {item.BienSo}
            </Col><Col xs='2' style={{ borderLeft: 'black 0.5px solid' }}>
            {item.HieuXe}
            </Col>
            <Col xs='3' style={{ borderLeft: 'black 0.5px solid' }}>
            {item.TenKH}

            </Col>
            <Col xs='2' style={{ borderLeft: 'black 0.5px solid' }}>
            {item.DienThoai}

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
export default CarReceive;