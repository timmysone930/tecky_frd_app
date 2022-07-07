import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Config from "react-native-config";
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

// Define our single API slice object
export const userInfoAPI = createApi({
    reducerPath: 'userInfoAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `${Config.REACT_APP_API_SERVER}` }),
    endpoints: builder => ({
        getUserInfo: builder.query<any, void>({
            query: (token) => ({
                url:`/client/profile`,
                headers:{
                    "Authorization":`Bearer ${token}`,
                }
            })
        }),
        putEditInfo: builder.mutation<QueryReturnValue, any>({
            query: (data) => ({
                url: "/client/edit-profile",
                method: "PUT",
                body: data
            })
        }),
    })
})

// Export the auto-generated hook for the query endpoint
export const { useGetUserInfoQuery, usePutEditInfoMutation } = userInfoAPI

