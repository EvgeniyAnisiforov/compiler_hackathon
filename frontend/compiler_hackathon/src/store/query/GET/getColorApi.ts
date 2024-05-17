import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getColorApi = createApi({
    reducerPath: "getColorApi",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
    endpoints: (build) => ({
        getColor: build.query({
            query: () => 'color',
        })
    })
})

export const {useGetColorQuery} = getColorApi