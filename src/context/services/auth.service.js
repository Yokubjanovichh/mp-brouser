import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authBaseQuery = fetchBaseQuery({
  baseUrl: `https://sso.mprating.ru/realms/mprating`,
  prepareHeaders: async (headers, { getState }) => {
    headers.set("Content-Type", "application/x-www-form-urlencoded");
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: authBaseQuery,
  tagTypes: [],
  endpoints: (builder) => ({
    // Login user - POST: /token (public)
    login: builder.mutation({
      query: (data) => {
        const urlencoded = new URLSearchParams();
        urlencoded.append("client_id", "general");
        urlencoded.append("username", data.username);
        urlencoded.append("grant_type", "password");
        urlencoded.append("password", data.password);
        return {
          url: "/protocol/openid-connect/token",
          method: "POST",
          body: urlencoded,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
