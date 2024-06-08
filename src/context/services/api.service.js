import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create a base query instance for Redux Toolkit Query
const baseQuery = fetchBaseQuery({
  baseUrl: "https://wbbrouserdev.mprating.ru",
  prepareHeaders: async (headers, { getState }) => {
    headers.set("User-Agent", "Mozilla/5.0");
    const get = JSON.parse(localStorage.getItem("remember"));
    const storage = get ? localStorage : sessionStorage;
    const token = storage.getItem("access_token") || null;
    if (token) return headers.set("Authorization", `Bearer ${token}`);
  },
});

// if token expired or not valid - reauth user (Unauthorization error)
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error && result?.error?.status === 401) {
    localStorage.clear();
    sessionStorage.clear();
    return window.location.reload();
  }
  return result;
};

// Create an auto-generated hooks for each endpoint
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
