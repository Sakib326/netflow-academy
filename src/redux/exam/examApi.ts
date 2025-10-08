import { apiSlice } from "../api/apiSlice";

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
      invalidatesTags: ["Exams"],
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
