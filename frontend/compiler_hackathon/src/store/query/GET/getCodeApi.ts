import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getCodeApi = createApi({
    reducerPath: "getCodeApi",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
    endpoints: (build) => ({
        getCode: build.query({
            query: () => 'code',
        })
    })
})

export const {useGetCodeQuery} = getCodeApi