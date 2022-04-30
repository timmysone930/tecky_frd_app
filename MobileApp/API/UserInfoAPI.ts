import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Config from "react-native-config";
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

// Define our single API slice object
export const userInfoAPI = createApi({
    reducerPath: 'userInfoAPI',
    // All of our requests will have URLs starting with '/http://XXXX'
    baseQuery: fetchBaseQuery({ baseUrl: `${Config.REACT_APP_API_SERVER}` }),
    // The "endpoints" represent operations and requests for this server
    endpoints: builder => ({
        // The endpoint is a "query" operation that returns data
        getUserInfo: builder.query({
            // The URL for the request is '/http://XXXX/doctors/list'
            query: () => `/client/profile`
        }),
    })
})

// Export the auto-generated hook for the query endpoint
export const { useGetUserInfoQuery } = userInfoAPI

