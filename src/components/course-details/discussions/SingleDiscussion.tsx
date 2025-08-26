import type { SingleDiscussion } from "@/types/discussion";
import React from "react";
import { FaRegCheckSquare, FaRegCommentAlt } from "react-icons/fa";
import {
  HiCheckCircle,
  HiClock,
  HiQuestionMarkCircle,
  HiThumbUp,
} from "react-icons/hi";

type Props = {
  discussion?: SingleDiscussion;
};

const SingleDiscussion = ({ discussion }: Props) => {
  if (!discussion) return <div>No discussion found.</div>;

  const { thread, replies } = discussion;

  return (
    <div className="tw:max-w-3xl tw:mx-auto tw:p-4 tw:space-y-6">
      {/* Main Thread */}
      <div className="tw:border tw:border-gray-200 tw:rounded-lg tw:p-4 tw:shadow-sm tw:bg-white">
        <div className="tw:flex tw:items-center tw:gap-3 tw:mb-3">
          <img
            src={thread.user?.avatar ?? "/default-avatar.png"}
            alt={thread.user?.name}
            className="tw:w-12 tw:h-12 tw:rounded-full tw:border tw:border-gray-200"
          />
          <div>
            <p className="tw:font-semibold tw:mb-0">{thread?.user?.name}</p>
            <p className="tw:text-xs tw:text-gray-500">
              {new Date(thread.created_at).toLocaleString()}
            </p>
          </div>
        </div>
        <h3 className="tw:font-bold tw:text-xl tw:mt-3">{thread.title}</h3>
        <div
          className="tw:mt-2 tw:text-gray-700"
          dangerouslySetInnerHTML={{ __html: thread.content }}
        ></div>
        <div className="tw-mt-3 tw-flex tw-items-center tw-space-x-4 tw-text-sm tw-text-gray-500">
          <span className="tw-flex tw-items-center tw-space-x-1">
            {thread.is_question ? (
              <HiQuestionMarkCircle />
            ) : (
              <FaRegCommentAlt />
            )}
            <span>{thread.is_question ? "Question" : "Discussion"}</span>
          </span>

          <span className="tw-flex tw-items-center tw-space-x-1">
            {thread.is_answered ? (
              <FaRegCheckSquare className="tw-text-green-500" />
            ) : (
              <HiClock className="tw-text-yellow-500" />
            )}
            <span>{thread.is_answered ? "Answered" : "Not answered"}</span>
          </span>

          <span className="tw-flex tw-items-center tw-space-x-1">
            <HiThumbUp />
            <span>{thread.upvotes}</span>
          </span>
        </div>
      </div>

      {/* Replies */}
      <div className="tw:space-y-4">
        {replies.length === 0 ? (
          <p className="tw:text-gray-500">No replies yet.</p>
        ) : (
          replies.map((reply) => (
            <div
              key={reply.id}
              className="tw:border tw:rounded-lg tw:p-3 tw:shadow-sm tw:bg-gray-50"
            >
              <div className="tw:flex tw:items-center tw:space-x-3">
                <img
                  src={reply.user.avatar}
                  alt={reply.user.name}
                  className="tw:w-8 tw:h-8 tw:rounded-full"
                />
                <div>
                  <h4 className="tw:font-semibold">{reply.user.name}</h4>
                  <p className="tw:text-xs tw:text-gray-500">
                    {new Date(reply.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="tw:mt-2 tw:text-gray-700">{reply.content}</p>
            </div>
          ))
        )}
      </div>

      {/* Add Comment / Reply */}
      <div className="tw:mt-4 tw:border-t tw:pt-4">
        <textarea
          placeholder="Write a reply..."
          className="tw:w-full tw:border tw:rounded-md tw:p-2 tw:resize-none focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-blue-400"
          rows={2}
        />
        <button className="tw:mt-2 tw:bg-orange-600 tw:text-white tw:font-semibold tw:px-8 tw:py-1 tw:rounded hover:tw:bg-blue-600">
          Reply
        </button>
      </div>
    </div>
  );
};

export default SingleDiscussion;
