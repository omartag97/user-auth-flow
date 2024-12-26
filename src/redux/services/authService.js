import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://print.trendline.marketing/api",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: "/test-auth",
        method: "GET",
      }),
    }),
  }),
});

export const { useRegisterMutation, useGetUserInfoQuery } = authApi;
