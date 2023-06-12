import { createSlice } from "@reduxjs/toolkit";

let emailRSP = "";
let emailLS = null;
let isLoggedInLS = false;
let userRoleLS = null;

if (localStorage.getItem("emailRSP") !== null) {
    emailRSP = JSON.parse(localStorage.getItem("emailRSP"));
}

if (localStorage.getItem("email") !== null && localStorage.getItem("isLoggedIn") !== false) {
    emailLS = JSON.parse(localStorage.getItem("email"));
    isLoggedInLS = JSON.parse(localStorage.getItem("isLoggedIn"));
    userRoleLS = JSON.parse(localStorage.getItem("userRole"));
}

const initialState = {
    emailResetPassword: emailRSP, 
    email: emailLS,
    isLoggedIn: isLoggedInLS,
    userRole: userRoleLS,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setEmailResetPassword: (state, action)=>{
            state.emailResetPassword = action.payload;
            localStorage.setItem("emailRSP", JSON.stringify(state.emailResetPassword));
        },
        setNullEmailResetPassword: (state)=>{
            state.emailResetPassword = null;
            localStorage.removeItem("emailRSP");
        },
        loginSuccess(state, action) {
            state.isLoggedIn = true;
            state.email = action.payload.email;
            state.userRole = action.payload.userRole;
            localStorage.setItem("email", JSON.stringify(state.email));
            localStorage.setItem("isLoggedIn", JSON.stringify(state.isLoggedIn));
            localStorage.setItem("userRole", JSON.stringify(state.userRole));
          },
        logoutSuccess(state) {
            state.isLoggedIn = false;
            state.email = null;
            state.userRole = null;
            localStorage.removeItem("email");
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userRole");
          },
    }
});
export const { 
    setEmailResetPassword,
    setNullEmailResetPassword, 
    loginSuccess, 
    logoutSuccess 
} = userSlice.actions;
export default userSlice.reducer;