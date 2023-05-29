import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { MdDeleteForever, MdLibraryAdd } from 'react-icons/md'
import { BiEdit } from 'react-icons/bi'
import { SiMicrosoftexcel } from 'react-icons/si'

import React, { useEffect } from "react";
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import Table from 'react-bootstrap/esm/Table'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import './WageList.css'
import TienCongDataService from '../../../services/TienCongDataService';
import * as XLSX from 'xlsx'
export default function WageList(props) {
  const [data, setData] = React.useState(null);
  const [reload, setReload] = React.useState(false);
  const [openWarn, setOpenWarn] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [WageList, setWageList] = React.useState([]);
  const [openAddFile, setOpenAddFile] = React.useState(false);

  const [openAdd, setOpenAdd] = React.useState(false);

  const [openDelete, setOpenDelete] = React.useState(false);

  const [openEdit, setOpenEdit] = React.useState(false);
  const [TCOnEdit, setTCOnEdit] = React.useState({});
  const [tenTC, setTenTC] = React.useState('');
  const [giaTC, setGiaTC] = React.useState(0);


  //Them tu file

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file)
      reader.onload = (event) => {
        const workbook = XLSX.read(event.target.result, { type: 'buffer' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        setData(jsonData);
      };
    } else setData(null)

  }
  const handleCloseAddFileAndUpdate = () => {
    console.log(data)
    let check = true
    if (data) {
      data.map((item) => {
        if (item.MoTa === null || typeof (item.TienCong) !== typeof (0) ) {
          setOpenWarn(true)
          check = false
          return
        }
      })
      if (check) {
        data.map((_item, key) => {
          let item={
            MoTa:_item.MoTa,
            TienCong:_item.TienCong
          }
          setTimeout(() => {
            TienCongDataService.createTienCong(item)
          }, 800 * key);
          setOpenSuccess(true)
          setTimeout(() => {
            window.location.reload()

          }, data.length * 800);
        })
      }
    } else setOpenWarn(true)

  }

  // Them 
  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  const handleCloseAddAndUpdate = () => {
    if (tenTC !== '' && giaTC > 10000) {
      let Wage = {
        TienCong: giaTC,
        MoTa: tenTC
      }
      TienCongDataService.createTienCong(Wage)
      console.log(Wage)
      setOpenAdd(false);
      setTimeout(() => { setReload(!reload); }, 500)
    }
    else {
      setOpenWarn(true);
    }
  };
  // Sua
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleCloseEditAndUpdate = () => {
    if (tenTC !== '' && giaTC > 10000) {
      let _TCOnEdit = TCOnEdit;
      _TCOnEdit.MoTa = tenTC;
      _TCOnEdit.TienCong = giaTC;
      setOpenEdit(_TCOnEdit)
      TienCongDataService.updateTienCong(_TCOnEdit)
      setOpenEdit(false);
      setTimeout(() => { setReload(!reload); }, 200)
    }
    else {
      setOpenWarn(true);
    }
  }
  //Xoa
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleCloseDeleteAndUpdate = () => {
    TienCongDataService.deleteTienCong(TCOnEdit.MaTienCong)
    setOpenDelete(false);
    setTimeout(() => { setReload(!reload); }, 200)
  };

  const handleTenTCChange = e => {
    const _tenTC = e.target.value;
    setTenTC(_tenTC);
  }
  const handleGiaTCChange = e => {
    const _giaTC = e.target.value;
    setGiaTC(_giaTC);
  }
  const handleCloseWarn = e => {
    setOpenWarn(0)
  }

  useEffect(() => {
    TienCongDataService.getAllTienCong()
      .then((data) => {
        setWageList(data.data)
      })
  }, [reload])

  return (
    <div className='CarBrandList-container'>
      <Container style={{ width: '100%' }}>
        <Row style={{ textAlign: 'center', paddingBottom: '10px', fontWeight: '700', paddingRight: '22px' }}>
          <Col xs='1' style={{ paddingRight: '5px' }}>
            STT
          </Col>
          <Col xs='5'>
            Nội dung
          </Col><Col xs='4'>
            Giá tiền
          </Col>
          <Col xs='1'>
            Sửa
          </Col>
          <Col xs='1'>
            Xóa
          </Col>

        </Row>
        <div style={{ maxHeight: "500px", overflow: "hidden", overflowY: 'visible', paddingRight: '5px' }}>
          {WageList.map((item, key) => <Row style={{ textAlign: 'center', padding: '8xp 10px', lineHeight: '27px', borderBottom: 'black 0.5px solid' }}>
            <Col xs='1' style={{ borderLeft: 'black 0.5px solid', paddingRight: '5px' }}>
              {key + 1}
            </Col>
            <Col xs='5' style={{ borderLeft: 'black 0.5px solid' }}>
              {item.MoTa}
            </Col><Col xs='4' style={{ borderLeft: 'black 0.5px solid' }}>
              {item.TienCong.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
            </Col>
            <Col xs='1' style={{ borderLeft: 'black 0.5px solid' }}>
              <BiEdit className='CarBrand-edit-btn' style={{ width: '25px', height: '25px' }} onClick={() => { handleClickOpenEdit(); setTCOnEdit(item); setTenTC(item.MoTa); setGiaTC(item.TienCong) }} />
            </Col>
            <Col xs='1' style={{ borderLeft: 'black 0.5px solid' }}>
              <MdDeleteForever className='CarBrand-detele-btn' style={{ width: '25px', height: '25px' }} onClick={() => { handleClickOpenDelete(); setTCOnEdit(item); }} />
            </Col>
          </Row>)}
        </div>

        <Row style={{ marginTop: '15px', justifyContent: 'flex-end' }} >
          <Col xs='3'>
            <Button onClick={() => { setOpenAddFile(true) }} style={{ width: '100%', textTransform: 'none', backgroundColor: '#0c828f', color: 'white' }}>
              Thêm từ file
              <SiMicrosoftexcel style={{ marginLeft: '6px', fontSize: '18px' }} />
            </Button>

          </Col>
          <Col xs='3'>
            <Button onClick={() => { handleClickOpenAdd(); setTenTC(''); setGiaTC(0) }} style={{ width: '100%', textTransform: 'none', backgroundColor: '#0c828f', color: 'white' }}>
              Thêm Tiền Công
              <MdLibraryAdd style={{ marginLeft: '6px', fontSize: '18px' }} />
            </Button></Col>
        </Row>
      </Container>

      <Dialog className='Import File'
        open={openAddFile}
      >
        <DialogTitle >
          {"Vui lòng chọn file theo định dạng"}
        </DialogTitle>
        <DialogContent>
        <Table striped bordered hover>
            <thead>
              <tr>
                <th>MoTa</th>
                <th>TienCong</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Rửa kính</td>
                <td>100000</td>
              </tr>
              <tr>
                <td>Thay bánh</td>
                <td>1500000</td>
              </tr>
              <tr>
                <td>Thay nhớt</td>
                <td>500000</td>
              </tr>
            </tbody>
          </Table>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Chọn file excel danh sách tiền công</Form.Label>
              <Form.Control required type='file' onChange={handleFileUpload} accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
            </Form.Group>
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpenAddFile(false); setData(null) }}>Hủy bỏ</Button>
          <Button onClick={handleCloseAddFileAndUpdate} autoFocus>
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog className='Add'
        open={openAdd}
        onClose={handleCloseAdd}
      >
        <DialogTitle >
          {"Thêm Tiền Công"}
        </DialogTitle>
        <DialogContent>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Nhập nội dung tiền công</Form.Label>
              <Form.Control type='text' defaultValue={''} onChange={handleTenTCChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Nhập giá tiền công(>10.000đ)</Form.Label>
              <Form.Control type='number' min={10000} step={40000} defaultValue={0} onChange={handleGiaTCChange} />
            </Form.Group>
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd}>Hủy bỏ</Button>
          <Button onClick={handleCloseAddAndUpdate} autoFocus>
            Thêm Tiền công
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog className='Delete'
        open={openDelete}
        onClose={handleCloseDelete}
      >
        <DialogTitle >
          {"Bạn có chắc chắn muốn xóa Tiền Công này?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleCloseDelete}>Hủy bỏ</Button>
          <Button onClick={handleCloseDeleteAndUpdate} autoFocus>
            Xóa Tiền Công
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog className='Edit'
        open={openEdit}
        onClose={handleCloseEdit}
      >
        <DialogTitle >
          {"Sửa Tiền Công"}
        </DialogTitle>
        <DialogContent>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Nhập nội dung tiền công</Form.Label>
              <Form.Control type='text' defaultValue={TCOnEdit.MoTa} onChange={handleTenTCChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Nhập giá tiền công(>10.000đ) </Form.Label>
              <Form.Control type='number' min={10000} step={40000} defaultValue={TCOnEdit.TienCong} onChange={handleGiaTCChange} />
            </Form.Group>
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Hủy bỏ</Button>
          <Button onClick={handleCloseEditAndUpdate} autoFocus>
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog className='Cảnh báo'
        open={openWarn}
        onClose={handleCloseWarn}
      >
        <DialogTitle >
          {"Vui lòng nhập đúng định dạng!"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseWarn}>OK</Button>
        </DialogActions>
      </Dialog>
      <Dialog className='Success'
        open={openSuccess}
      >
        <DialogTitle >
          {"Nhập tiền công thành công! Vui lòng chờ xử lý."}
        </DialogTitle>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </div>
  )
}