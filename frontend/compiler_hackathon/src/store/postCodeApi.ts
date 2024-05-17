import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postCodeApi = createApi({
    reducerPath: "postCodeApi",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
    endpoints: (build) => ({
        postCode: build.mutation({
            query: (body) => ({
                url: 'code',
                method: 'POST',
                body,
            }),
        })
    })
})

export const {usePostCodeMutation} = postCodeApi