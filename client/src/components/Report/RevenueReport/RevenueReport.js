import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from 'react-bootstrap/esm/Form'
import Button from "react-bootstrap/Button";
import { TbReportSearch } from 'react-icons/tb'
import { TiExport } from 'react-icons/ti'
import RevenueReportDataService from "../../../services/RevenueReportDataService";
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import viLocale from 'date-fns/locale/vi';
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
export default function RevenueReport() {
    const [maxMonth, setMaxMonth] = useState(getMaxMonthValue());
    const [Report, setReport] = useState([])
    const [ReportTotal, setReportTotal] = useState(null)
    const [Month, setMonth] = useState(Date);
    const [validated, setValidated] = useState(false);

    const handleDateChange = e => {
        setReportTotal(null)
        if (e.target.value) {
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
            let a = {
                Thang: Month
            }
            RevenueReportDataService.getRevenueReport(a)
                .then((data) => {
                    setReport(data.data.resCT_DoanhThuThang)
                    setReportTotal(data.data.RevenueReport)
                })
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    const exportToExcel = () => {
        let _Report = Report.map((item, i) => ({
            ...item,
            HieuXe: item.HieuXe.TenHieuXe,
            ThanhTien:item.ThanhTien.toLocaleString('vi', { style: 'currency', currency: 'VND' }),
            TiLe: (item.ThanhTien / ReportTotal.TongDoanhThu * 100).toFixed(2) + '%'
        }))
        const headers = ['STT', 'Hiệu xe', 'Số lượt sửa', 'Thành tiền', 'Tỉ lệ'];
        const worksheetData = [
            ["", 'Báo cáo doanh thu tháng ' + formatDateToVN(Month)],
            ["", 'Tổng doanh thu: ' + ReportTotal.TongDoanhThu.toLocaleString('vi', { style: 'currency', currency: 'VND' })],
            [""],
            headers,
            ..._Report.map((obj, key) => [key + 1, obj.HieuXe, obj.SoLuotSua, obj.ThanhTien, obj.TiLe]),
        ];
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        //const worksheet = XLSX.utils.json_to_sheet(_Car);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        saveAsExcelFile(excelBuffer, 'Báo cáo doanh thu tháng ' + formatDateToVN(Month));
    };
    const saveAsExcelFile = (buffer, fileName) => {
        const data = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${fileName}.xlsx`;
        link.click();
    };

    return (<div>
        <Container>
            <h2>Nhập thông tin</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="2" controlId="validationCustom04">
                        <Form.Label>Chọn tháng doanh thu</Form.Label>
                        <Form.Control type="month" placeholder="Chọn ngày" min="2023-02" max={maxMonth} onChange={handleDateChange} required />
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
            {ReportTotal === null ? <p>Vui lòng chọn tháng xem báo cáo</p> : <Col xs='12' className='CarBrandList-container mt-3' style={{ margin: '0px ', }} >

                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ color: '#0c828f' }}>Báo cáo doanh thu Tháng {formatDateToVN(Month)}</h1>
                    <h4 style={{ color: '#0c828f' }}>Tổng doanh thu: {Number(ReportTotal.TongDoanhThu).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</h4>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <Button onClick={exportToExcel} type='submit' style={{ textAlign: 'center', paddingTop: '9px', backgroundColor: '#0c828f', border: 'none', marginBottom: '10px' }} >
                        Xuất báo cáo
                        <TiExport style={{ fontSize: "25px", marginLeft: '6px' }} />
                    </Button>
                </div>
                <Row style={{ textAlign: 'center', paddingBottom: '10px', fontWeight: '700', paddingRight: '6px' }}>
                    <Col xs='1' style={{ paddingRight: '5px' }}>
                        STT
                    </Col>
                    <Col >
                        Hiệu xe
                    </Col><Col >
                        Số lượt sửa
                    </Col>
                    <Col >
                        Thành tiền
                    </Col>

                    <Col >
                        Tỉ lệ
                    </Col>
                </Row>
                <div style={{ maxHeight: "500px", overflow: "hidden", overflowY: 'visible', paddingRight: '5px' }}>
                    {Report.length === 0 ? <p></p> : Report.map((item, key) => <Row style={{ textAlign: 'center', padding: '8xp 10px', lineHeight: '27px', borderBottom: 'black 0.5px solid' }}>
                        <Col xs='1' style={{ borderLeft: 'black 0.5px solid', paddingRight: '5px' }}>
                            {key + 1}
                        </Col>
                        <Col style={{ borderLeft: 'black 0.5px solid' }}>
                            {item.HieuXe.TenHieuXe}
                        </Col>
                        <Col style={{ borderLeft: 'black 0.5px solid' }}>
                            {item.SoLuotSua}
                        </Col>

                        <Col style={{ borderLeft: 'black 0.5px solid' }}>
                            {item.ThanhTien.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                        </Col>

                        <Col style={{ borderLeft: 'black 0.5px solid' }}>
                            {(item.ThanhTien / ReportTotal.TongDoanhThu * 100).toFixed(2)}%
                        </Col>
                    </Row>)}
                </div>
            </Col>}

        </Container>
    </div>)
}