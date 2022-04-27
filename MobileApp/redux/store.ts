import { configureStore } from '@reduxjs/toolkit'
import { doctorIDSlice,
         reserveFormSlice, 
         userStatusSlice, 
         prescriptionCheckingSlice, 
         prescriptionPaymentPresetSlice, 
         addressDataSlice
       } from './slice'

export const store = configureStore({
  reducer: {
    setDoctorID: doctorIDSlice.reducer,
    getFormData: reserveFormSlice.reducer,
    getUserStatus: userStatusSlice.reducer,
    getPrescriptionCode: prescriptionCheckingSlice.reducer,
    getPrescriptionPaymentPreset: prescriptionPaymentPresetSlice.reducer,
    getAddressData: addressDataSlice.reducer,
  },
})
