import React, { useEffect } from "react";
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import { MdCreateNewFolder } from 'react-icons/md'
import Row from "react-bootstrap/esm/Row";
import Form from 'react-bootstrap/esm/Form'
import Button from "react-bootstrap/Button";
import CarDataService from "../../../services/CarDataService";
import PhieuThuDataService from "../../../services/PhieuThuDataService";
import ParaDataService from "../../../services/ParaDataService";
import { format } from 'date-fns';
import viLocale from 'date-fns/locale/vi';
import PscDataService from "../../../services/PscDataService";
import './CarCheckout.css'
function formatDateToVN(date) {
    if (date===null) return
    let _date = new Date(date)
    return format(_date, 'dd/MM/yyyy', { locale: viLocale });
}
function formatDateToYYYYMMDD(inputdate) {
    let date = new Date(inputdate)
    const year = date.getFullYear(); // Lấy năm
    let month = date.getMonth() + 1; // Lấy tháng (tháng được đếm từ 0)
    let day = date.getDate(); // Lấy ngày

    // Đảm bảo rằng tháng và ngày có hai chữ số bằng cách thêm '0' nếu cần thiết
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${year}-${month}-${day}`;
}
const CarCheckout = () => {
    let existsPhuTung = [];
    const [minDate, setminDate] = useState(Date());
    const [Car, setCar] = useState([])
    const [Para, setPara] = useState({})
    const [openCarDeltail, setopenCarDetail] = useState(false)
    const [CarOnDetail, setCarOnDetail] = useState(null)

    const [openWarnBienSo, setOpenWarnBienSo] = useState(0)
    const [openWarnTienThu, setOpenWarnTienThu] = useState(0)

    const [openSuccess, setOpenSuccess] = useState(0)
    const [BienSo, setBienSo] = useState([])
    const [TienThu, setTienThu] = useState([])
    const [listPsc, setlistPsc] = useState([])
    const [listPthu, setlistPthu] = useState([])

    const [NgayNhan, setNgayNhan] = useState(Date)
    const [validated, setValidated] = useState(false);


    const handleCloseWarnBienSo = () => {
        setOpenWarnBienSo(false)

    }
    const handleCloseWarnTienThu = () => {
        setOpenWarnTienThu(false)
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
            if (Car.length !== 1) {
                event.preventDefault();
                event.stopPropagation();
                setOpenWarnBienSo(true)
                return
            }
            if (Para.KiemTraTienThu && TienThu > Car[0].TienNo) {
                setOpenWarnTienThu(true)
                return
            }
            //setOpenSuccess(true)
            setTimeout(() => {
                window.location.reload()
            }, 700);
            let _PhieuThu = {
                NgayThu: NgayNhan,
                SoTienThu: TienThu,
                MaXe: Car[0].MaXe
            }
            console.log('phieuthu:', _PhieuThu)
            PhieuThuDataService.createPhieuThu(_PhieuThu)
        }
        setValidated(true);
    };
    const handleBienSoChange = (e) => {
        let car = {}
        setBienSo(e.target.value)
        CarDataService.getCarByBienSo(e.target.value)
            .then(data => {
                if (data.data.length === 0)
                    return
                car = data.data[0]
            })
        PscDataService.getPSC()
            .then(data => {
                let arr = data.data.filter(item => item.MaXe === car.MaXe)
                if (arr.length === 0) return;
                let ngayGanNhat = arr[0].NgaySC; // Giả sử ngày đầu tiên là ngày gần nhất
                let doiTuongGanNhat = arr[0];
                console.log('dd', arr)
                for (let i = 1; i < arr.length; i++) {
                    if (arr[i].NgaySC > ngayGanNhat) {
                        ngayGanNhat = arr[i].NgaySC;
                        doiTuongGanNhat = arr[i];
                    }
                }
                setminDate(ngayGanNhat)
            })
    }
    const handleTienThuChange = (e) => {
        setTienThu(e.target.value)
    }
    const handleDateChange = (e) => {
        let _date = new Date(e.target.value)
        setNgayNhan(_date)
    }
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
        CarDataService.getCarByBienSo(BienSo)
            .then((data) => {
                setCar(data.data)
            })
        ParaDataService.getPara()
            .then((data) => {
                setPara(data.data[0])
            })

    }, [])
    useEffect(() => {
        CarDataService.getCarByBienSo(BienSo)
            .then((data) => {
                setCar(data.data)
            })

    }, [BienSo])
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
                                    <Form.Control type="text" placeholder="Nhập biển số xe" onChange={handleBienSoChange} required />
                                    <Form.Control.Feedback type="invalid">
                                        Vui lòng nhập biển số
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} xs='2'>
                                    <Form.Label>Số tiền thu:</Form.Label>
                                    <Form.Control type="number" min="10000" step="500" placeholder="Nhập số tiền" onChange={handleTienThuChange} required />
                                    <Form.Control.Feedback type="invalid">
                                        Vui lòng nhập số tiền thu
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} xs='2' className="mb-3" controlId="validationCustom04">
                                    <Form.Label>Ngày thu tiền</Form.Label>
                                    <Form.Control type="date" placeholder="Chọn ngày" min={formatDateToYYYYMMDD(minDate)} onChange={handleDateChange} required />
                                    <Form.Control.Feedback type="invalid">
                                        Vui lòng chọn ngày thu tiền
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} xs='2' className="mb-3" controlId="validationCustom04">
                                    <Button type='submit' style={{ backgroundColor: '#0c828f', border: 'none', marginTop: '33px', marginBottom: '10px' }} >
                                        Lập phiếu thu
                                        <MdCreateNewFolder style={{ fontSize: "20px", marginLeft: '6px' }} />
                                    </Button>

                                </Form.Group>
                            </Row>
                        </Form>

                    </Col>
                    <Col xs='12' className='CarBrandList-container mt-3' style={{ margin: '0px ', }} >
                        <h2>
                            Thông tin xe
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
                            <Col>
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
                            {Car.length === 0 ? <p>Không tìm thấy xe phù hợp</p> : Car.map((item, key) => <Row onDoubleClick={() => handleOpenDeltailCar(item)} className="Carlist" style={{ textAlign: 'center', padding: '8xp 10px', lineHeight: '27px', borderBottom: 'black 0.5px solid' }}>
                                <Col xs='1' style={{ borderLeft: 'black 0.5px solid', paddingRight: '5px' }}>
                                    {key + 1}
                                </Col>
                                <Col style={{ borderLeft: 'black 0.5px solid' }}>
                                    {item.BienSo}
                                </Col><Col style={{ borderLeft: 'black 0.5px solid' }}>
                                    {item.HieuXe.TenHieuXe}
                                </Col>
                                <Col style={{ borderLeft: 'black 0.5px solid' }}>
                                    {item.TenKH}
                                </Col>
                                <Col style={{ borderLeft: 'black 0.5px solid' }}>
                                    {item.DienThoai}
                                </Col>
                                <Col style={{ borderLeft: 'black 0.5px solid' }}>
                                    {item.TienNo.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                </Col>

                                <Col style={{ borderLeft: 'black 0.5px solid' }}>
                                    {formatDateToVN(item.NgayNhan)}
                                </Col>
                            </Row>)}

                        </div>
                    </Col>
                </Row>
            </Container>
            <Dialog className='WarnBienSo'
                open={openWarnBienSo}
                onClose={handleCloseWarnBienSo}
            >
                <DialogTitle >
                    {"Vui lòng nhập đúng biển số!"}
                </DialogTitle>
                <DialogActions>
                    <Button style={{ backgroundColor: '#0c828f', border: 'none' }} onClick={handleCloseWarnBienSo}>OK</Button>
                </DialogActions>
            </Dialog>
            <Dialog className='WarnTienThu'
                open={openWarnTienThu}
                onClose={handleCloseWarnTienThu}
            >
                <DialogTitle >
                    {"Tiền thu vượt quá tiền nợ!"}
                </DialogTitle>
                <DialogActions>
                    <Button style={{ backgroundColor: '#0c828f', border: 'none' }} onClick={handleCloseWarnTienThu}>OK</Button>
                </DialogActions>
            </Dialog>
            <Dialog className='Success'
                open={openSuccess}
            >
                <DialogTitle >
                    {"Lập phiếu thu thành công! Vui lòng chờ xử lý."}
                </DialogTitle>
                <DialogActions>
                </DialogActions>
            </Dialog>

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
                                        {item.ctPhutungSuaChua.map((item2) => {
                                            if (existsPhuTung.includes(item2.phutung.TenPhuTung)) {
                                                return null;
                                            } else {
                                                existsPhuTung.push(item2.phutung.TenPhuTung);
                                                return <div>{item2.phutung.TenPhuTung}</div>;
                                            }
                                        })}
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
export default CarCheckout;