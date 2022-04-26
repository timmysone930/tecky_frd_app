import { configureStore } from '@reduxjs/toolkit'
import { doctorIDSlice, reserveFormSlice, userStatusSlice} from './slice'

export const store = configureStore({
  reducer: {
    setDoctorID: doctorIDSlice.reducer,
    getFormData: reserveFormSlice.reducer,
    getUserStatus: userStatusSlice.reducer,
  },
})
