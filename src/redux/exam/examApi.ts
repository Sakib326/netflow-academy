import { apiSlice } from "../api/apiSlice";
import { setCurrentExam } from "./examSlice";

export const examApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExamsByCourseAndBatch: builder.query({
      query: ({ course_id, batch_id }) =>
        `/courses/${course_id}/batches/${batch_id}/exams`,
      providesTags: ["Exams"],
    }),
    startExam: builder.mutation({
      query: (exam_id) => ({
        url: `/exams/${exam_id}/start`,
        method: "POST",
      }),
      async onQueryStarted(exam_id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Dispatch an action to save exam data into examSlice
          dispatch(setCurrentExam(data));
        } catch (error) {
          console.error("Error starting exam:", error);
        }
      },
    }),
    finishExam: builder.mutation({
      query: ({ exam_id, answers }) => ({
        url: `/exams/${exam_id}/finish`,
        method: "POST",
        body: { answers },
      }),
      invalidatesTags: ["Exams"],
    }),

    getExamResult: builder.query({
      query: (exam_id) => `/exams/${exam_id}/result`,
      providesTags: ["ExamResult"],
    }),

    getExamResultDetails: builder.query({
      query: (exam_id) => `/exams/${exam_id}/result/details`,
      providesTags: ["ExamResultDetails"],
    }),
  }),
});

export const {
  useGetExamsByCourseAndBatchQuery,
  useStartExamMutation,
  useFinishExamMutation,
  useGetExamResultQuery,
  useGetExamResultDetailsQuery,
} = examApi;
