import React, { useState } from "react";
import {
    Grid, 
    Stack, 
    Typography,
    Box,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput
} from "@mui/material";
import { Link } from "react-router-dom";
import './ResetPassword.css'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import FullPageLoader from '../FullPageLoader/FullPageLoader';
import { setNullEmailResetPassword } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { BASE_URL } from "../../config/config";
const ResetPass = () => {
    const [isResetPasswordFormVisible, setIsResetPasswordFormVisible] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState('');
    const [verificationCodeError, setVerificationCodeError] = useState('');
    const emailResetPassword = useSelector((state) => state.user.emailResetPassword);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
    const handleCodeChange = (event) => {
        const codeValue = event.target.value;
        const submitButton = document.getElementById('submitButton');
        
        setVerificationCode(codeValue);
        if (codeValue.length === 6 && !isNaN(codeValue)) {
            submitButton.removeAttribute('disabled');
            console.log(emailResetPassword);
            console.log("Đủ 6 số");
            console.log(codeValue);
            setVerificationCodeError("");
        } else {
            submitButton.setAttribute('disabled', true);
            console.log("Không đủ 6 số");
            setVerificationCodeError("Không đúng định dạng!");
        }
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePasswordConfirmChange = (event) => {
        setPasswordConfirm(event.target.value);
    };

    const handleSubmitCode = async (event) => {
        event.preventDefault();
        try {
            console.log(emailResetPassword);
            console.log(verificationCode);
            const response = await axios.post(`${BASE_URL}/api/reset-password/confirmOtp`, { emailResetPassword,verificationCode });
            console.log(response.status);
            if (response.status === 200) {
                console.log('Mã xác nhận đúng. ', response.data.message);
                setShow(false);
                setIsResetPasswordFormVisible(true);
                console.log("Hiển thị form đặt mật khẩu.");
            } else {
                console.error('Mã đăng nhập không hợp lệ:', response.data.error);
                setShow(true);
                setIsResetPasswordFormVisible(false);
                console.log("Hiển thị form nhập mã xác nhận");
            }
        } catch (error) {
            if (error.response) {
                console.error('Lỗi 1:', error.response.data.error);
                setShow(true);
                setIsResetPasswordFormVisible(false);
                console.log("Hiển thị form nhập mã xác nhận");
            } else {
                console.error('Lỗi 2:', error.message);
                setShow(true);
                setIsResetPasswordFormVisible(false);
                console.log("Hiển thị form nhập mã xác nhận");
            }
        }
    };

    const handleResetPassword = async (event)=> {
        event.preventDefault();
        setIsLoading(true);
        setError("");
        if (password !== passwordConfirm) {
            console.log("Mật khẩu nhập lại không trùng khớp");
            setError('Mật khẩu nhập lại không trùng khớp');
            setIsLoading(false);
            return;
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/reset-password`, { emailResetPassword, password });
            console.log(response.status);
            if (response.status === 200) {
                setShowSuccess(true);
                console.log('Đặt lại mật khẩu thành công. Chuyển hướng về trang chủ');
                dispatch(setNullEmailResetPassword());
                setIsLoading(false);
              } else {
                setShowSuccess(false);
                setError(response.data.error || 'Có lỗi xảy ra. Vui lòng thử lại sau.');
                console.log('Đặt lại mật khẩu thành công. Chuyển hướng về trang chủ');
                setIsLoading(false); 
            }
        } catch (error) {
            setShowSuccess(false);
            console.error(`Lỗi yêu cầu đặt lại mật khẩu: ${error.message}`);
            setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
            setIsLoading(false);
        }
    };

    const handleSubmitModal = async (event) => {
        setShow(false);
        setIsLoading(false);
    };
    const handleSubmitModalSuccess = async (event) => {
        setShowSuccess(false);
        setIsLoading(false);
        navigate('/');
    };
    const showResetPassForm = () => {
    };
    const showVerificationCodeForm = () => {
    };

    return (<>
        {isLoading && <FullPageLoader/>}
        <Grid container direction="column" justifyContent="flex-end"  sx={{ minHeight: "100vh" }} style={{backgroundColor:"#00bc86"}}>
            <Grid item xs={12}>
                <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "calc(100vh - 68px)" }} >
                {!isResetPasswordFormVisible ? (
                    <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }} style={{width:"50%",backgroundColor:"white", border:"solid 1px #ccc", padding:"20px", borderRadius:"8px"}}>
                        <Grid container spacing={2} alignItems="center" justifyContent="center" >
                            <Grid item sx={{ mb: 3 }}>
                                <Link to="#">
                                    <img src ={logo} alt="666Auto" width="100%" height="60px"/>
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container alignItems="center" justifyContent="center" >
                                    <Grid item>
                                        <Stack alignItems="center" justifyContent="center" spacing={1} >
                                            <Typography gutterBottom color="#00bc86" fontWeight="bold" fontSize="24px">
                                            Nhập mã xác nhận
                                            </Typography>
                                            <Typography variant="caption" fontSize="16px" color="#9e9e9e">
                                            Nhập mã xác nhận chúng tôi đã gửi cho bạn.
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                    <div className="container-form-verificationCode">
                                        <form onSubmit={handleSubmitCode}>
                                            <div className="input-container">
                                                <FormControl fullWidth >
                                                    <InputLabel htmlFor="inputVerificationCodep">
                                                        Mã xác nhận
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        id="inputVerificationCodep"
                                                        type="text"
                                                        onChange={handleCodeChange}
                                                        label="Mã xác nhận"
                                                        value={verificationCode}
                                                        required
                                                    />
                                                </FormControl>
                                                {verificationCodeError && <div style={{ color: 'red' }}>{verificationCodeError}</div>}
                                            </div>  
                                            
                                            <Box className="action-form_bottom" style={{marginTop:"12px"}}>
                                                <input id="submitButton" value="Gửi" type="submit" className="btn btn-success btn-lg" onClick={showResetPassForm} disabled/>
                                            </Box>
                                        </form>
                                    </div>
                                
                            </Grid>
                        </Grid>
                    </Grid>
                    ) :(
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }} style={{width:"50%",backgroundColor:"white", border:"solid 1px #ccc", padding:"20px", borderRadius:"8px"}}>
                        <Grid container spacing={2} alignItems="center" justifyContent="center" >
                            <Grid item sx={{ mb: 3 }}>
                                <Link to="#">
                                    <img src ={logo} alt="666Auto" width="100%" height="60px"/>
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container alignItems="center" justifyContent="center" >
                                    <Grid item>
                                        <Stack alignItems="center" justifyContent="center" spacing={1} >
                                            <Typography gutterBottom color="#00bc86" fontWeight="bold" fontSize="24px">
                                                Nhập mật khẩu mới
                                            </Typography>
                                            <Typography variant="caption" fontSize="16px" color="#9e9e9e">
                                                Nhập mật khẩu mới của bạn
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="container-form-reset-pass" >
                                    <form onSubmit={handleResetPassword}>
                                        <FormControl fullWidth >
                                            <InputLabel htmlFor="outlined-adornment-pass">
                                                Mật khẩu
                                            </InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-pass"
                                                type="password"
                                                onChange={handlePasswordChange}
                                                label="Mật khẩu"
                                                required
                                            />
                                        </FormControl>

                                        <FormControl fullWidth style={{marginTop:"12px"}}>
                                            <InputLabel htmlFor="outlined-adornment-pass-confirm">
                                                Nhập lại mật khẩu
                                            </InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-pass-confirm"
                                                type="password"
                                                onChange={handlePasswordConfirmChange}
                                                label="Nhập lại mật khẩu"
                                                required
                                            />
                                        </FormControl>

                                        {error && <div style={{ color: 'red', width:'100%' }}>{error}</div>}

                                        <Box className="action-form_bottom" style={{marginTop:"20px"}}>
                                            <input type="submit" className="btn btn-success btn-lg" value="Xác nhận"/>
                                        </Box>
                                    </form>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    )}
                </Grid>
            </Grid>
        </Grid>    
            
        <Modal show={show} onHide={()=>setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Thông báo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Mã xác nhận không chính xác hoặc đã hết hạn. Vui lòng nhập lại hoặc <Link to="/account/login">yêu cầu mã xác nhận mới</Link>.
            </Modal.Body>
            <Modal.Footer>
                <Button  variant="success" onClick={handleSubmitModal}>Đồng ý</Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showSuccess} onHide={handleSubmitModalSuccess} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Thông báo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn đã đổi mật khẩu thành công
            </Modal.Body>
            <Modal.Footer>
                <Button  variant="success" onClick={handleSubmitModalSuccess}>Đồng ý</Button>
            </Modal.Footer>
        </Modal>
    </>);
}
export default ResetPass;
