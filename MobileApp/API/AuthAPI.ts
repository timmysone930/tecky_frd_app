// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Config from "react-native-config";
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

interface registerType{
    "id_doc_type": string,
    "hkid":string,
    "name": string,
    "gender": string,
    "birthday": string,
    "email": string,
    "phone": string,
    "member_code":string,
}



// Define our single API slice object
export const authAPI = createApi({
    reducerPath: 'authAPI',
    // All of our requests will have URLs starting with '/http://XXXX'
    baseQuery: fetchBaseQuery({ baseUrl: `${Config.REACT_APP_API_SERVER}` }),
    // The "endpoints" represent operations and requests for this server
    endpoints: builder => ({
        // The endpoint is a "query" operation that returns data
        loginByPhone: builder.mutation<QueryReturnValue, { 'phone': number, 'smsCode': string }>({
            query: (data) => ({
                url: "/auth/client/login",
                method: "POST",
                body: data
            })
        }),
        postRegisterInfo: builder.mutation<QueryReturnValue, registerType>({
            query: (data) => ({
                url: "/patient/register",
                method: "POST",
                body: data
            })
        }),
        getLoginSMS: builder.mutation<QueryReturnValue, {'phone':number}>({
            query: (phone) => ({
                url: "/auth/send-sms/",
                method: 'POST',
                body: phone
            })
        }),
        getLoginSMSByQuery: builder.query({
            query: (phone: string) => `/auth/send-sms/${phone}`,
          }),
    })
})

// Export the auto-generated hook for the query endpoint
export const { useLoginByPhoneMutation, usePostRegisterInfoMutation, useGetLoginSMSMutation, useGetLoginSMSByQueryQuery } = authAPI