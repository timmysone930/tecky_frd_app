import { createSlice } from '@reduxjs/toolkit'

// to get selected doctor ID for reservation
export const doctorIDSlice = createSlice({
    name: 'doctorID',
    initialState: {
        id: '', currentPage:'', docData:'',
    },
    reducers: {
        setDoctorID: (state, action) => {
            const { id, currentPage } = action.payload
            state.id = id
            state.currentPage = currentPage
        },
        setDoctorData:(state, action) => {
            state.docData = action.payload.docData
        },
    }
})
export const { setDoctorID,setDoctorData } = doctorIDSlice.actions

// get reservation form detail
export const reserveFormSlice = createSlice({
    name: 'reserveForm',
    initialState: {
        name: '', name_en:'' ,reservedDate: '', reservedTime: '',  reservedSession: '', idType: '香港身份證', idNumber: '', EmergencyContactName: '', EmergencyContactPhone: '',
        leaveHK: false, Countries: '', backDate: '', symptoms:[], idImg:[], memberCode:'', title:'',phone:'',email:'',bDay:'',isFever: false, isCough: false,
        isVomit: false, isCold: false
    },
    reducers: {
        setFormData: (state, action) => {
            const { name, reservedDate, reservedTime, idType, idNumber, reservedSession, title} = action.payload
            state.name = name
            state.reservedDate = reservedDate
            state.reservedTime = reservedTime
            state.idType = idType
            state.idNumber = idNumber
            state.reservedSession = reservedSession
            state.title = title
        },
        setHealthFormMultiBox: (state, action) => {
            if(action.payload.symptoms !== []){
                action.payload.symptoms.includes('發燒') ? state.isFever = true: state.isFever = false;
                action.payload.symptoms.includes('咳嗽、呼吸困難或咽喉痛') ? state.isCough = true: state.isCough = false;
                action.payload.symptoms.includes('腹瀉或嘔吐') ? state.isVomit = true: state.isVomit = false;
                action.payload.symptoms.includes('流感症狀') ? state.isCold = true: state.isCold = false;
            } ;
            state.symptoms = action.payload.symptoms
        },
        setHealthFormInfo: (state, action) => {
            state.leaveHK = action.payload.leaveHKRadio === 'true'? true:false
            state.Countries = action.payload.Countries
            state.backDate = action.payload.backDate
        },
        setIDImage:(state, action)=>{
            state.idImg = action.payload
        },
        setAdditionalInfo:(state, action)=>{
            state.name_en = action.payload.name_en
            state.phone = action.payload.phone
            state.email = action.payload.email
            state.bDay = action.payload.bDay
            state.EmergencyContactName = action.payload.EmergencyContactName
            state.EmergencyContactPhone = action.payload.EmergencyContactPhone
        },
        setMemberCode:(state, action)=>{
            state.memberCode = action.payload.memberCode
        }
    }
})

export const { setFormData, setHealthFormMultiBox, setHealthFormInfo,setIDImage,setMemberCode,setAdditionalInfo } = reserveFormSlice.actions

// to check user auth & status
// export const userStatusSlice = createSlice({
//     name: 'userStatus',
//     initialState: {
//         isLogin: false,
//         phone: null,
//     },
//     reducers: {
//         checkStatus: (state, action) => {
//             state.isLogin = action.payload.status
//             state.phone = action.payload.phone
//         }
//     }
// })
// export const { checkStatus } = userStatusSlice.actions

// Get the code of prescription the user currently checking
export const prescriptionCheckingSlice = createSlice({
    name: "prescriptionChecking",
    initialState: {
        prescriptionCode: "",
        prescriptionSelecting: null,
        prescriptionDetail: null,
        payment_status : null

    },
    reducers: {
        setPrescriptionCode: (state, action) => {
            state.prescriptionCode = action.payload.prescriptionCode
            state.prescriptionSelecting = action.payload.prescriptionSelecting
            state.prescriptionDetail = action.payload.prescriptionDetail
            state.payment_status = action.payload.payment_status
        }
    }
})

export const { setPrescriptionCode } = prescriptionCheckingSlice.actions

// Store the dato before the prescription payment process
export const prescriptionPaymentPresetSlice = createSlice({
    name: "deliveryMethod",
    initialState: {
        deliveryMethod: "",
        pickUpStore: {},
        deliverAddress: {}
    },
    reducers: {
        setPrescriptionPaymentPreset: (state, action) => {
            const {deliveryMethod, pickUpStore, deliverAddress} = action.payload
            state.deliveryMethod = deliveryMethod
            state.pickUpStore = pickUpStore
            state.deliverAddress = deliverAddress
        }
    }
})

export const { setPrescriptionPaymentPreset } = prescriptionPaymentPresetSlice.actions

// Deal with the address data storing
export const addressDataSlice = createSlice({
    name: "addressData",
    initialState: {
        addressWannaDeleteID: "",
        addressEditContent: null
    },
    reducers: {
        setAddressWannaDeleteID: (state, action) => {
            state.addressWannaDeleteID = action.payload.addressWannaDeleteID
        },
        setAddressEditContent: (state, action) => {
            state.addressEditContent = action.payload.addressEditContent
        }
    }
})

export const { setAddressWannaDeleteID, setAddressEditContent } = addressDataSlice.actions
