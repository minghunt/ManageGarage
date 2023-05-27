import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import PhuTungDataService from '../../../services/PhuTungDataService';
import TienCongDataService from '../../../services/TienCongDataService';
import PscDataService from '../../../services/PscDataService';
import numeral from 'numeral';

const RepairForm = () => {
    const [parts, setParts] = useState([{ name: null, quantity: 1, price: null, total: null }]);
    const [labors, setLabors] = useState([{ nameLabor: null, priceLabor: null}]);
    const [listPhuTung, setListPhuTung] = useState([]);
    const [listTienCong, setListTienCong] = useState([]);
    const [totalAmount , setTotalAmount] = useState('');
    const [validated, setValidated] = useState(false);
    const [reload , setReload] = useState(false);


    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedParts = [...parts];
        updatedParts[index][name] = value;
        
        if(name === "name") {
            updatedParts[index].name = listPhuTung[value].TenPhuTung;
            updatedParts[index].price = listPhuTung[value].DonGia;
        } else {
            updatedParts[index][name] = value;
        }
        updatedParts[index].total = updatedParts[index].price * updatedParts[index].quantity;

        const totalPrice = updatedParts.reduce((acc, part) => acc + part.total, 0);
        setTotalAmount(totalPrice);

        console.log("updatedParts[index]: ",updatedParts[index]);
        console.log("name: ",name);
        console.log("value: ",value);
        console.log("updatedParts: ",updatedParts);
        console.log("totalAmount: ",totalAmount);

        setParts(updatedParts);
        setReload(!reload);
    };

    const handleLaborChange = (index, event) => {
        const { name, value } = event.target;
        const updatedLabors = [...labors];
        updatedLabors[index][name] = value;
        console.log("name: ",name);
        console.log("value: ",value);
        
        updatedLabors[index].priceLabor = listTienCong[value].TienCong;

        const totalPrice = updatedLabors.reduce((acc, labor) => acc + labor.priceLabor, 0);
        setTotalAmount(totalPrice);

        console.log("updatedLabors[index].priceLabor: ",updatedLabors[index].priceLabor);
        console.log("updatedLabors[index].priceLabor is Number? ", isNaN(updatedLabors[index].priceLabor));

        setLabors(updatedLabors);
        setReload(!reload);
        console.log("updatedLabors: ",updatedLabors);
    };
    const handleAddPart = () => {
        setParts([...parts, { name: null, quantity: 1 , price: null, total: null }]);
    };
    const handleAddLabor = () => {
        setLabors([...labors, { nameLabor: null, priceLabor: null }]);
    };
    const handleRemovePart = (index) => {
        const newParts = [...parts];
        newParts.splice(index, 1);
        setParts(newParts);
    };
    const handleRemoveLabor = (index) => {
        const newLabors = [...labors];
        newLabors.splice(index, 1);
        setLabors(newLabors);
    };

    useEffect(() => {
        const fetchPhuTung = async () => {
            try {
                const response = await PhuTungDataService.getAllPhuTung();
                const phuTungList = response.data;
                console.log("phuTungList; ",phuTungList);
                setListPhuTung(phuTungList);
            } catch (error) {
                console.error('Error fetching parts:', error);
            }
        };
        fetchPhuTung();
    }, []);
    useEffect(() => {
        const fetchTienCong = async () => {
            try {
                const response = await TienCongDataService.getAllTienCong();
                const tienCongList = response.data;
                console.log("tienCongList; ",tienCongList);
                setListTienCong(tienCongList);
            } catch (error) {
                console.error('Error fetching labors:', error);
            }
        };
        fetchTienCong();
    }, []);
    useEffect(() => {
        const totalPriceParts = parts.reduce((acc, part) => acc + part.total, 0);
        const totalPriceLabors = labors.reduce((acc, labor) => acc + labor.priceLabor, 0);
        const totalPrice = totalPriceParts + totalPriceLabors;
        setTotalAmount(totalPrice);
    }, [parts, labors]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setValidated(true);

        // Tạo các biến để lưu thông tin từ các trường input
        const licensePlate = event.target.elements.licensePlate.value;
        const repairDate = event.target.elements.repairDate.value;
        const totalPrice = totalAmount;
        
        // Tạo đối tượng noidung
        const noidung = labors.map((labor) => {
            return {
                noidung: labor.nameLabor,
                MaPSC: '', // Chưa có thông tin MaPSC
                MaTC: listTienCong.find((tc) => tc.MoTa === labor.nameLabor)?.MaTC || '', // Tìm MaTC dựa trên MoTa
            };
        });
        // Tạo đối tượng tiencong
        const tiencong = labors.map((labor) => {
            return {
                MoTa: labor.nameLabor,
                TienCong: labor.priceLabor,
            };
        });
        // Tạo đối tượng ct_phieusuachua
        const ct_phieusuachua = parts.map((part) => {
            return {
                MaCTPSC: '', // Chưa có thông tin MaCTPSC
                SoLuong: part.quantity,
                ThanhTien: part.total,
                MaPhuTung: listPhuTung.find((pt) => pt.TenPhuTung === part.name)?.MaPhuTung || '', // Tìm MaPhuTung dựa trên TenPhuTung
                MaND: '', // Chưa có thông tin MaND
            };
        });

        // Tạo đối tượng phieusuachua
        const phieusuachua = {
            MaXe: licensePlate,
            NgaySC: repairDate,
            TongTien: totalPrice,
            NoiDung: noidung,
            TienCong: tiencong,
            CT_PSC: ct_phieusuachua
        };
        console.log("phieusuachua: ", phieusuachua);
        PscDataService.postPSC(phieusuachua)
            
    };

    return (
    <Container style={{width:"100%", margin:"0"}}>
        <Row>
            <h2>Lập phiếu sửa chữa</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row style={{marginBottom:"4px"}}>
                    <Form.Group as={Col} controlId="licensePlate">
                        <Form.Label column>Biển số xe:</Form.Label>
                        <Form.Control type="text" name="licensePlate" required />
                        <Form.Control.Feedback type="invalid">
                            Vui lòng nhập biển số xe
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="repairDate">
                        <Form.Label column>Ngày sửa chữa:</Form.Label>
                        <Form.Control type="date" name="repairDate" required />
                        <Form.Control.Feedback type="invalid">
                            Vui lòng chọn ngày tiếp nhận
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                
                <Row>
                    <Row>
                        <Form.Group as={Col} md={5} controlId="laborContent">
                            <Form.Label column>Tiền công:</Form.Label>
                            <Button variant="primary" 
                                style={{padding:"4px 8px", marginLeft:"12px"}} 
                                onClick={handleAddLabor}>
                                    Thêm tiền công
                            </Button>
                            {labors.map((labor, index) => (<>
                            <Row style={{padding:"4px 0"}}>
                                <Col md={5}>
                                    <Form.Control
                                        as="select"
                                        name="nameLabor"
                                        value={labor.name}
                                        onChange={(event) => handleLaborChange(index, event)}
                                        required
                                    >
                                        {listTienCong.map((tienCong, key) => 
                                        labor.nameLabor === tienCong.MoTa ?
                                            <option value={key} selected>
                                                {tienCong.MoTa}
                                            </option>
                                        :   <option value={key}>
                                                {tienCong.MoTa}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        type="text"
                                        name="priceLabor"
                                        placeholder="Giá"
                                        value={labor.priceLabor}
                                        readOnly
                                        required
                                    />
                                </Col>
                                <Col md={2} style={{width:"80px", maxWidth:"100px"}}>
                                    <Button variant="danger" onClick={() => handleRemoveLabor(index)}>Xóa</Button>
                                </Col>
                            </Row>
                            </>))}
                        </Form.Group>
                    
                        <Form.Group controlId="parts" as={Col} style={{marginBottom:"20px"}}>
                            <Form.Label>Vật tư phụ tùng:</Form.Label>
                            <Button variant="primary" 
                                style={{padding:"4px 8px", marginLeft:"12px"}} 
                                onClick={handleAddPart}>
                                    Thêm vật tư phụ tùng
                            </Button>
                            
                            {parts.map((part, index) => (<>
                            <Row key={index} style={{padding:"4px 0"}}>
                                <Col md={3}>
                                    <Form.Control
                                        as="select"
                                        name="name"
                                        onChange={(event) => handleInputChange(index, event)}
                                        required
                                    >
                                        {listPhuTung.map((phuTung, key) =>
                                        part.name === phuTung.TenPhuTung ?
                                            <option value={key} selected>
                                                {phuTung.TenPhuTung}
                                            </option>
                                        :   <option value={key}>
                                                {phuTung.TenPhuTung}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Col>
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
                                <Col md={3}>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        placeholder="Đơn giá"
                                        min="0"
                                        step="500"
                                        value={part.price}
                                        readOnly
                                        required
                                    />
                                </Col>
                                <Col md={3}>
                                    <Form.Control
                                        type="text"
                                        name="total"
                                        placeholder="Thành tiền"
                                        value={(part.total)}
                                        readOnly
                                    />
                                </Col>
                                <Col md={1}>
                                    <Button variant="danger" onClick={() => handleRemovePart(index)}>Xóa</Button>
                                </Col>
                            </Row>
                            </>))}
                        </Form.Group>
                    </Row>
                </Row>

                <Form.Group as={Col} controlId="totalAmount" style={{marginBottom:"20px"}}>
                    <Form.Label>Tổng tiền:</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="totalAmount" 
                        value={numeral(totalAmount).format('0,0')} 
                        readOnly />
                </Form.Group>

                <Button type="submit" style={{width:"100px"}}>Tạo</Button>
            </Form>
        </Row>
    </Container>
  );
};

export default RepairForm;