import { apiSlice } from "../api/apiSlice";
import type {
  Discussion,
  PaginatedResponse,
  SingleDiscussion,
} from "@/types/discussion";

type CreateDiscussionRequest = {
  courseId: number | string;
  title: string;
  content: string;
  is_question: boolean;
};

type CourseId = {
  courseId: string | number;
};

type DiscId = {
  discId: string | number;
};

export const discussionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDiscussions: builder.query<PaginatedResponse<Discussion>, CourseId>({
      query: ({ courseId }) => ({
        url: `/courses/${courseId}/discussions`,
        method: "GET",
      }),
      providesTags: ["Discussions"],
    }),
    createDiscussion: builder.mutation<Discussion, CreateDiscussionRequest>({
      query: ({ courseId, ...body }) => ({
        url: `/courses/${courseId}/discussions`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Discussions"],
    }),

    getDiscussion: builder.query<SingleDiscussion, DiscId>({
      query: ({ discId }) => ({
        url: `/discussions/${discId}`,
      }),
      providesTags: ["Discussion"],
    }),

    createReply: builder.mutation({
      query: ({ discId, body }) => ({
        url: `/discussions/${discId}/reply`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Discussions", "Discussion"],
    }),

    createUpvote: builder.mutation({
      query: ({ discId }) => ({
        url: `/discussions/${discId}/upvote`,
        method: "POST",
      }),
      invalidatesTags: ["Discussions", "Discussion"],
    }),

    markAnswered: builder.mutation({
      query: ({ discId }) => ({
        url: `/discussions/${discId}/mark-answered`,
        method: "POST",
      }),
      invalidatesTags: ["Discussions", "Discussion"],
    }),
  }),
});

export const {
  useGetDiscussionsQuery,
  useCreateDiscussionMutation,
  useGetDiscussionQuery,
  useCreateReplyMutation,
  useMarkAnsweredMutation,
  useCreateUpvoteMutation,
} = discussionApi;
