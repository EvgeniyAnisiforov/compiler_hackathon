import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postAuthApi = createApi({
    reducerPath: "postAuthApi",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
    endpoints: (build) => ({
        postAuth: build.mutation({
            query: (body) => ({
                url: 'api/users/login/',
                method: 'POST',
                body,
            }),
        })
    })
})

export const {usePostAuthMutation} = postAuthApi