import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Base query configuration
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: async (headers, { getState }) => {
    const token = Cookies.get("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

// Custom base query with simple 401 handling (no refresh token)
const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args: any, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403) &&
    !args?.url?.includes("/auth")
  ) {
    Cookies.remove("token", {
      domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
    });
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/login`;
    throw result.error;
  }

  return result;
};

// Create the API slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: [
    "User",
    "Course",
    "Lesson",
    "Module",
    "Submission",
    "EnrolledCourse",
    "Discussions",
    "Discussion",
  ],
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({}),
});
