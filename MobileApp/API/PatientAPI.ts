// Import the RTK Query methods from the React-specific entry point
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import Config from "react-native-config";

// Define our single API slice object
export const patientAPI = createApi({
  reducerPath: 'patientAPI',
  // All of our requests will have URLs starting with '/http://XXXX'
  baseQuery: fetchBaseQuery({ baseUrl: `${Config.REACT_APP_API_SERVER}` }),
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    postPatientRegister: builder.mutation<QueryReturnValue, any>({
      query: (data) => ({
        url: "/patient/register",
        method: "POST",
        body: data
      })
    }),
    postPatientReservation: builder.mutation<QueryReturnValue, any>({
      query: (data) => ({
        url: "/reserve/add",
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: data
      })
    }),
    putDisableSession : builder.mutation<QueryReturnValue, any>({
      query: (sessionID) => ({
        url: `/roster/session-off/${sessionID}`,
        method: "PUT",
      })
    }),
    putEnableSession : builder.mutation<QueryReturnValue, any>({
      query: (sessionID) => ({
        url: `/roster/session-on/${sessionID}`,
        method: "PUT",
      })
    }),
    putHoldSession : builder.mutation<QueryReturnValue, any>({
      query: (sessionID) => ({
        url: `/roster/session-hold/${sessionID}`,
        method: "PUT",
      })
    }),
    // get reservation list
    getReservationList: builder.query<any, void>({
      query: (token) => ({
        url: "/client/reservation-list",
        headers:{
          "Authorization":`Bearer ${token}`,
        }
    })
    }),
  })
})

// Export the auto-generated hook for the query endpoint
export const { usePostPatientRegisterMutation, usePostPatientReservationMutation, usePutDisableSessionMutation, usePutEnableSessionMutation,usePutHoldSessionMutation, useGetReservationListQuery, } = patientAPI