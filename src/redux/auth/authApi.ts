import { User } from "@/types/user";
import { apiSlice } from "../api/apiSlice";
import { register, login } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result && result?.data?.token) {
            dispatch(register(result.data));
          }
        } catch (error) {}
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result && result?.data?.token) {
            dispatch(login(result.data));
          }
        } catch (error) {}
      },
    }),

    profile: builder.query<User, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useProfileQuery } =
  authApi;
