import { apiSlice } from "../api/apiSlice";
import type {
  EnrolledCourseListResponse,
  EnrolledCourseStatusCount,
} from "@/types/enrolledCourse";

export const enrolledCoursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET /my-courses?page=1
    getMyCourses: builder.query<EnrolledCourseListResponse, number | void>({
      query: (page = 1) => ({
        url: `/my-courses?page=${page}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((course) => ({
                type: "EnrolledCourse" as const,
                id: course.enrollment_id,
              })),
              { type: "EnrolledCourse", id: "LIST" },
            ]
          : [{ type: "EnrolledCourse", id: "LIST" }],
    }),

    // GET /my-courses/status-count
    getMyCoursesStatusCount: builder.query<EnrolledCourseStatusCount, void>({
      query: () => ({
        url: "/my-courses/status-count",
        method: "GET",
      }),
      providesTags: [{ type: "EnrolledCourse", id: "STATUS_COUNT" }],
    }),
  }),
});

export const { useGetMyCoursesQuery, useGetMyCoursesStatusCountQuery } =
  enrolledCoursesApi;
