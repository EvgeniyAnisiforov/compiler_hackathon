import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const getTimeApi = createApi({
    reducerPath: "getTimeApi",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
    endpoints: (build) => ({
        getTime: build.query({
            query: (userId) => `api/statistic/get_time/${userId}`,
        })
    })
})

export const {useGetTimeQuery} = getTimeApi