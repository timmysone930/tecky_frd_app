import { createSlice } from '@reduxjs/toolkit'

// to get selected doctor ID for reservation
export const doctorIDSlice = createSlice({
    name: 'doctorID',
    initialState: {
        id: '',
    },
    reducers: {
        setDoctorID: (state, action) => {
            const { id } = action.payload
            state.id = id
        }
    }
})
export const { setDoctorID } = doctorIDSlice.actions
// get reservation form detail
export const reserveFormSlice = createSlice({
    name: 'reserveForm',
    initialState: {
        name: '', reservedDate: '', reservedTime: '', idType: '香港身份證', idNumber: '', EmergencyContactName: '', EmergencyContactPhone: '',
        leaveHK: '', Countries: '', backDate: '', symptoms:[],
    },
    reducers: {
        setFormData: (state, action) => {
            const { name, reservedDate, reservedTime, idType, idNumber, EmergencyContactName, EmergencyContactPhone, } = action.payload
            state.name = name
            state.reservedDate = reservedDate
            state.reservedTime = reservedTime
            state.idType = idType
            state.idNumber = idNumber
            state.EmergencyContactName = EmergencyContactName
            state.EmergencyContactPhone = EmergencyContactPhone
        },
        setHealthFormMultiBox: (state, action) => {
            state.symptoms = action.payload.symptoms
        },
        setHealthFormInfo: (state, action) => {
            state.leaveHK = action.payload.leaveHK
            state.Countries = action.payload.Countries
            state.backDate = action.payload.backDate
        }
    }
})

export const { setFormData, setHealthFormMultiBox, setHealthFormInfo } = reserveFormSlice.actions
// to check user auth & status
export const userStatusSlice = createSlice({
    name: 'userStatus',
    initialState: {
        isLogin: false,
    },
    reducers: {
        checkStatus: (state, action) => {
            state.isLogin = action.payload.status
        }
    }
})
export const { checkStatus } = userStatusSlice.actions