import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Grid, 
    Stack, 
    Typography,
    Box,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput
} from "@mui/material";
import React, { useState } from "react";
import axios from 'axios';
import Cookies from "js-cookie";
import { Formik } from "formik";
import {Modal} from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { loginSuccess } from '../../features/userSlice';
import * as Yup from "yup";
import logo from '../../assets/images/logo.png';
import FullPageLoader from "../FullPageLoader/FullPageLoader";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (values, {setSubmitting}) => {
        setIsLoading(true);
        try {
            console.log("Email: ", values.email);
            // console.log("Pass: ", values.password);
            // const cookieValue = Cookies.get('token');
            const response = await axios.post('http://localhost:8000/api/login', 
                {
                    email: values.email, 
                    password: values.password
                }
                // , {
                //     headers: {
                //         Authorization: cookieValue,
                //     }
                // }
            );

            if (response.status === 200) {
                console.log('Đăng nhập thành công:', response.data.message);
                console.log(response.data);
                values.userRoleAdmin = response.data.userRoleAdmin;
                const expirationDate = new Date();
                expirationDate.setTime(expirationDate.getTime() + (10 * 60 * 1000)); // 10 phút
                Cookies.set('token', response.data.token, { expires: expirationDate });
                dispatch(loginSuccess(values));
                setIsLoading(false);
                navigate("/Rule");
            } else {
                console.error('Lỗi đăng nhập:', response.data.error);
                setShow(true);
                setIsLoading(false);
            }
        } catch (error) {
            if (error.response) {
                console.error('Lỗi đăng nhập có res:', error.response.data.error);
                setShow(true);
                setIsLoading(false);
            } else {
                console.error('Lỗi đăng nhập không có res:', error.message);
                setShow(true);
                setIsLoading(false);
            }
        }
        setSubmitting(false);
    };

    const handleSubmitModal = async (event) => {
        setShow(false);
        setIsLoading(false);
    }

    return (<>
        {isLoading && <FullPageLoader/>}
        <Grid container direction="column" justifyContent="flex-end"  sx={{ minHeight: "100vh" }} style={{backgroundColor:"#00bc86"}}>
            <Grid item xs={12}>
                <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "calc(100vh - 68px)" }} >
                    <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }} style={{width:"70%",backgroundColor:"white", border:"solid 1px #ccc", padding:"20px", borderRadius:"8px"}}>
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
                                                Chào mừng bạn đã quay trở lại
                                            </Typography>
                                            <Typography variant="caption" fontSize="16px" color="#9e9e9e">
                                                Nhập thông tin đăng nhập của bạn để tiếp tục
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                            <Formik
                                initialValues = {{
                                    email: "",
                                    password: "",
                                    userRoleAdmin: false,
                                }}
                                validationSchema={Yup.object().shape({
                                    email: Yup.string()
                                        .email("Email không hợp lệ")
                                        .max(255)
                                        .required("Vui lòng nhập email"),
                                    password: Yup.string()
                                        .max(255)
                                        .required("Vui lòng nhập mật khẩu"),
                                })}
                                onSubmit={handleSubmit}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleBlur,
                                    handleChange,
                                    isSubmitting,
                                    handleSubmit,
                                }) => (
                                <form noValidate onSubmit={handleSubmit}>
                                    <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                                        <InputLabel htmlFor="outlined-adornment-email-login">
                                            Email
                                        </InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-email-login"
                                            type="email"
                                            value={values.email}
                                            name="email"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Email"
                                            inputProps={{}}
                                        />
                                        {touched.email && errors.email && (
                                            <FormHelperText error >
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </FormControl>

                                    <FormControl
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        style={{marginTop:"20px"}}
                                    >
                                        <InputLabel htmlFor="outlined-adornment-password-login">
                                            Mật khẩu
                                        </InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password-login"
                                            type={showPassword ? "text" : "password"}
                                            value={values.password}
                                            name="password"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                            }
                                            label="Password"
                                            inputProps={{}}
                                        />
                                        {touched.password && errors.password && (
                                            <FormHelperText
                                            error
                                            id="standard-weight-helper-text-password-login"
                                            >
                                            {errors.password}
                                            </FormHelperText>
                                        )}
                                    </FormControl>

                                    <Stack direction="row" alignItems="center" justifyContent="right">
                                        <Typography
                                            variant="subtitle1"
                                            color="secondary"
                                            sx={{ textDecoration:"none", cursor:"pointer", color:"blue"}}
                                            // onClick={handleOpenReset}
                                        >
                                            Quên mật khẩu?
                                        </Typography>
                                    </Stack>
                                    {errors.submit && (
                                        <Box sx={{ mt: 3 }}>
                                            <FormHelperText error>{errors.submit}</FormHelperText>
                                        </Box>
                                    )}

                                    <Box sx={{ mt: 2 }}>
                                        <Button
                                            disableElevation
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            style={{backgroundColor:"#00bc86"}}
                                            disabled={isSubmitting}
                                        >
                                            Đăng nhập
                                        </Button>
                                    </Box>
                                </form>
                                )}
                            </Formik>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

        <Modal show={show} onHide={()=>setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Thông tin tài khoản hoặc mật khẩu chưa chính xác. Vui lòng nhập lại.  
                </Modal.Body>
                <Modal.Footer>
                    <Button  variant="success" onClick={handleSubmitModal}>Đồng ý</Button>
                </Modal.Footer>
            </Modal>
    </>);
};

export default Login;