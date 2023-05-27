import Button from '@mui/material/Button';
import { BiEdit } from 'react-icons/bi'
import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ParaDataService from '../../../services/ParaDataService';
export default function RuleOther() {
  const [reload, setReload] = useState(false)
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openWarn, setOpenWarn] = React.useState(false);
  const [openEditTienThu, setOpenEditTienThu] = React.useState(false);

  const [openWarnTienThu, setOpenWarnTienThu] = React.useState(false);
  const [Para, setPara] = useState({});
  const [TiLe, setTiLe] = useState(0);
  const [KTTienThu, setKTTienThu] = useState(0);
  const [ApDungDQKTTT, setApDungDQKTTT] = useState(0);

  const handleCloseWarn = () => {
    setOpenWarn(false);
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  //KTraTienThu
  const handleClickOpenEditTienThu = () => {
    setKTTienThu("Áp dụng")
    setOpenEditTienThu(true);
  };
  const handleCloseEditTienThu = () => {
    setOpenEditTienThu(false);
  };
  const handleCloseEditAndUpdateTienThu = () => {
    let _Para = Para;
    console.log(KTTienThu)
    if (KTTienThu === 'Áp dụng' || KTTienThu === null)
      _Para.KiemTraTienThu = true;
    else if (KTTienThu === 'Không áp dụng') _Para.KiemTraTienThu = false

    ParaDataService.updatePara(_Para)
    setOpenEditTienThu(false);
    setTimeout(() => { setReload(!reload); }, 300)
  }


  const handleTienThuChange = (e) => {
    setKTTienThu(e.target.value)
  };
  const handleCloseEditAndUpdate = () => {
    if (typeof (Para.TiLeTinhDonGiaBan) === typeof (0) && TiLe > 100) {
      let _Para = Para;
      _Para.TiLeTinhDonGiaBan = TiLe / 100;
      ParaDataService.updatePara(_Para)
      setOpenEdit(false);
      setTimeout(() => { setReload(!reload); }, 1000)
      console.log('close', _Para)
    }
    else {
      setOpenWarn(true);
    }
  };

  const handleTiLeChange = (e) => {
    setTiLe(e.target.value)
  };
  useEffect(() => {
    ParaDataService.getPara()
      .then((data) => {
        setPara(data.data[0])
        setTiLe(data.data[0].TiLeTinhDonGiaBan * 100)
        if (data.data[0].KiemTraTienThu) {
          setApDungDQKTTT('Áp dụng')
        } else setApDungDQKTTT('Không áp dụng')
      })
  }, [reload])
  return (
    <div>
      <p style={{ color: 'black', margin: '-14px 0 10px 0' }}>Tỉ lệ tính đơn giá bán là {Para.TiLeTinhDonGiaBan * 100}%</p>
      <Button onClick={() => { handleClickOpenEdit(); }} style={{ color: 'white', backgroundColor: '#0c828f', textTransform: 'none' }}>
        Chỉnh sửa
        <BiEdit style={{ fontSize: '18px', marginLeft: '5px' }} />
      </Button>
      <p style={{ color: 'black', margin: '20px 0 10px 0' }}>Tiền thu không được vượt quá Tiền nợ: {ApDungDQKTTT} </p>
      <Button onClick={() => { handleClickOpenEditTienThu(); }} style={{ color: 'white', backgroundColor: '#0c828f', textTransform: 'none' }}>
        Chỉnh sửa
        <BiEdit style={{ fontSize: '18px', marginLeft: '5px' }} />
      </Button>
      <Dialog className='Tiledongiaban'
        open={openEdit}
        onClose={handleCloseEdit}
      >
        <DialogTitle >
          {"Chỉnh sửa tỉ lệ tính đơn giá bán"}
        </DialogTitle>
        <DialogContent>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Nhập Tỉ Lệ (%)</Form.Label>
              <Form.Control type='number' min={100} max={120} defaultValue={TiLe} placeholder='Ví dụ: 31' onChange={handleTiLeChange} />
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


      <Dialog className='TienThu'
        open={openEditTienThu}
        onClose={handleCloseEditTienThu}
      >
        <DialogTitle >
          {"Thay đổi quy định thu tiền"}
        </DialogTitle>
        <DialogContent>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Tiền thu không vượt quá tiền nợ</Form.Label>
              <Form.Control as='select' defaultValue={'Áp dụng'} onChange={handleTienThuChange}>
                <option value={"Áp dụng"} selected>Áp dụng</option>
                <option value={"Không áp dụng"}>Không áp dụng</option>

              </Form.Control>
            </Form.Group>
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditTienThu}>Hủy bỏ</Button>
          <Button onClick={handleCloseEditAndUpdateTienThu} autoFocus>
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>




      <Dialog className='Cảnh báo'
        open={openWarn}
        onClose={handleCloseWarn}
      >
        <DialogTitle >
          {"Vui lòng nhập tỉ lệ lớn hơn 100%"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseWarn}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}