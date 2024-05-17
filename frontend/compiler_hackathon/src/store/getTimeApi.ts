import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getTimeApi = createApi({
    reducerPath: "getTimeApi",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
    endpoints: (build) => ({
        getTime: build.query({
            query: () => 'time',
        })
    })
})

export const {useGetTimeQuery} = getTimeApi