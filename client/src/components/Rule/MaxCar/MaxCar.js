import Button from '@mui/material/Button';
import {BiEdit} from 'react-icons/bi'
import React, { useState } from "react";
import Form from 'react-bootstrap/Form';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
export default function MaxCar() {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [MaxCar,setMaxCar]=useState(0);
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleCloseEditAndUpdate = () => {
    setOpenEdit(false);
    console.log(MaxCar)
  };
  const handleMaxCarChange = (e) => {
    setMaxCar(e.target.value)
  };
  return (
        <div>
            <p style={{color:'black', margin:'-14px 0 10px 0'}}>Số xe sửa tối đa trong ngày là 30</p>
            <Button onClick={handleClickOpenEdit} style={{color:'white',backgroundColor:'#0c828f', textTransform:'none'}}>
                Chỉnh sửa
                <BiEdit  style={{fontSize:'18px',marginLeft:'5px'}}/>
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
              <Form.Control as="textarea" placeholder='Ví dụ: 31' onChange={handleMaxCarChange} />
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
        </div>
    )
}