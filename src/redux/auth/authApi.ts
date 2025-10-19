import { User } from "@/types/user";
import { apiSlice } from "../api/apiSlice";
import { register, login, profile } from "./authSlice";
import Cookies from "js-cookie";

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
          Cookies.set("token", result.data.token, {
            expires: 7, // Set cookie to expire in 7 days
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
          });
        } catch (error) {}
      },
    }),

    profile: builder.query<User, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["User"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result && result?.data) {
            dispatch(profile(result.data));
          }
        } catch (error) {}
      },
    }),
    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/auth/update",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result && result?.data?.user) {
            dispatch(profile(result?.data?.user));
          }
        } catch (error) {}
      },
    }),

    updatePassword: builder.mutation({
      query: (body) => ({
        url: "/auth/update-password",
        method: "POST",
        body: body,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: body,
      }),
    }),

    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
