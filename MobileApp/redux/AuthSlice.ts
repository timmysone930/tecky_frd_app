import { createSlice } from '@reduxjs/toolkit'

// to check user auth & status
export const userStatusSlice = createSlice({
    name: 'userStatus',
    initialState: {
        isLogin: false,
        currentPage:'',
        member_code:'',
        token:'',
        phone: null,
    },
    reducers: {
        checkStatus: (state, action) => {
            state.isLogin = action.payload.status,
            state.phone = action.payload.phone
        },
        setUserInfo:(state, action) => {
            state.member_code = action.payload.member_code
            state.token = action.payload.token
        },
        logoutAction:(state) => {
            state.isLogin = false;
            state.currentPage = '';
            state.member_code = '';
            state.token = '';
            state.phone = null;
        },
    },
})
export const { checkStatus,setUserInfo, logoutAction } = userStatusSlice.actions