import React, { useEffect, useState } from "react";
import {
  Col,
  Row, 
  Form,
  Container
} from "react-bootstrap";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  InputLabel,
  OutlinedInput,
  FormControl,
} from "@mui/material";
import { MdDeleteForever, MdLibraryAdd } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import UserDataService from "../../services/UserDataService";
import Header from "../Header/Header";

export default function ManageUser() {
  const [reload, setReload] = useState(false);
  const [userList, setUserList] = useState([]);
  const [openWarn, setOpenWarn] = useState(false);
  const [openWarnCreate, setOpenWarnCreate] = useState(false);
  
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [userOnEdit, setUserOnEdit] = useState({});

  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("employee");
  const [resErr, setResErr] = useState('');

  const setUserDataNull = () => {
    setUserName('')
    setPhoneNumber('')
    setEmail('')
    setPassword('')
    setUserRole('employee')
  }
  useEffect(() => {
    UserDataService.getAllUser().then((data) => setUserList(data.data));
  }, [reload]);
  // Thay đổi thông tin form
  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleUserRoleChange = (event) => {
    setUserRole(event.target.value);
  };
  // Đồng ý tạo
  const handleSubmitAdd = async (event) => {
    event.preventDefault();
    setResErr('');
      UserDataService.createUser(
        email,
        userName,
        phoneNumber,
        password,
        userRole
      )
      .then((response) => {
        if (response.status === 201) {
          console.log("Đăng ký thành công:", response.data.message);
          setResErr(response.data.message)
          setOpenWarnCreate(true)
          setTimeout(() => {
            setReload(!reload);
          }, 500);
          setUserDataNull();
        } else {
          console.error("Lỗi đăng ký:", response.data.error);
          setResErr(response.data.error)
          setOpenWarnCreate(true)
        }
      })
    .catch(error => {
      if (error.response) {
        console.error("Lỗi đăng ký có res:", error.response.data.error);
        setResErr(error.response.data.error)
        setOpenWarnCreate(true)
      } else {
        console.error("Lỗi đăng ký không có res:", error.message);
        setResErr(error.message)
        setOpenWarnCreate(true)
      }
    });
  }
  // Đồng ý sửa
  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    setResErr('');
    console.log("userOnEdit.email: ",)
    const userDataUpdate = {
      name: userName,
      phoneNumber: phoneNumber,
      userRole: userRole
    }
    console.log(userDataUpdate)
      UserDataService.updateUser(userOnEdit.email, userDataUpdate)
      .then((response) => {
        if (response.status === 200) {
          console.log("Cập nhật thành công:", response.data.message);
          setResErr(response.data.message)
          setOpenWarnCreate(true)
          setTimeout(() => {
            setReload(!reload);
          }, 500);
          setUserDataNull();
        } else {
          console.error("Lỗi cập nhật:", response.data.error);
          setResErr(response.data.error)
          setOpenWarnCreate(true)
        }
      })
    .catch(error => {
      if (error.response) {
        console.error("Lỗi cập nhật có res:", error.response.data.error);
        setResErr(error.response.data.error)
        setOpenWarnCreate(true)
      } else {
        console.error("Lỗi cập nhật không có res:", error.message);
        setResErr(error.message)
        setOpenWarnCreate(true)
      }
    });
  }
  // Nút tạo
  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
    setUserDataNull();
  };
  // Nút sửa
  const handleClickOpenEdit = (item) => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setUserDataNull();
  };
  // Nút xóa người dùng
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  // Xác nhận xóa người dùng
  const handleCloseDeleteUpdate = () => {
    console.log(userOnEdit.email);
    UserDataService.deleteUser(userOnEdit.email);
    setOpenDelete(false);
    setTimeout(() => {
      setReload(!reload);
    }, 200);
  };

  const handleCloseWarn = () => {
    setOpenWarn(false);
  };
  const handleCloseWarnCreate = () => {
    setOpenWarnCreate(false);
  };
  return (
    <div>
      <Header />
      <Container style={{ marginTop: "30px" }}>
        <h2>Quản lý người dùng</h2>
        <div className="CarBrandList-container" style={{ margin: "30px 50px" }}>
          <Container style={{ width: "100%" }}>
            <Row
              style={{
                textAlign: "center",
                paddingBottom: "10px",
                fontWeight: "700",
                paddingRight: "16px",
              }}
            >
              <Col xs="1">STT</Col>
              <Col>Email</Col>
              <Col>Tên người dùng</Col>
              <Col xs="2">Chức vụ</Col>
              <Col xs="1">Sửa</Col>
              <Col xs="1">Xóa</Col>
            </Row>
            <div
              style={{
                maxHeight: "500px",
                overflow: "hidden",
                overflowY: "visible",
                paddingRight: "16px",
              }}
            >
              {userList.map((item, key) => (
                <Row
                  style={{
                    textAlign: "center",
                    padding: "8xp 10px",
                    lineHeight: "27px",
                    borderBottom: "#ccc 1px solid",
                  }}
                >
                  <Col
                    xs="1"
                    style={{ borderLeft: "#ccc 1px solid", padding: "0" }}
                  >
                    {key + 1}
                  </Col>
                  <Col style={{ borderLeft: "#ccc 1px solid" }}>
                    {item.email}
                  </Col>
                  <Col style={{ borderLeft: "#ccc 1px solid" }}>
                    {item.name}
                  </Col>
                  <Col xs="2" style={{ borderLeft: "#ccc 1px solid" }}>
                    {item.userRole}
                  </Col>
                  <Col xs="1" style={{ borderLeft: "#ccc 1px solid" }}>
                    <BiEdit
                      className="CarBrand-edit-btn"
                      style={{ width: "25px", height: "25px" }}
                      onClick={() => {
                        handleClickOpenEdit();
                        setUserOnEdit(item);
                      }}
                    />
                  </Col>
                  <Col xs="1" style={{ borderLeft: "#ccc 1px solid" }}>
                    <MdDeleteForever
                      className="CarBrand-detele-btn"
                      style={{ width: "25px", height: "25px" }}
                      onClick={() => {
                        handleClickOpenDelete();
                        setUserOnEdit(item);
                      }}
                    />
                  </Col>
                </Row>
              ))}
            </div>
            <Row style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={handleClickOpenAdd}
                style={{
                  marginTop: "15px",
                  width: "30%",
                  textTransform: "none",
                  backgroundColor: "#0c828f",
                  color: "white",
                }}
              >
                Thêm người dùng
                <MdLibraryAdd style={{ marginLeft: "6px", fontSize: "18px" }} />
              </Button>
            </Row>
          </Container>

          <Dialog className="Add" open={openAdd} onClose={handleCloseAdd}>
            <DialogTitle>{"Thêm người dùng"}</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmitAdd}>
                <FormControl fullWidth style={{marginTop:"8px"}}>
                  <InputLabel>
                    Tên
                    <span className="required" style={{color:"red"}}> *</span>
                  </InputLabel>
                  <OutlinedInput
                    required
                    type="text"
                    label="Tên"
                    value={userName}
                    onChange={handleNameChange}
                  />
                </FormControl>
                <FormControl fullWidth style={{marginTop:"8px"}}>
                  <InputLabel>
                    Số điện thoại
                    <span className="required" style={{color:"red"}}> *</span>
                  </InputLabel>
                  <OutlinedInput
                    required
                    type="text"
                    label="Số điện thoại"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                </FormControl>
                <FormControl fullWidth style={{marginTop:"8px"}}>
                  <InputLabel>
                    Email
                    <span className="required" style={{color:"red"}}> *</span>
                  </InputLabel>
                  <OutlinedInput
                    required
                    type="email"
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </FormControl>
                <FormControl fullWidth style={{marginTop:"8px"}}>
                  <InputLabel>
                    Mật khẩu
                    <span className="required" style={{color:"red"}}> *</span>
                  </InputLabel>
                  <OutlinedInput
                    required
                    type="password"
                    label="Mật khẩu"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </FormControl>
                <Form.Control
                  fullWidth 
                  style={{marginTop:"8px", padding:"12px"}}
                  as="select"
                  name="nameLabor"
                  label="Chức vụ"
                  onChange={(event) => handleUserRoleChange(event)}
                  required
                >
                  <option value="employee" selected>employee</option>
                  <option value="manager">manager</option>
                </Form.Control>
                <FormControl fullWidth style={{marginTop:"12px"}}>
                  <Button type="submit" style={{backgroundColor:"#00bc86", padding:"12px", color:"white"}}>Đăng ký</Button>
                </FormControl>
                <FormControl fullWidth style={{marginTop:"12px"}}>
                  <Button style={{border:"#00bc86 solid 1px"}} onClick={handleCloseAdd}>Hủy bỏ</Button>
                </FormControl>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog className="Delete" open={openDelete} onClose={handleCloseDelete}>
            <DialogTitle>{"Bạn có chắc chắn muốn xóa Người dùng này?"}</DialogTitle>
            <DialogActions>
              <Button onClick={handleCloseDelete}>Hủy bỏ</Button>
              <Button onClick={handleCloseDeleteUpdate} autoFocus>
                Xóa
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog className="Edit" open={openEdit} onClose={handleCloseEdit}>
            <DialogTitle>{"Sửa thông tin người dùng"}</DialogTitle>
            <DialogContent>
            <form onSubmit={handleSubmitEdit}>
                <FormControl fullWidth style={{marginTop:"8px"}}>
                  <InputLabel>
                    Tên
                    <span className="required" style={{color:"red"}}> *</span>
                  </InputLabel>
                  <OutlinedInput
                    required
                    type="text"
                    label="Tên"
                    onChange={handleNameChange}
                  />
                </FormControl>
                <FormControl fullWidth style={{marginTop:"8px"}}>
                  <InputLabel>
                    Số điện thoại
                    <span className="required" style={{color:"red"}}> *</span>
                  </InputLabel>
                  <OutlinedInput
                    required
                    type="text"
                    label="Số điện thoại"
                    onChange={handlePhoneNumberChange}
                  />
                </FormControl>
                <Form.Control
                  fullWidth 
                  style={{marginTop:"8px", padding:"12px"}}
                  as="select"
                  name="nameLabor"
                  label="Chức vụ"
                  onChange={(event) => handleUserRoleChange(event)}
                  required
                >
                  {userOnEdit.userRole === "employee" ? (<>
                    <option value="employee" selected>employee</option>
                    <option value="manager">manager</option>
                  </>):(<>
                    <option value="employee">employee</option>
                    <option value="manager" selected>manager</option>
                  </>)}
                </Form.Control>
                <FormControl fullWidth style={{marginTop:"12px"}}>
                  <Button type="submit" style={{backgroundColor:"#00bc86", padding:"12px", color:"white"}}>Cập nhật</Button>
                </FormControl>
                <FormControl fullWidth style={{marginTop:"12px"}}>
                  <Button style={{border:"#00bc86 solid 1px"}} onClick={handleCloseEdit}>Hủy bỏ</Button>
                </FormControl>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog className="Cảnh báo" open={openWarn} onClose={handleCloseWarn}>
            <DialogTitle>{"Vui lòng nhập đầy đủ thông tin"}</DialogTitle>
            <DialogActions>
              <Button onClick={handleCloseWarn}>OK</Button>
            </DialogActions>
          </Dialog>

          <Dialog className="Cảnh báo" open={openWarnCreate} onClose={handleCloseWarnCreate}>
            <DialogTitle>{resErr}</DialogTitle>
            <DialogActions>
              <Button onClick={handleCloseWarnCreate}>OK</Button>
            </DialogActions>
          </Dialog>
        </div>
      </Container>
    </div>
  );
}
