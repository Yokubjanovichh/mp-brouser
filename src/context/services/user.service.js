import { apiSlice } from "./api.service";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get user profile - GET: /account/get?softVersion={version} (protected)
    getProfile: builder.query({
      query: (version) => `/account/get?softVersion=${version}`,
    }),
  }),
});

export const { useGetProfileQuery } = userApi;
