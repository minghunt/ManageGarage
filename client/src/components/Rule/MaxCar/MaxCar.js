import Button from '@mui/material/Button';
import {BiEdit} from 'react-icons/bi'
import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ParaDataService from '../../../services/ParaDataService';
export default function MaxCar() {
  const [reload,setReload] = useState(false)

  const [openEdit, setOpenEdit] = React.useState(false);
  const [openWarn, setOpenWarn] = React.useState(false);

  const [Para,setPara]=useState({});
  const [MaxCar,setMaxCar]=useState(0);
  const handleCloseWarn = () => {
    setOpenWarn(false);
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleCloseEditAndUpdate = () => {
    if (typeof(Para.SoXeSuaChuaToiDa)===typeof(0)&&MaxCar>0) {
      let _Para=Para;
    _Para.SoXeSuaChuaToiDa=MaxCar;
    ParaDataService.updatePara(_Para)
    setOpenEdit(false);
    console.log(MaxCar)
    setTimeout(()=>{setReload(!reload);},1000)
    console.log('close')
    }
    else {
      setOpenWarn(true);
    }
    

  };
  const handleMaxCarChange = (e) => {
  
    setMaxCar(e.target.value)
    console.log(MaxCar)
  };
  useEffect(()=>{
    ParaDataService.getPara()
    .then((data)=>{
      setPara(data.data[0])
      setMaxCar(data.data[0].SoXeSuaChuaToiDa)
    })
  },[reload])
  return (
        <div>
            <p style={{color:'black', margin:'-14px 0 10px 0'}}>Số xe sửa tối đa trong ngày là {Para.SoXeSuaChuaToiDa}</p>
            <Button onClick={handleClickOpenEdit} style={{color:'white',backgroundColor:'#0c828f', textTransform:'none'}}>
                Chỉnh sửa
                <BiEdit style={{fontSize:'18px',marginLeft:'5px'}}/>
            </Button>
            <Dialog className='Add'
        open={openEdit}
        onClose={handleCloseEdit}
      >
        <DialogTitle >
          {"Chỉnh sửa số xe sửa tối đa"}
        </DialogTitle>
        <DialogContent>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Nhập số xe</Form.Label>
              <Form.Control type='number' min={1} max={200} defaultValue={MaxCar} placeholder='Ví dụ: 31' onChange={handleMaxCarChange} />
            </Form.Group>
          </Form>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleCloseEdit}>Hủy bỏ</Button>
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
          {"Vui lòng nhập định dạng số và Số xe > 0"}
        </DialogTitle>
        <DialogActions>
          <Button  onClick={handleCloseWarn}>OK</Button>
        </DialogActions>
      </Dialog>
        </div>
    )
}