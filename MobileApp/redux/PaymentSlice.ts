import { createSlice } from '@reduxjs/toolkit'

// to check user auth & status
export const paymentStatusSlice = createSlice({
    name: 'paymentStatus',
    initialState: {
        paymentRoster: '',
    },
    reducers: {
        checkRosterStatus: (state, action) => {
            state.paymentRoster = action.payload.paymentRoster
        },
    },
})
export const { checkRosterStatus } = paymentStatusSlice.actions