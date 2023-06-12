import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { MdDeleteForever, MdLibraryAdd } from 'react-icons/md'
import { BiEdit } from 'react-icons/bi'
import { SiMicrosoftexcel } from 'react-icons/si'
import React, { useEffect } from "react";
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import Table from 'react-bootstrap/Table';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PhuTungDataService from '../../../services/PhuTungDataService';
import * as XLSX from 'xlsx'
export default function ApplianceList() {
  const [reload, setReload] = React.useState(false);
  const [openWarn, setOpenWarn] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [AppliList, setAppliList] = React.useState([]);
  const [data, setData] = React.useState(null);

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openAddFile, setOpenAddFile] = React.useState(false);

  const [openDelete, setOpenDelete] = React.useState(false);

  const [openEdit, setOpenEdit] = React.useState(false);
  const [AppliOnEdit, setAppliOnEdit] = React.useState({});
  const [tenAppli, setTenAppli] = React.useState('');
  const [giaAppli, setGiaAppli] = React.useState(0);

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
        if (item.TenPhuTung === null || typeof (item.DonGia) !== typeof (0)) {
          setOpenWarn(true)
          check = false
          return
        }
      })
      if (check) {
        data.map((_item, key) => {
          let item = {
            DonGia: _item.DonGia,
            TenPhuTung: _item.TenPhuTung,
            SoLuongTon: 0
          }
          setTimeout(() => {
            PhuTungDataService.createPhuTung(item)
          }, 1000 * key);
          setOpenSuccess(true)
          setTimeout(() => {
            window.location.reload()
          }, data.length * 1000);
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
    if (tenAppli !== '' && giaAppli > 10000) {
      let Appli = {
        SoLuongTon: 0,
        DonGia: giaAppli,
        TenPhuTung: tenAppli
      }
      PhuTungDataService.createPhuTung(Appli)
      console.log(Appli)
      setOpenAdd(false);
      setTimeout(() => { setReload(!reload); }, 600)
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
    if (tenAppli !== '' && giaAppli > 10000) {
      let _AppliOnEdit = AppliOnEdit;
      _AppliOnEdit.TenPhuTung = tenAppli;
      _AppliOnEdit.DonGia = giaAppli;
      setOpenEdit(_AppliOnEdit)
      PhuTungDataService.updatePhuTung(_AppliOnEdit)
      setOpenEdit(false);
      setTimeout(() => { setReload(!reload); }, 400)
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
    PhuTungDataService.deletePhuTung(AppliOnEdit.MaPhuTung)
    setOpenDelete(false);
    setTimeout(() => { setReload(!reload); }, 200)
  };

  const handleTenAppliChange = e => {
    const _tenAppli = e.target.value;
    setTenAppli(_tenAppli);
  }
  const handleGiaAppliChange = e => {
    const _giaAppli = e.target.value;
    setGiaAppli(_giaAppli);
  }
  const handleCloseWarn = e => {
    setOpenWarn(0)
  }

  useEffect(() => {
    PhuTungDataService.getAllPhuTung()
      .then((data) => {
        setAppliList(data.data)
      })
  }, [reload])

  return (
    <div className='CarBrandList-container'>
      <Container style={{ width: '100%' }}>
        <Row style={{ textAlign: 'center', paddingBottom: '10px', fontWeight: '700', paddingRight: '26px' }}>
          <Col xs='1' style={{ paddingRight: '5px' }}>
            STT
          </Col>
          <Col xs='5'>
            Tên Vật tư
          </Col><Col xs='4'>
            Đơn giá
          </Col>
          <Col xs='1'>
            Sửa
          </Col>
          <Col xs='1'>
            Xóa
          </Col>

        </Row>
        <div style={{ maxHeight: "500px", overflow: "hidden", overflowY: 'visible', paddingRight: '5px' }}>
          {AppliList.map((item, key) => <Row style={{ textAlign: 'center', padding: '8xp 10px', lineHeight: '27px', borderBottom: 'black 0.5px solid' }}>
            <Col xs='1' style={{ borderLeft: 'black 0.5px solid', paddingRight: '5px' }}>
              {key + 1}
            </Col>
            <Col xs='5' style={{ borderLeft: 'black 0.5px solid' }}>
              {item.TenPhuTung}
            </Col><Col xs='4' style={{ borderLeft: 'black 0.5px solid' }}>
              {item.DonGia.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
            </Col>
            <Col xs='1' style={{ borderLeft: 'black 0.5px solid' }}>
              <BiEdit className='CarBrand-edit-btn' style={{ width: '25px', height: '25px' }} onClick={() => { handleClickOpenEdit(); setAppliOnEdit(item); setTenAppli(item.TenPhuTung); setGiaAppli(item.DonGia) }} />
            </Col>
            <Col xs='1' style={{ borderLeft: 'black 0.5px solid' }}>
              <MdDeleteForever className='CarBrand-detele-btn' style={{ width: '25px', height: '25px' }} onClick={() => { handleClickOpenDelete(); setAppliOnEdit(item); }} />
            </Col>
          </Row>)}
        </div>
        <Row style={{ justifyContent: 'flex-end', marginTop: '15px', }}>
          <Col xs='3'>
            <Button onClick={() => { setOpenAddFile(true) }} style={{ width: '100%', textTransform: 'none', backgroundColor: '#0c828f', color: 'white' }}>
              Thêm từ file
              <SiMicrosoftexcel style={{ marginLeft: '6px', fontSize: '18px' }} />
            </Button>

          </Col>
          <Col xs='3'>
            <Button onClick={() => { handleClickOpenAdd(); setTenAppli(''); setGiaAppli(0) }} style={{ width: '100%', textTransform: 'none', backgroundColor: '#0c828f', color: 'white' }}>
              Thêm Vật Tư
              <MdLibraryAdd style={{ marginLeft: '6px', fontSize: '18px' }} />
            </Button>

          </Col>

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
                <th>TenPhuTung</th>
                <th>DonGia</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Kính Vkool</td>
                <td>1000000</td>
              </tr>
              <tr>
                <td>Bánh xe</td>
                <td>1500000</td>
              </tr>
              <tr>
                <td>Gạt mưa </td>
                <td>500000</td>
              </tr>
            </tbody>
          </Table>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Chọn file excel danh sách phụ tùng</Form.Label>
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
          {"Thêm Vật tư"}
        </DialogTitle>
        <DialogContent>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Nhập tên Vật tư</Form.Label>
              <Form.Control type='text' defaultValue={''} onChange={handleTenAppliChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Nhập giá Vật tư(&gt;10.000đ)</Form.Label>
              <Form.Control type='number' min={10000} step={40000} defaultValue={0} onChange={handleGiaAppliChange} />
            </Form.Group>
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd}>Hủy bỏ</Button>
          <Button onClick={handleCloseAddAndUpdate} autoFocus>
            Thêm Vật tư
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog className='Delete'
        open={openDelete}
        onClose={handleCloseDelete}
      >
        <DialogTitle >
          {"Bạn có chắc chắn muốn xóa Vật tư này?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Hủy bỏ</Button>
          <Button onClick={handleCloseDeleteAndUpdate} autoFocus>
            Xóa Vật tư
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog className='Edit'
        open={openEdit}
        onClose={handleCloseEdit}
      >
        <DialogTitle >
          {"Sửa Vật tư"}
        </DialogTitle>
        <DialogContent>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Nhập tên Vật tư</Form.Label>
              <Form.Control type='text' defaultValue={AppliOnEdit.TenPhuTung} onChange={handleTenAppliChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Nhập giá Vật tư(&gt;10.000đ) </Form.Label>
              <Form.Control type='number' min={10000} step={40000} defaultValue={AppliOnEdit.DonGia} onChange={handleGiaAppliChange} />
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