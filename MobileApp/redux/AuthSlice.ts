import { createSlice } from '@reduxjs/toolkit'

// to check user auth & status
export const userStatusSlice = createSlice({
    name: 'userStatus',
    initialState: {
        isLogin: false, currentPage:''
    },
    reducers: {
        checkStatus: (state, action) => {
            state.isLogin = action.payload.status
        },
    },
})
export const { checkStatus } = userStatusSlice.actions