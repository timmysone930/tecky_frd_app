import { configureStore } from '@reduxjs/toolkit'
import { doctorIDSlice,
         reserveFormSlice, 
         prescriptionCheckingSlice, 
         prescriptionPaymentPresetSlice, 
         addressDataSlice
       } from './slice'
import { authAPI } from '../API/AuthAPI'
import { doctorAPI } from '../API/DoctorAPI'
import { userStatusSlice } from './AuthSlice'


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
  },

  // 加入 api middleware 來啟用 caching、invalidation、polling 等其他方法
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(doctorAPI.middleware).concat(authAPI.middleware),
})
