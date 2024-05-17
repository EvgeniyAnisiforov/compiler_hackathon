import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postRegApi = createApi({
    reducerPath: "postRegApi",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
    endpoints: (build) => ({
        postReg: build.mutation({
            query: (body) => ({
                url: 'reg',
                method: 'POST',
                body,
            }),
        })
    })
})

export const {usePostRegMutation} = postRegApi