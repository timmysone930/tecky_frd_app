import { configureStore } from '@reduxjs/toolkit'
import { doctorIDSlice,
         reserveFormSlice, 
         prescriptionCheckingSlice, 
         prescriptionPaymentPresetSlice, 
         addressDataSlice
       } from './slice'
import { authAPI } from '../API/AuthAPI'
import { doctorAPI } from '../API/DoctorAPI'
import { userInfoAPI } from '../API/UserInfoAPI'
import { userStatusSlice } from './AuthSlice'
import { patientAPI } from '../API/PatientAPI'


export const store = configureStore({
  reducer: {
    setDoctorID: doctorIDSlice.reducer,
    getFormData: reserveFormSlice.reducer,
    getUserStatus: userStatusSlice.reducer,
    getPrescriptionCode: prescriptionCheckingSlice.reducer,
    getPrescriptionPaymentPreset: prescriptionPaymentPresetSlice.reducer,
    getAddressData: addressDataSlice.reducer,
    [doctorAPI.reducerPath]: doctorAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [patientAPI.reducerPath]: patientAPI.reducer,
    [userInfoAPI.reducerPath]: userInfoAPI.reducer,
  },

  // 加入 api middleware 來啟用 caching、invalidation、polling 等其他方法
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(doctorAPI.middleware).concat(authAPI.middleware).concat(patientAPI.middleware).concat(userInfoAPI.middleware),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false, }).concat(doctorAPI.middleware).concat(authAPI.middleware),
})
