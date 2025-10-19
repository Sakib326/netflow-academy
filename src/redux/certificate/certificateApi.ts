import { apiSlice } from "../api/apiSlice"; // adjust path if needed

export const certificateApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyCertificates: builder.query({
      query: () => `/certificates/my-certificates?page=1&limit=50`,
      providesTags: ["Certificate"],
    }),

    getCertificateById: builder.query({
      query: (id) => `/certificates/${id}`,
      providesTags: (result, error, id) => [{ type: "Certificate", id }],
    }),
  }),
});

export const { useGetMyCertificatesQuery, useGetCertificateByIdQuery } =
  certificateApi;
