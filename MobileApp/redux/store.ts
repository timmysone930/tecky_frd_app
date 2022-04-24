import { configureStore } from '@reduxjs/toolkit'
import { doctorIDSlice, healthFormSlice, reserveFormSlice} from './slice'

export const store = configureStore({
  reducer: {
    setDoctorID: doctorIDSlice.reducer,
    getFormData: reserveFormSlice.reducer,
    getHealthFormData: healthFormSlice.reducer
  },
})
