import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { MdDeleteForever,MdLibraryAdd } from 'react-icons/md'
import { BiEdit } from 'react-icons/bi'
import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import './CarBrandList.css'
import CarBrandDataService from '../../../services/CarBrandDataService';
import CarDataService from '../../../services/CarDataService';
export default function CarBrandList() {
  const [reload,setReload] = useState(false)

  const [HxeList,setHxeList] = useState([])
  const [openWarn, setOpenWarn] = React.useState(false);
  const [openWarnDetele, setOpenWarnDetele] = React.useState(false);
  const handleCloseWarn = () => {
    setOpenWarn(false);
  };
  const [openAdd, setOpenAdd] = React.useState(false);

  const [openDelete, setOpenDelete] = React.useState(false);

  const [openEdit, setOpenEdit] = React.useState(false);
  const [HxeOnEdit, setHxeOnEdit] = React.useState({});
  const [tenHxeNew, setTenHxeNew] = React.useState('');
  const [tenHxeEdit, setTenHxeEdit] = React.useState('');

  useEffect(()=>{
    CarBrandDataService.getAllCarBrands()
    .then((data)=>
      setHxeList(data.data)
    )

  },[reload])
  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
    setTenHxeNew('')

  };
  const handleCloseAddAndUpdate = () => {
    console.log("gj",HxeList)
    const compare = HxeList.filter(item => item.TenHieuXe === tenHxeNew)
    console.log("compare.length: ", compare.length)
    if(tenHxeNew!==''&&tenHxeNew!==null){
      if(compare.length === 0) {
        CarBrandDataService.createCarBrand(tenHxeNew)
        setOpenAdd(false);
        setTimeout(() => {
          setReload(!reload);
        },300)
      } else {
        setOpenWarnDetele(true)
      }
    } else {
      setOpenWarn(true);
    }
    setTenHxeNew('')
  };


  const handleClickOpenEdit = (item) => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setTenHxeNew('')

  };
  const handleCloseEditAndUpdate = () => {
    // const index = HxeList.findIndex(item => item._id === HxeOnEdit._id);
    // HxeList[index].TenHieuXe = tenHxeNew;
    const compare = HxeList.filter(item => item.TenHieuXe === tenHxeNew)
    if (tenHxeNew!==''){
      if(compare.length === 0) {
        let _hxe=HxeOnEdit;
        _hxe.TenHieuXe=tenHxeNew;
        setHxeOnEdit(_hxe);
    
        CarBrandDataService.updateCarBrand(_hxe)
        console.log(HxeOnEdit)
        setOpenEdit(false);
        setTimeout(()=>{setReload(!reload);},300)
      } else {
        setOpenWarnDetele(true)
      }
    }
    else {
      setOpenWarn(true);
    }
    setTenHxeNew('')
  }
  
  
  const handleTenHxeChange = e => {
    const _tenHxeNew = e.target.value;
    setTenHxeNew(_tenHxeNew);
    console.log(tenHxeNew)
  }
  //Xoa hieu xe
  const handleClickOpenDelete = (hxe) => {
    let check=true
    CarDataService.getAllCar()
    .then(data=>{
      data.data.map(item=>{
        if (item.MaHieuXe===hxe.MaHieuXe){
          check=false
          setOpenWarnDetele(true)
          return
        }
      })
      if (check)
        setOpenDelete(true);
     
    })
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);

  };
  const handleCloseDeleteUpdate = () => {
    CarBrandDataService.deleteCarBrand(HxeOnEdit.MaHieuXe)
    setOpenDelete(false);
    setTimeout(()=>{setReload(!reload);},200)
  };
  return (
    <div className='CarBrandList-container'>
      <Container style={{ width: '100%' }}>
        <Row style={{ textAlign: 'center', paddingBottom: '10px', fontWeight: '700',paddingRight:'16px'}}>
          <Col xs='2' >
            STT
          </Col>
          <Col xs='4'>
            Tên hiệu xe
          </Col>
          <Col xs='3'>
            Sửa hiệu xe
          </Col>
          <Col xs='3'>
            Xóa hiệu xe
          </Col>

        </Row>
        <div style={{ maxHeight:"500px",overflow:"hidden",overflowY: 'visible',paddingRight:'16px'}}>
        {HxeList.map((item, key) => <Row style={{ textAlign: 'center', padding: '8xp 10px', lineHeight:'27px',borderBottom: 'black 0.5px solid' }}>
          <Col xs='2'  style={{borderLeft: 'black 0.5px solid' ,padding:'0'}}>
            {key + 1}
          </Col>
          <Col xs='4' style={{borderLeft: 'black 0.5px solid' }}>
            {item.TenHieuXe}
          </Col>
          <Col xs='3' style={{borderLeft: 'black 0.5px solid' }}>
            <BiEdit className='CarBrand-edit-btn' style={{ width: '25px', height: '25px' }} onClick={() => { handleClickOpenEdit(); setHxeOnEdit(item);setTenHxeNew(HxeOnEdit.TenHieuXe) }} />
          </Col>
          <Col xs='3' style={{borderLeft: 'black 0.5px solid' }}>
            <MdDeleteForever className='CarBrand-detele-btn' style={{ width: '25px', height: '25px' }} onClick={()=>{setHxeOnEdit(item);handleClickOpenDelete(item);}} />
          </Col>
        </Row>)}
        </div>
        <Row style={{display:'flex',justifyContent:'flex-end'}}>
          <Button onClick={handleClickOpenAdd} style={{marginTop:'15px',width:'30%',textTransform:'none',backgroundColor:'#0c828f',color:'white'}}>
            Thêm hiệu xe  
          <MdLibraryAdd style={{marginLeft:'6px',fontSize:'18px'}}/>
          </Button>
        </Row>
      </Container>
      
      <Dialog className='Add'
        open={openAdd}
        onClose={handleCloseAdd}
      >
        <DialogTitle >
          {"Thêm Hiệu xe"}
        </DialogTitle>
        <DialogContent>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Nhập tên Hiệu xe muốn thêm</Form.Label>
              <Form.Control as="textarea" defaultValue={''} onChange={handleTenHxeChange} required='true'/>
            </Form.Group>
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd}>Hủy bỏ</Button>
          <Button onClick={handleCloseAddAndUpdate} autoFocus>
            Thêm Hiệu xe
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog className='Delete'
        open={openDelete}
        onClose={handleCloseDelete}
      >
        <DialogTitle >
          {"Bạn có chắc chắn muốn xóa Hiệu xe này?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleCloseDelete}>Hủy bỏ</Button>
          <Button onClick={handleCloseDeleteUpdate} autoFocus>
            Xóa hiệu xe
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog className='Edit'
        open={openEdit}
        onClose={handleCloseEdit}
      >
        <DialogTitle >
          {"Sửa Hiệu xe"}
        </DialogTitle>
        <DialogContent>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Nhập tên Hiệu xe mới</Form.Label>
              <Form.Control type="text" defaultValue={HxeOnEdit.TenHieuXe} onChange={handleTenHxeChange} aria-describedby="inputGroupPrepend"
              required/>
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
          {"Bạn chưa nhập tên Hiệu xe"}
        </DialogTitle>
        <DialogActions>
          <Button  onClick={handleCloseWarn}>OK</Button>
        </DialogActions>
      </Dialog>
      <Dialog className='Cảnh báo xóa'
        open={openWarnDetele}
      >
        <DialogTitle >
          {"Hiệu xe này đã được sử dụng!"}
        </DialogTitle>
        <DialogActions>
          <Button  onClick={()=>setOpenWarnDetele(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}