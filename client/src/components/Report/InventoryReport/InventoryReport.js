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
import { TiExport } from 'react-icons/ti'
import { TbReportSearch } from 'react-icons/tb'
import CarDataService from "../../../services/CarDataService";
import InventoryReportDataService from "../../../services/InventoryReportDataService";
import { format } from 'date-fns';
import viLocale from 'date-fns/locale/vi';
import * as XLSX from 'xlsx';

function formatDateToVN(date) {
    let _date = new Date(date)
    return format(_date, 'MM/yyyy', { locale: viLocale });
}
function getMaxMonthValue() {
    // Tạo một đối tượng ngày hiện tại
    const currentDate = new Date();

    // Lấy tháng và năm của ngày hiện tại
    const currentMonth = currentDate.getMonth();
    console.log(currentMonth)

    const currentYear = currentDate.getFullYear();

    // Tính tháng và năm của tháng trước
    const previousMonth = currentMonth;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    // Định dạng chuỗi tháng và năm dạng "YYYY-MM"
    const maxMonthValue = `${previousYear}-${String(previousMonth).padStart(2, '0')}`;

    // Gán giá trị tối đa cho thuộc tính max của trường input month
    console.log(maxMonthValue)
    return maxMonthValue;
}
export default function InventoryReport() {
    const [maxMonth, setMaxMonth] = useState(getMaxMonthValue());
    
    const [Car, setCar] = useState([]);
    const [InventoryReport, setInventoryReport] = useState([]);
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
            let d=new Date(Month);
            InventoryReportDataService.getInventoryReport(d.getMonth()+1,d.getFullYear())
            .then((data)=>{
                setInventoryReport(data.data)
            })
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };
    const exportToExcel = () => {
        let _InventoryReport=InventoryReport.map((item,i)=>({
            ...item,
            TenPhuTung:item.PhuTung.TenPhuTung,
            TonDau: item.BaoCaoTonThang.TonDau,
            PhatSinh:item.BaoCaoTonThang.PhatSinh,
            TonCuoi:item.BaoCaoTonThang.TonCuoi
          }))
        
            const headers = ['STT', 'Tên phụ tùng','Tồn đầu','Phát sinh','Tồn cuối'];
            const worksheetData = [
              ["",'Báo cáo tồn kho tháng '+InventoryReport[0].BaoCaoTonThang.Thang+'/'+InventoryReport[0].BaoCaoTonThang.Nam],
              [""],
              headers,
              ..._InventoryReport.map((obj,key) => [key+1,obj.TenPhuTung, obj.TonDau,obj.PhatSinh,obj.TonCuoi]),
            ];
          const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
      saveAsExcelFile(excelBuffer, 'Báo cáo tồn kho tháng '+InventoryReport[0].BaoCaoTonThang.Thang+'/'+InventoryReport[0].BaoCaoTonThang.Nam);
    };
  
    const saveAsExcelFile = (buffer, fileName) => {
      const data = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName}.xlsx`;
      link.click();
    };


    useEffect(() => {
        CarDataService.getAllCar()
            .then((data) => {
                setCar(data.data)
            })
            console.log(Car)
    }, [])
    return (<div>
        <Container>
            <h2>Nhập thông tin</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="2" controlId="validationCustom04">
                        <Form.Label>Chọn tháng báo cáo tồn</Form.Label>
                        <Form.Control type="month" placeholder="Chọn ngày" min="2023-01" max={maxMonth} onChange={handleDateChange} required />
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
           {InventoryReport.length===0?<p>Vui lòng chọn tháng xem báo cáo</p>:<Col xs='12' className='CarBrandList-container mt-3' style={{ margin: '0px ', }} >
                <div style={{ textAlign: 'center',marginBottom:'20px' }}>
                    <h1 style={{ color:'#0c828f' }}>Báo cáo tồn kho</h1>
                    <h4 style={{ color:'#0c828f' }}>Tháng {InventoryReport[0].BaoCaoTonThang.Thang}/{InventoryReport[0].BaoCaoTonThang.Nam} </h4>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <Button onClick={exportToExcel} type='submit' style={{ textAlign:'center',paddingTop:'9px' ,backgroundColor: '#0c828f', border: 'none',marginBottom: '10px' }} >
                            Xuất báo cáo
                        <TiExport style={{ fontSize: "25px", marginLeft: '6px' }} />
                    </Button>
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
                    {InventoryReport.length === 0 ? <p>Không tìm thấy xe phù hợp</p> : InventoryReport.map((item, key) => <Row style={{ textAlign: 'center', padding: '8xp 10px', lineHeight: '27px', borderBottom: 'black 0.5px solid' }}>
                        <Col xs='1' style={{ borderLeft: 'black 0.5px solid', paddingRight: '5px' }}>
                            {key + 1}
                        </Col>
                        <Col style={{ borderLeft: 'black 0.5px solid' }}>
                            {item.PhuTung.TenPhuTung}
                        </Col>
                        <Col  style={{ borderLeft: 'black 0.5px solid' }}>
                            {item.BaoCaoTonThang.TonDau}
                        </Col>
                        
                        <Col  style={{ borderLeft: 'black 0.5px solid' }}>
                            {item.BaoCaoTonThang.PhatSinh}
                        </Col>

                        <Col  style={{ borderLeft: 'black 0.5px solid' }}>
                            {item.BaoCaoTonThang.TonCuoi}
                        </Col>
                    </Row>)}

                </div>
            </Col>}
            
        </Container>
    </div>)
}