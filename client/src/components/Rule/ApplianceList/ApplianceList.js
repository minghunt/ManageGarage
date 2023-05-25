import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { MdDeleteForever, MdLibraryAdd } from 'react-icons/md'
import { BiEdit } from 'react-icons/bi'
import React, { useEffect } from "react";
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PhuTungDataService from '../../../services/PhuTungDataService';
export default function ApplianceList() {
  const [reload, setReload] = React.useState(false);
  const [openWarn, setOpenWarn] = React.useState(false);
  const [AppliList, setAppliList] = React.useState([]);

  const [openAdd, setOpenAdd] = React.useState(false);

  const [openDelete, setOpenDelete] = React.useState(false);

  const [openEdit, setOpenEdit] = React.useState(false);
  const [AppliOnEdit, setAppliOnEdit] = React.useState({});
  const [tenAppli, setTenAppli] = React.useState('');
  const [giaAppli, setGiaAppli] = React.useState(0);

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
        SoLuongTon:0,
        DonGia: giaAppli,
        TenPhuTung: tenAppli
      }
      PhuTungDataService.createPhuTung(Appli)
      console.log(Appli)
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
    if (tenAppli !== '' && giaAppli > 10000) {
      let _AppliOnEdit = AppliOnEdit;
      _AppliOnEdit.TenPhuTung = tenAppli;
      _AppliOnEdit.DonGia = giaAppli;
      setOpenEdit(_AppliOnEdit)
      PhuTungDataService.updatePhuTung(_AppliOnEdit)
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
        <Row style={{ textAlign: 'center', paddingBottom: '10px', fontWeight: '700', paddingRight: '22px' }}>
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
        <Row style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={()=>{handleClickOpenAdd();setTenAppli(''); setGiaAppli(0) }} style={{ marginTop: '15px', width: '30%', textTransform: 'none', backgroundColor: '#0c828f', color: 'white' }}>
            Thêm Vật Tư
            <MdLibraryAdd style={{ marginLeft: '6px', fontSize: '18px' }} />
          </Button>
        </Row>
      </Container>

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
              <Form.Label>Nhập giá Vật tư(>10.000đ)</Form.Label>
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
              <Form.Label>Nhập giá Vật tư(>10.000đ) </Form.Label>
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
          {"Vui lòng nhập đúng định dạng"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseWarn}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}