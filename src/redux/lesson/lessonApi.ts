import { Lesson, Module, Submission } from "@/types/moduleLessons";
import { apiSlice } from "../api/apiSlice";

export const lessonApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch modules by course slug
    getModulesByCourseSlug: builder.query<
      { success: boolean; modules: Module[]; enrolled: boolean },
      string
    >({
      query: (slug) => ({
        url: `/modules/${slug}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.modules.map((module) => ({
                type: "Module" as const,
                id: module.id,
              })),
              { type: "Module", id: "LIST" },
            ]
          : [{ type: "Module", id: "LIST" }],
    }),

    // Fetch single lesson by slug
    getLessonBySlug: builder.query<
      { success: boolean; lesson: Lesson; enrolled: boolean },
      string
    >({
      query: (slug) => ({
        url: `/lessons/${slug}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result ? [{ type: "Lesson" as const, id: result.lesson.id }] : [],
    }),

    // Submit lesson
    submitLessonBySlug: builder.mutation<
      { success: boolean; submission: Submission },
      { slug: string; data: any }
    >({
      query: ({ slug, data }) => ({
        url: `/lessons/${slug}/submit`,
        method: "POST",
        // body is FormData; do not set Content-Type header here
        body: data,
      }),
      // optional: log success/failure without interfering with the request
      onQueryStarted: async ({ slug }, { queryFulfilled }) => {
        try {
          const { data: response } = await queryFulfilled;
          // handle success if needed, e.g. optimistic updates
          // response.submission contains the saved submission
        } catch (err) {
          // handle error if needed
        }
      },
      // invalidate the created submission and the submission list so queries refetch
      invalidatesTags: (result, error) =>
        result
          ? [
              { type: "Submission" as const, id: result.submission.id },
              { type: "Submission" as const, id: "LIST" },
            ]
          : [{ type: "Submission" as const, id: "LIST" }],
    }),

    // Fetch submissions for a lesson
    getSubmissionsByLessonSlug: builder.query<
      { success: boolean; submissions: Submission[] },
      string
    >({
      query: (slug) => ({
        url: `/lessons/${slug}/submissions`,
        method: "GET",
      }),
      providesTags: (result, error, slug) =>
        result
          ? [
              ...result.submissions.map((sub) => ({
                type: "Submission" as const,
                id: sub.id,
              })),
              { type: "Submission", id: "LIST" },
            ]
          : [{ type: "Submission", id: "LIST" }],
    }),
  }),
});

export const {
  useGetModulesByCourseSlugQuery,
  useGetLessonBySlugQuery,
  useSubmitLessonBySlugMutation,
  useGetSubmissionsByLessonSlugQuery,
} = lessonApi;
