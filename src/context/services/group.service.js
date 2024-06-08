import { apiSlice } from "./api.service";
const user = JSON.parse(localStorage.getItem("user")) || null;

export const groupApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all groups - GET: /group/view?account_id={id} (protected)
    getAllGroups: builder.query({
      query: () => `/group/view?account_id=${user?.id}`,
    }),
  }),
});

export const { useGetAllGroupsQuery } = groupApi;
