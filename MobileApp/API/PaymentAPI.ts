// Import the RTK Query methods from the React-specific entry point
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import Config from "react-native-config";


// Define our single API slice object
export const paymentAPI = createApi({
  reducerPath: 'paymentAPI',
  // All of our requests will have URLs starting with '/http://XXXX'
  baseQuery: fetchBaseQuery({ baseUrl: `${Config.REACT_APP_API_SERVER}` }),
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    postNewPayment: builder.mutation<QueryReturnValue, any>({
      query: ({data,token}) => ({
        url: "/payment/reserve",
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "Authorization":`Bearer ${token}`,
        },
        body: data
      })
    }),
  })
})

// Export the auto-generated hook for the query endpoint
export const { usePostNewPaymentMutation} = paymentAPI