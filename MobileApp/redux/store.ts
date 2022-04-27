import { configureStore } from '@reduxjs/toolkit'
import { userStatusSlice } from './AuthSlice'
import { doctorIDSlice, reserveFormSlice} from './slice'

export const store = configureStore({
  reducer: {
    setDoctorID: doctorIDSlice.reducer,
    getFormData: reserveFormSlice.reducer,
    getUserStatus: userStatusSlice.reducer,
  },
})
