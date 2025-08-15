import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Constants
const REDUCER_PATH = "api";
const API_URI = process.env.NEXT_PUBLIC_API_URI;

// Base query configuration
const baseQuery = fetchBaseQuery({
  baseUrl: API_URI,
  prepareHeaders: async (headers, { getState }) => {
    const token = Cookies.get("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
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
  reducerPath: REDUCER_PATH,
  baseQuery: baseQueryWithAuth,
  tagTypes: [],
  keepUnusedDataFor: 0,
  endpoints: () => ({}), // You can define your endpoints here
});
