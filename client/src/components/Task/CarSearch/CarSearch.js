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
import { format, setDate } from 'date-fns';
import viLocale from 'date-fns/locale/vi';
import LinearProgress from '@mui/material/LinearProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import PscDataService from "../../../services/PscDataService";
import PhieuThuDataService from "../../../services/PhieuThuDataService";
function formatDateToVN(date) {
    if (date===null) return
    let _date = new Date(date)
    return format(_date, 'dd/MM/yyyy', { locale: viLocale });
}
const CarSearch = () => {
    const [HxeList, setHxeList] = useState([])
    const [CarList, setCarList] = useState([])
    const [BienSo, setBienSo] = useState('')
    const [TenKH, setTenKH] = useState('')
    const [MaHieuXe, setMaHieuXe] = useState('')
    const [NgayNhan, setNgayNhan] = useState('')
    const [DienThoai, setDienThoai] = useState('')
    const [openCarDeltail, setopenCarDetail] = useState(false)
    const [CarOnDetail, setCarOnDetail] = useState(null)
    const [listPsc, setlistPsc] = useState([])
    const [listPthu, setlistPthu] = useState([])

    const handleBienSoChange = (e) => {
        setBienSo(e.target.value)
    }
    const handleTenKHChange = (e) => {
       setTenKH(e.target.value)
    }
    const handleHieuXeChange = (e) => {
        if (e.target.value==='0') setMaHieuXe('')
        else setMaHieuXe(e.target.value)
    }
    const handleDienThoaiChange = (e) => {
      setDienThoai(e.target.value)
    }
    const handleDateChange = (e) => {
        if (e.target.value){
            let _date = new Date(e.target.value)
        setNgayNhan(_date)
        console.log(e.target.value)
        
    }
        else setNgayNhan('')

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

        CarDataService.getAllCarFilter(BienSo, TenKH, DienThoai, MaHieuXe, NgayNhan)
            .then((data) => {
                setCarList(data.data)
            })
    };
    const handleRefresh = () => {
        window.location.reload()
    };
    const handleOpenDeltailCar = (_car) => {
        setCarOnDetail(_car)
        PscDataService.getctPSCbyMaXe(_car.MaXe)
            .then(data => {
                setlistPsc(data.data.sort((a, b) =>{ const dateA = new Date(a.NgaySC);
                const dateB = new Date(b.NgaySC);
                return dateB-dateA}))
            })
            PhieuThuDataService.getPhieuThuByMaXe(_car.MaXe)
            .then(data => {
                setlistPthu(data.data.sort((a, b) =>{ const dateA = new Date(a.NgayThu);
                const dateB = new Date(b.NgayThu);
                return dateB-dateA}))
            })
        setopenCarDetail(true)

        
    }
    useEffect(() => {
        CarsBrandDataService.getAllCarBrands()
            .then((data) => {
                setHxeList(data.data)
            })
            CarDataService.getAllCarFilter(BienSo, TenKH, DienThoai, MaHieuXe, NgayNhan)
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
                                            Tất cả hiệu xe
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
                        <Button onClick={handleRefresh} style={{ backgroundColor: '#0c828f', border: 'none',marginBottom:'10px',marginLeft:'20px' }} type="submit">Làm mới</Button>

                    </Col>
                    {CarList.length!==0?<Col xs='12' className='CarBrandList-container' style={{margin:'0px ',}} >
                        <h2>
                            Danh sách xe
                        </h2>
                        <Row style={{ textAlign: 'center', paddingBottom: '10px', fontWeight: '700', paddingRight: '25px' }}>
                            <Col xs='1' style={{ paddingRight: '5px' }}>
                                STT
                            </Col>
                            <Col >
                                Biển số
                            </Col>
                            <Col >
                                Hiệu xe
                            </Col><Col >
                                Tên khách hàng
                            </Col>
                            <Col x>
                                Số điện thoại
                            </Col>

                            <Col >
                                Tiền nợ
                            </Col>
                            <Col >
                                Ngày tiếp nhận
                            </Col>
                        </Row>
                        <div style={{ maxHeight: "500px", overflow: "hidden", overflowY: 'visible', paddingRight: '5px' }}>
                            {CarList.map((item, key) => <Row onDoubleClick={()=>handleOpenDeltailCar(item)} className="Carlist" style={{ textAlign: 'center', padding: '8xp 10px', lineHeight: '27px', borderBottom: 'black 0.5px solid' }}>
                                <Col xs='1' style={{ borderLeft: 'black 0.5px solid', paddingRight: '5px' }}>
                                    {key + 1}
                                </Col>
                                <Col style={{ borderLeft: 'black 0.5px solid' }}>
                                    {item.BienSo}
                                </Col><Col style={{ borderLeft: 'black 0.5px solid' }}>
                                    {item.HieuXe.TenHieuXe}
                                </Col>
                                <Col  style={{ borderLeft: 'black 0.5px solid' }}>
                                    {item.TenKH}
                                </Col>
                                <Col  style={{ borderLeft: 'black 0.5px solid' }}>
                                    {item.DienThoai}
                                </Col>
                                <Col  style={{ borderLeft: 'black 0.5px solid' }}>
                                    {item.TienNo.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                </Col>
                                <Col  style={{ borderLeft: 'black 0.5px solid' }}>
                                    {formatDateToVN(item.NgayNhan)}
                                </Col>
                            </Row>)}
                        </div>
                    </Col>:<Col xs='12'><LinearProgress color="success"/></Col>}
                </Row>
            </Container>
            <Dialog className='CarDetail' open={openCarDeltail} style={{ width: '100vw' }}>
            {CarOnDetail===null?<></>:<div style={{ textAlign: 'center' ,marginTop:'10px'}}>
                    <h1 style={{ color: '#0c828f' }}>Thông tin chi tiết xe của khách hàng {CarOnDetail.TenKH}</h1>
                    <h4 style={{ color: '#0c828f' }}>Biển số: {CarOnDetail.BienSo}</h4>
                    <Row style={{ textAlign: 'center',fontWeight:'600',color: '#0c828f'}}>
                        <Col>
                            Ngày tiếp nhận: {formatDateToVN(CarOnDetail.NgayNhan)}
                        </Col>
                        <Col>
                            Hiệu xe: {CarOnDetail.HieuXe.TenHieuXe}
                        </Col>
                        <Col>
                            Tiền nợ: {CarOnDetail.TienNo.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                        </Col>
                        <Col>
                            Số điện thoại: {CarOnDetail.DienThoai}
                        </Col>
                        <Col>
                            Địa chỉ: {CarOnDetail.DiaChi}
                        </Col>
                    </Row>
                </div>}
                <DialogContent>
            <p style={{fontWeight:"700",fontSize:'22px'}}>Lịch sử sửa chữa</p>

                    <Form.Group controlId="parts">
                        <Row style={{ textAlign: "center", fontWeight: "700" }}>
                            <Col md={2}>Ngày sửa</Col>
                            <Col>Tiền công</Col>
                            <Col>Phụ tùng</Col>
                            <Col md={2}>Thành tiền</Col>
                        </Row>
                        {listPsc.map((item) => (<>
                            <Row style={{
                                border: "solid 1px #ccc",
                                marginBottom: "12px",
                                borderRadius: "5px",
                                textAlign: "center"
                            }}>
                                <Col md={2}>
                                    <Form.Control
                                        as="text"
                                        placeholder="Ngày sửa"
                                        style={{ border: "none" }}
                                        readOnly
                                    >{formatDateToVN(item.NgaySC)}
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Form.Control
                                        as="text"
                                        name="name"
                                        readOnly
                                        style={{ border: "none" }}
                                    >
                                        {item.ctPhieuSuaChua.map(item2 =>
                                            <div>{item2.tiencong.MoTa}</div>
                                        )}
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Form.Control
                                        as="text"
                                        name="name"
                                        readOnly
                                        style={{ border: "none" }}
                                    >
                                        {(() => {
                                            const uniquePhuTung = [];
                                            const existsPhuTung = [];
                                            return item.ctPhutungSuaChua.map((item2) => {
                                                const phuTung = item2.phutung.TenPhuTung;
                                                if (!existsPhuTung.includes(phuTung)) {
                                                    existsPhuTung.push(phuTung);
                                                    uniquePhuTung.push(phuTung);
                                                }
                                            }).concat(uniquePhuTung.map((phuTung) => <div>{phuTung}</div>));
                                        })()}
                                    </Form.Control>

                                </Col>
                                <Col md={2}>
                                    <Form.Control
                                        as="text"
                                        placeholder="Thành tiền"
                                        style={{ border: "none" }}
                                        readOnly
                                    >
                                        {item.TongTien ? item.TongTien.toLocaleString('vi', { style: 'currency', currency: 'VND' }) : null}
                                    </Form.Control>
                                </Col>
                            </Row>
                        </>))}
                    </Form.Group>
                    <p style={{fontWeight:"700",fontSize:'22px'}}>Lịch sử thanh toán</p>
                    <Form.Group controlId="parts">
                        <Row style={{ textAlign: "center", fontWeight: "700" }}>
                            <Col >Số thứ tự</Col>
                            <Col>Ngày thu</Col>
                            <Col >Số tiền thu</Col>
                        </Row>
                        {listPthu.map((item,key) => (<>
                            <Row style={{
                                border: "solid 1px #ccc",
                                marginBottom: "12px",
                                borderRadius: "5px",
                                textAlign: "center"
                            }}>
                                <Col >
                                    <Form.Control
                                        as="text"
                                        placeholder="Ngày sửa"
                                        style={{ border: "none" }}
                                        readOnly
                                    >
                                        {key+1}
                                    </Form.Control>
                                </Col>
                                
                                <Col>
                                    <Form.Control
                                        as="text"
                                        name="name"
                                        readOnly
                                        style={{ border: "none" }}
                                    >
                                        
                                    </Form.Control>
                                {formatDateToVN(item.NgayThu)}
                                </Col>
                                <Col >
                                    <Form.Control
                                        as="text"
                                        placeholder="Thành tiền"
                                        style={{ border: "none" }}
                                        readOnly
                                    >
                                        {item.SoTienThu ? item.SoTienThu.toLocaleString('vi', { style: 'currency', currency: 'VND' }) : null}
                                    </Form.Control>
                                </Col>
                            </Row>
                        </>))}
                    </Form.Group>
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={() => setopenCarDetail(false)} style={{ backgroundColor: "rgb(12, 130, 143)", border: "none" }}>Đóng</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default CarSearch;