import { PaginatedReviews } from "@/types/review";
import { apiSlice } from "../api/apiSlice";

interface GetReviewsParams {
  page?: number;
  per_page?: number;
  course_id?: number;
  rating?: number;
}

export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<PaginatedReviews, GetReviewsParams>({
      query: ({ page = 1, per_page = 15, course_id, rating }) => {
        const params = new URLSearchParams();

        params.append("page", String(page));
        params.append("per_page", String(per_page));

        if (course_id !== undefined && course_id !== null) {
          params.append("course_id", String(course_id));
        }

        if (rating !== undefined && rating !== null) {
          params.append("rating", String(rating));
        }

        return {
          url: `/reviews?${params.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetReviewsQuery } = reviewApi;
