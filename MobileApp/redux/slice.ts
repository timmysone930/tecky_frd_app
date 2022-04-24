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
        name: '', reservedDate: '', reservedTime: '', idType: '香港身份證', idNumber: '', EmergencyContactName: '', EmergencyContactPhone: ''
    },
    reducers: {
        setFormData: (state, action) => {
            const { name, reservedDate, reservedTime, idType, idNumber, EmergencyContactName, EmergencyContactPhone } = action.payload
            state.name = name
            state.reservedDate = reservedDate
            state.reservedTime = reservedTime
            state.idType = idType
            state.idNumber = idNumber
            state.EmergencyContactName = EmergencyContactName
            state.EmergencyContactPhone = EmergencyContactPhone
        },
    }
})

export const { setFormData } = reserveFormSlice.actions
// get health declaration form detail
export const healthFormSlice = createSlice({
    name: 'healthForm',
    initialState: {
        leaveHK: '', Countries: '', backDate: '', selectedFever: false, selectedCough: false, selectedDiarrhea: false,selectedInfluenza: false,
    },
    reducers: {
        setHealthFormData: (state, action) => {
            state.selectedFever = action.payload.selectedFever
            state.selectedCough = action.payload.selectedCough
            state.selectedDiarrhea = action.payload.selectedDiarrhea
            state.selectedInfluenza = action.payload.selectedInfluenza
        },
        setHealthFormInfo: (state, action) =>{
            state.leaveHK = action.payload.leaveHK
            state.Countries = action.payload.Countries
            state.backDate = action.payload.backDate
        }
    }
})

export const { setHealthFormData, setHealthFormInfo } = healthFormSlice.actions
