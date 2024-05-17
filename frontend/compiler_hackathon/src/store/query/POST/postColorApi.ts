import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postColorApi = createApi({
    reducerPath: "postColorApi",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
    endpoints: (build) => ({
        postColor: build.mutation({
            query: (body) => ({
                url: 'color',
                method: 'POST',
                body,
            }),
        })
    })
})

export const {usePostColorMutation} = postColorApi