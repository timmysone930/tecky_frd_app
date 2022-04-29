// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import Config from "react-native-config";


// Define our single API slice object
export const doctorAPI = createApi({
  reducerPath: 'doctorAPI',
  // All of our requests will have URLs starting with '/http://XXXX'
  baseQuery: fetchBaseQuery({ baseUrl: `${Config.REACT_APP_API_SERVER}` }),
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    // The endpoint is a "query" operation that returns data
    getDoctorList: builder.query<any, void>({
      // The URL for the request is '/http://XXXX/doctors/list'
      query: () => '/doctors/allInfo'
    }),
    getRosterListByDocCode:  builder.query({
      query: (code: string) => `/roster/search?column=doc_code&where=${code}`,
    }),
  })
})

// Export the auto-generated hook for the query endpoint
export const { useGetDoctorListQuery, useGetRosterListByDocCodeQuery } = doctorAPI