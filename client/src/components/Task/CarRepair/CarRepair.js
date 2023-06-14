import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { 
    Dialog, 
    DialogActions, 
    DialogTitle,
    DialogContent
} from '@mui/material';
import PhuTungDataService from '../../../services/PhuTungDataService';
import TienCongDataService from '../../../services/TienCongDataService';
import CarDataService from '../../../services/CarDataService';
import PscDataService from '../../../services/PscDataService';
import FullPageLoader from '../../FullPageLoader/FullPageLoader';
import { MdLibraryAdd, MdDeleteForever } from 'react-icons/md'
import numeral from 'numeral';
import viLocale from 'date-fns/locale/vi';
import { format } from 'date-fns';
function formatDateToYYYYMMDD(inputdate) {
    let date=new Date(inputdate)
    const year = date.getFullYear(); // Lấy năm
    let month = date.getMonth() + 1; // Lấy tháng (tháng được đếm từ 0)
    let day = date.getDate(); // Lấy ngày
  
    // Đảm bảo rằng tháng và ngày có hai chữ số bằng cách thêm '0' nếu cần thiết
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
  
    return `${year}-${month}-${day}`;
  }
function formatDateToVN(date) {
    let _date = new Date(date)
    return format(_date, 'dd/MM/yyyy', { locale: viLocale });
}
const RepairForm = () => {
    const [parts, setParts] = useState([{ MaVatTu: 0, name: "Chọn vật tư", quantity: 0, price: 0, total: 0 }]);
    const [labors, setLabors] = useState([{ MaTienCong: 0, nameLabor: "Chọn tiền công", priceLabor: 0}]);
    const [listPhuTung, setListPhuTung] = useState([]);
    const [minDate, setminDate] = useState(Date());

    const [listTienCong, setListTienCong] = useState([]);
    const [totalAmount , setTotalAmount] = useState('');
    const [validated, setValidated] = useState(false);
    const [reload , setReload] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openEdit, setOpenEdit] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openWarnBienSo, setopenWarnBienSo] = useState(false);

    const [showHistoryButton, setShowHistoryButton] = useState(false);
    const [listPSC, setListPSC] = useState([]);
    const [openHistory, setOpenHistory] = useState(false);

    const handleChangelicensePlate = (e) => { 
        CarDataService.getCarByBienSo(e.target.value)
        .then(data => {
            if (data.data.length)
                setminDate(data.data[0].NgayNhan)
            if(data.data.length === 1) {
                console.log("data.data.length: ", data.data.length)
                console.log("data.data[0].MaXe: ", data.data[0].MaXe)
                setShowHistoryButton(true)
                PscDataService.getctPSCbyMaXe(data.data[0].MaXe)
                .then(response => {
                    console.log("response.data: ", response.data)
                    setListPSC(response.data)
                })
            } else {
                setShowHistoryButton(false)
            }
        })
    }
    const handleOpenHistory = (event) => {
        setOpenHistory(true)
    }
    const handleCloseHistory = (event) => {
        setOpenHistory(false)
    }

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedParts = [...parts];
        updatedParts[index][name] = value;
        let arr = []
        
        if(name === "name") {
            if(value === '-1') {
                setOpenEdit(true)
                updatedParts[index].name = "Chọn vật tư";
                updatedParts[index].price = 0;
                updatedParts[index].total = 0;
                setParts(updatedParts)
                setReload(!reload)
                return;
            } else arr = updatedParts.filter(item => item.name === listPhuTung[value].TenPhuTung);
            
            if (arr.length){
                console.log('Vật tư đã có. ', arr.length, value)
                setOpenEdit(true)
                updatedParts[index].name = "Chọn vật tư";
                updatedParts[index].price = 0;
                updatedParts[index].total = 0;
                setParts(updatedParts)
                setReload(!reload)
                return;
            } else {
                updatedParts[index].MaPhuTung = listPhuTung[value].MaPhuTung;
                updatedParts[index].name = listPhuTung[value].TenPhuTung;
                updatedParts[index].price = listPhuTung[value].DonGia;
                updatedParts[index].total = updatedParts[index].price * updatedParts[index].quantity;
                setParts(updatedParts);
                setReload(!reload);
            }
        } 

        if(name === "quantity") {
            updatedParts[index].quantity = value;
            updatedParts[index].total = updatedParts[index].price * updatedParts[index].quantity;
            setParts(updatedParts);
            setReload(!reload);
        }
    };

    const handleLaborChange = (index, event) => {
        const { name, value } = event.target;
        const updatedLabors = [...labors];
        updatedLabors[index][name] = value;
        let arrLabor = []
        
        if(name === "nameLabor") {
            if(value === '-1') {
                setOpenEdit(true)
                updatedLabors[index].nameLabor = "Chọn tiền công";
                updatedLabors[index].priceLabor = null;
                setLabors(updatedLabors)
                setReload(!reload)
                return;
            } 
            else arrLabor = updatedLabors.filter(item => item.nameLabor === listTienCong[value].MoTa);

            if(arrLabor.length){
                console.log('Tiền công đã có', arrLabor.length, value)
                setOpenEdit(true)
                updatedLabors[index].nameLabor = "Chọn tiền công";
                updatedLabors[index].priceLabor = null;
                setLabors(updatedLabors)
                setReload(!reload)
                return;
            }
            else {
                updatedLabors[index].MaTienCong = listTienCong[value].MaTienCong;
                updatedLabors[index].nameLabor = listTienCong[value].MoTa;
                updatedLabors[index].priceLabor = listTienCong[value].TienCong;
                setLabors(updatedLabors);
                setReload(!reload);
            }
        } 

    };
    const handleAddPart = () => {
        setParts([...parts, { MaPhuTung: 0, name: "Chọn vật tư", quantity: 0 , price: null, total: 0 }]);
    };
    const handleAddLabor = () => {
        setLabors([...labors, { MaTienCong: 0, nameLabor: "Chọn tiền công", priceLabor: 0 }]);
    };
    const handleRemovePart = (index) => {
        const newParts = [...parts];
        if(newParts.length === 1) return;
        newParts.splice(index, 1);
        setParts(newParts);
        setReload(!reload)
    };
    const handleRemoveLabor = (index) => {
        const newLabors = [...labors];
        if(newLabors.length === 1) return;
        newLabors.splice(index, 1);
        setLabors(newLabors);
        setReload(!reload)
    };
    const handleCloseEdit = (e) => {
        setOpenEdit(false)
    }
    const handleCloseSuccess = (e) => {
        setOpenSuccess(false)
    }
    // Fetch data
    useEffect(() => {
        PhuTungDataService.getAllPhuTung()
        .then(response => {
            const phuTungList = response.data;
            console.log("Fetch: phuTungList: ",phuTungList);
            setListPhuTung(phuTungList);
        })
        .catch(error => {
            console.error('Error fetching parts:', error);
        });

        TienCongDataService.getAllTienCong()
        .then(response => {
            const tienCongList = response.data;
            console.log("Fetch: tienCongList: ",tienCongList);
            setListTienCong(tienCongList);
        })
        .catch(error => {
                console.error('Error fetching labors:', error);
        })
    }, []);
    // Tính tổng tiền
    useEffect(() => {
        let totalPriceParts = 0;
        let totalPriceLabors = 0;
        parts.map((part) => totalPriceParts += part.total);
        labors.map((labor) => totalPriceLabors += labor.priceLabor);
        const totalPrice = totalPriceParts + totalPriceLabors;
        setTotalAmount(totalPrice);
    }, [parts, labors, reload]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } 
        else {
            let check=true
            const licensePlate = event.target.elements.licensePlate.value;
            CarDataService.getCarByBienSo(licensePlate)
            .then((data) => {
                    console.log(data.data)
                    if (data.data.length===0) {
                        setopenWarnBienSo(true)
                    } else {
                        setIsLoading(true);
                        const repairDate = event.target.elements.repairDate.value;
                        const totalPrice = totalAmount;
                        const phieusuachua = {
                            MaXe:data.data[0].MaXe,
                            NgaySC: repairDate,
                            TongTien: totalPrice,
                            dsNoiDung: labors,
                            dsPhuTung: parts
                        };
                        console.log("phieusuachua: ", phieusuachua);
                        PscDataService.postPSC(phieusuachua)
                        .then((response) => {
                            if(response.status === 200) {
                                setIsLoading(false);
                                setOpenSuccess(true);
                                setTimeout(() => {
                                    //window.location.reload();
                                }, 1000);
                                console.log("Tạo phiếu sửa chữa thành công");
                            }
                            else {
                                setIsLoading(false);
                                console.log("Tạo phiếu sửa chữa thất bại");
                            }
                        }) 
                        .catch((err) => {
                            setIsLoading(false);
                            console.log("Lỗi: ", err);
                        }) 
                    }
                }
                
            )
        }
        setValidated(true);
    };

    return (<>
    <Container style={{width:"100%", margin:"0"}}>
        {isLoading && <FullPageLoader/>}
        <Row>
            <h2>Lập phiếu sửa chữa</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row style={{marginBottom:"20px"}}>
                    <Form.Group as={Col} controlId="licensePlate">
                        <Form.Label column>Biển số xe:</Form.Label>
                        {showHistoryButton && 
                        <Button variant="primary" 
                            style={{padding:"4px 8px", marginLeft:"12px", backgroundColor: '#0c828f', border: 'none'}} 
                            onClick={handleOpenHistory}
                            >Xem lịch sử
                        </Button>
                        }
                        <Form.Control type="text" name="licensePlate" onChange={handleChangelicensePlate} required />
                        <Form.Control.Feedback type="invalid">
                            Vui lòng nhập biển số xe
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="repairDate">
                        <Form.Label column>Ngày sửa chữa:</Form.Label>
                        <Form.Control type="date" name="repairDate" min={formatDateToYYYYMMDD(minDate)} required />
                        <Form.Control.Feedback type="invalid">
                            Vui lòng chọn ngày tiếp nhận
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                
                <Row style={{marginBottom:"20px"}}>
                        <Form.Group as={Col} md={5} controlId="labors">
                            <Form.Label column>Tiền công:</Form.Label>
                            <Button variant="primary" 
                                style={{padding:"4px 8px", marginLeft:"12px", backgroundColor: '#0c828f', border: 'none'}} 
                                onClick={handleAddLabor}>
                                    Thêm tiền công
                            </Button>
                            <Row>
                                <Col md='5'>
                                    Tên tiền công
                                </Col>
                                <Col md='4'>
                                    Giá
                                </Col>
                                <Col md='1'>
                                    Xóa
                                </Col>
                            </Row>
                            {labors.map((labor, index) => (<>
                            <Row style={{padding:"4px 0"}}>
                                {labor.nameLabor === 'Chọn tiền công' ?
                                <Col md={5}>
                                    <Form.Control
                                        value={labor.nameLabor}
                                        as="select"
                                        name="nameLabor"
                                        onChange={(event) => handleLaborChange(index, event)}
                                        required
                                    >
                                        <option value={-1} selected>Chọn tiền công</option>
                                        {listTienCong.map((tienCong, key) => 
                                            <option value={key}>{tienCong.MoTa}</option>
                                        )}
                                    </Form.Control>
                                </Col> :
                                <Col md={5}>
                                    <Form.Control
                                        as="select"
                                        name="nameLabor"
                                        onChange={(event) => handleLaborChange(index, event)}
                                        required
                                    >
                                        <option value={-1}>Chọn tiền công</option>
                                        {listTienCong.map((tienCong, key) => 
                                        labor.nameLabor === tienCong.MoTa ?
                                            <option value={key} selected>{tienCong.MoTa}</option>
                                        :   <option value={key}>{tienCong.MoTa}</option>
                                        )}
                                    </Form.Control>
                                </Col>
                                }
                                {labor.nameLabor === 'Chọn tiền công' ?
                                <Col md={4}>
                                    <Form.Control
                                        type="number"
                                        name="priceLabor"
                                        min = "1"
                                        placeholder="Giá"
                                        value={0}
                                        required
                                    />
                                </Col>
                                : <Col md={4}>
                                    <Form.Control
                                        type="text"
                                        name="priceLabor"
                                        min="1000"
                                        placeholder="Giá"
                                        value={labor.priceLabor ? labor.priceLabor.toLocaleString('vi', { style: 'currency', currency: 'VND' }) : labor.priceLabor}
                                        required
                                    />
                                </Col>
                                }
                                <Col md={1} style={{width:"80px", maxWidth:"100px"}}>
                                    <MdDeleteForever variant="danger" className='CarBrand-detele-btn' style={{ fontSize: '44px', marginTop: '-4px' }} onClick={() => handleRemoveLabor(index)}>Xóa</MdDeleteForever>
                                </Col>
                            </Row>
                            </>))}
                        </Form.Group>
                    
                        <Form.Group controlId="parts" as={Col}>
                            <Form.Label>Vật tư phụ tùng:</Form.Label>
                            <Button variant="primary" 
                                style={{padding:"4px 8px", marginLeft:"12px",backgroundColor: '#0c828f', border: 'none' }} 
                                onClick={handleAddPart}>
                                    Thêm vật tư phụ tùng
                            </Button>
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
                            <Row style={{padding:"4px 0"}}>
                                {part.name === 'Chọn vật tư' ?
                                <Col md={3}>
                                    <Form.Control
                                        value={part.name}
                                        as="select"
                                        name="name"
                                        onChange={(event) => handleInputChange(index, event)}
                                        required
                                    >
                                        <option value={-1} selected>Chọn vật tư</option>
                                        {listPhuTung.map((phuTung, key) =>
                                           <option value={key}>{phuTung.TenPhuTung}</option>
                                        )}
                                    </Form.Control>
                                </Col> : 
                                <Col md={3}>
                                    <Form.Control
                                        as="select"
                                        name="name"
                                        onChange={(event) => handleInputChange(index, event)}
                                        required
                                    >
                                        <option value={-1}>Chọn vật tư</option>
                                        {listPhuTung.map((phuTung, key) =>
                                        part.name === phuTung.TenPhuTung ?
                                            <option value={key} selected>{phuTung.TenPhuTung}</option>
                                        :   <option value={key}>{phuTung.TenPhuTung}</option>
                                        )}
                                    </Form.Control>
                                </Col>
                                }
                                {part.name === 'Chọn vật tư' ?
                                <Col md={2}>
                                    <Form.Control
                                        type="number"
                                        name="quantity"
                                        placeholder="Số lượng"
                                        min="1"
                                        value={0}
                                        required
                                        />
                                </Col> :
                                <Col md={2}>
                                    <Form.Control
                                        type="number"
                                        name="quantity"
                                        placeholder="Số lượng"
                                        min="1"
                                        value={part.quantity}
                                        onChange={(event) => handleInputChange(index, event)}
                                        required
                                        />
                                </Col>
                                }
                                {part.name === 'Chọn vật tư' ?
                                <Col md={3}>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        min="0"
                                        max="0"
                                        placeholder="Đơn giá"
                                        value={0}
                                        required
                                    />
                                </Col>
                                : <Col md={3}>
                                    <Form.Control
                                        type="text"
                                        name="price"
                                        min="1000"
                                        placeholder="Đơn giá"
                                        value={part.price ? part.price.toLocaleString('vi', { style: 'currency', currency: 'VND' }) : part.price}
                                        required
                                    />
                                </Col>
                                }
                                <Col md={3}>
                                    <Form.Control
                                        type="text"
                                        name="total"
                                        placeholder="Thành tiền"
                                        // value={(part.total)}
                                        value={part.total ? part.total.toLocaleString('vi', { style: 'currency', currency: 'VND' }) : null}
                                        required
                                    />
                                </Col>
                                <Col md={1}>
                                    <MdDeleteForever variant="danger" className='CarBrand-detele-btn' style={{ fontSize: '44px', marginTop: '-4px' }} onClick={() => handleRemovePart(index)}>Xóa</MdDeleteForever>
                                </Col>
                            </Row>
                            </>))}
                        </Form.Group>
                </Row>

                <Form.Group as={Col} controlId="totalAmount" style={{marginBottom:"20px"}}>
                    <Form.Label>Tổng tiền:</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="totalAmount" 
                        value={numeral(totalAmount).format('0,0')} 
                    />
                </Form.Group>

                <Button type="submit" style={{width:"100px", backgroundColor: '#0c828f', border: 'none'}}>Tạo</Button>
            </Form>
        </Row>
    </Container>
    
    <Dialog className='Warn' open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle >{"Loại này đã được chọn!"}</DialogTitle>
        <DialogActions>
            <Button style={{ backgroundColor: '#0c828f', border: 'none' }} onClick={handleCloseEdit}>OK</Button>
        </DialogActions>
    </Dialog>

    <Dialog className='WarnBienSo' open={openWarnBienSo} >
        <DialogTitle >{"Vui lòng nhập đúng biển số!"}</DialogTitle>
        <DialogActions>
            <Button style={{ backgroundColor: '#0c828f', border: 'none' }} onClick={()=>setopenWarnBienSo(false)}>OK</Button>
        </DialogActions>
    </Dialog>

    <Dialog className='Success' open={openSuccess} onClose={handleCloseSuccess}>
        <DialogTitle >{"Tạo phiếu sửa chữa thành công!"}</DialogTitle>
        <DialogActions>
            <Button style={{ backgroundColor: '#0c828f', border: 'none' }} onClick={handleCloseSuccess}>OK</Button>
        </DialogActions>
    </Dialog>

    <Dialog className='history' open={openHistory} onClose={handleCloseHistory} style={{ width: '100vw' }}>
        <DialogTitle style={{fontWeight:"bolder"}}>{"Lịch sử sửa chữa"}</DialogTitle>
        <DialogContent>
            <Form.Group controlId="parts">
                <Row style={{textAlign:"center", fontWeight:"700"}}>
                    <Col md={2}>Ngày sửa</Col>
                    <Col>Tiền công</Col>
                    <Col>Phụ tùng</Col>
                    <Col md={2}>Thành tiền</Col>
                </Row>
                {listPSC.map((item) => (<>
                    <Row style={{border:"solid 1px #ccc", 
                                marginBottom:"12px", 
                                borderRadius:"5px",
                                textAlign:"center"}}>
                        <Col md={2}>
                            <Form.Control
                                as="text"
                                placeholder="Ngày sửa"
                                style={{border:"none"}}
                                readOnly
                            >
                                {formatDateToVN(item.NgaySC)}
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Control
                                as="text"
                                name="name"
                                readOnly
                                style={{border:"none"}}
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
                                style={{border:"none"}}
                                readOnly
                            >
                                {item.TongTien ? item.TongTien.toLocaleString('vi', { style: 'currency', currency: 'VND' }) : null}
                            </Form.Control>
                        </Col>
                    </Row>
                    </>))}
            </Form.Group>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseHistory} style={{backgroundColor:"rgb(12, 130, 143)", border:"none"}}>Đóng</Button>
        </DialogActions>
    </Dialog>
    </>);
};

export default RepairForm;
